import { MenuItemInput, CategoryInput, MenuItem, Category } from './types';
import { INITIAL_CATEGORIES, INITIAL_MENU_ITEMS } from './data/menuData';

// TODO: MongoDB Integration
// import { MongoClient, ObjectId } from 'mongodb';
// const client = new MongoClient(process.env.MONGODB_URI);
// const db = client.db('restaurant');
// const menuItems = db.collection('menuItems');
// const categories = db.collection('categories');

// Custom error classes for better error handling
class NotFoundError extends Error {
  constructor(entity: string, id: string) {
    super(`${entity} with id ${id} not found`);
    this.name = 'NotFoundError';
  }
}

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Type-safe storage with proper typing
const categories = new Map<string, Category>(INITIAL_CATEGORIES.map(cat => [cat.id, cat]));
const menuItems = new Map<string, MenuItem>(INITIAL_MENU_ITEMS.map(item => [item.id, item]));

// Improved ID generation with better entropy
const generateId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomStr}`;
};
// With MongoDB we would use: const generateId = () => new ObjectId();

// Input validation functions
const validateMenuItem = (input: MenuItemInput): void => {
  if (!input.name || input.name.trim().length === 0) {
    throw new ValidationError('Menu item name is required');
  }
  if (input.price < 0) {
    throw new ValidationError('Price must be non-negative');
  }
  if (!categories.has(input.categoryId)) {
    throw new ValidationError('Invalid category ID');
  }
};

const validateCategory = (input: CategoryInput): void => {
  if (!input.name || input.name.trim().length === 0) {
    throw new ValidationError('Category name is required');
  }
};

export const resolvers = {
  Query: {
    // Current in-memory implementation
    menuItems: (): MenuItem[] => Array.from(menuItems.values()),
    // MongoDB implementation would be:
    // menuItems: async () => await menuItems.find({}).toArray(),

    menuItem: (_: unknown, { id }: { id: string }): MenuItem => {
      const item = menuItems.get(id);
      if (!item) throw new NotFoundError('MenuItem', id);
      return item;
    },
    // MongoDB:
    // menuItem: async (_, { id }) => await menuItems.findOne({ _id: new ObjectId(id) }),

    categories: (): Category[] => Array.from(categories.values()),
    // MongoDB:
    // categories: async () => await categories.find({}).toArray(),

    category: (_: unknown, { id }: { id: string }): Category => {
      const category = categories.get(id);
      if (!category) throw new NotFoundError('Category', id);
      return category;
    },
    // MongoDB:
    // category: async (_, { id }) => await categories.findOne({ _id: new ObjectId(id) }),
  },

  MenuItem: {
    // Memoize category lookup for performance
    category: (parent: MenuItem): Category => {
      const category = categories.get(parent.categoryId);
      if (!category) throw new NotFoundError('Category', parent.categoryId);
      return category;
    },
    // MongoDB:
    // category: async (parent) => await categories.findOne({ _id: new ObjectId(parent.categoryId) }),
  },

  Category: {
    // Optimize items lookup with Map and filter
    items: (parent: Category): MenuItem[] => {
      return Array.from(menuItems.values())
        .filter(item => item.categoryId === parent.id);
    },
    // MongoDB:
    // items: async (parent) => await menuItems.find({ categoryId: parent._id }).toArray(),
  },

  Mutation: {
    createMenuItem: (_: unknown, { input }: { input: MenuItemInput }): MenuItem => {
      validateMenuItem(input);
      
      const id = generateId();
      const menuItem: MenuItem = {
        id,
        ...input,
        isAvailable: input.isAvailable ?? true,
        reviews: [],
        totalReviews: 0,
        relatedItems: [],
        tags: input.tags ?? []
      };
      menuItems.set(id, menuItem);
      
      return menuItem;
    },
    // MongoDB:
    // createMenuItem: async (_, { input }) => {
    //   const result = await menuItems.insertOne(input);
    //   return { _id: result.insertedId, ...input };
    // },

    updateMenuItem: (_: unknown, { id, input }: { id: string, input: MenuItemInput }): MenuItem => {
      const existingItem = menuItems.get(id);
      if (!existingItem) throw new NotFoundError('MenuItem', id);
      
      validateMenuItem(input);
      
      const updatedItem: MenuItem = { ...existingItem, ...input };
      menuItems.set(id, updatedItem);
      
      return updatedItem;
    },
    // MongoDB:
    // updateMenuItem: async (_, { id, input }) => {
    //   const result = await menuItems.findOneAndUpdate(
    //     { _id: new ObjectId(id) },
    //     { $set: input },
    //     { returnDocument: 'after' }
    //   );
    //   if (!result.value) throw new Error('MenuItem not found');
    //   return result.value;
    // },

    deleteMenuItem: (_: unknown, { id }: { id: string }): boolean => {
      if (!menuItems.has(id)) throw new NotFoundError('MenuItem', id);
      return menuItems.delete(id);
    },
    // MongoDB:
    // deleteMenuItem: async (_, { id }) => {
    //   const result = await menuItems.deleteOne({ _id: new ObjectId(id) });
    //   return result.deletedCount === 1;
    // },

    createCategory: (_: unknown, { input }: { input: CategoryInput }): Category => {
      validateCategory(input);
      
      const id = generateId();
      const category: Category = { id, ...input, items: [] };
      categories.set(id, category);
      
      return category;
    },
    // MongoDB:
    // createCategory: async (_, { input }) => {
    //   const result = await categories.insertOne({ ...input, items: [] });
    //   return { _id: result.insertedId, ...input, items: [] };
    // },

    updateCategory: (_: unknown, { id, input }: { id: string, input: CategoryInput }): Category => {
      const existingCategory = categories.get(id);
      if (!existingCategory) throw new NotFoundError('Category', id);
      
      validateCategory(input);
      
      const updatedCategory: Category = { ...existingCategory, ...input };
      categories.set(id, updatedCategory);
      
      return updatedCategory;
    },
    // MongoDB:
    // updateCategory: async (_, { id, input }) => {
    //   const result = await categories.findOneAndUpdate(
    //     { _id: new ObjectId(id) },
    //     { $set: input },
    //     { returnDocument: 'after' }
    //   );
    //   if (!result.value) throw new Error('Category not found');
    //   return result.value;
    // },

    deleteCategory: (_: unknown, { id }: { id: string }): boolean => {
      if (!categories.has(id)) throw new NotFoundError('Category', id);
      
      // Check for menu items using this category
      const hasItems = Array.from(menuItems.values())
        .some(item => item.categoryId === id);
      
      if (hasItems) {
        throw new ValidationError('Cannot delete category with existing menu items');
      }
      
      return categories.delete(id);
    },
    // MongoDB:
    // deleteCategory: async (_, { id }) => {
    //   const result = await categories.deleteOne({ _id: new ObjectId(id) });
    //   return result.deletedCount === 1;
    // },
  },
}; 