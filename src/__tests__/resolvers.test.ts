import { resolvers } from '../resolvers';

describe('GraphQL Resolvers', () => {
  describe('Mutations', () => {
    it('should create a category', () => {
      const input = { name: 'Test Category' };
      const result = resolvers.Mutation.createCategory(null, { input });
      
      expect(result).toHaveProperty('id');
      expect(result.name).toBe(input.name);
    });

    it('should create a menu item', () => {
      // First create a category
      const categoryInput = { name: 'Test Category' };
      const category = resolvers.Mutation.createCategory(null, { input: categoryInput });

      const menuItemInput = {
        name: 'Test Item',
        description: 'Test Description',
        price: 9.99,
        categoryId: category.id,
      };

      const result = resolvers.Mutation.createMenuItem(null, { input: menuItemInput });
      
      expect(result).toHaveProperty('id');
      expect(result.name).toBe(menuItemInput.name);
      expect(result.price).toBe(menuItemInput.price);
    });
  });

  describe('Queries', () => {
    beforeEach(() => {
      // Clear data before each test
      resolvers.Mutation.createCategory(null, { 
        input: { name: 'Test Category' } 
      });
    });

    it('should fetch all categories', () => {
      const result = resolvers.Query.categories();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should fetch all menu items', () => {
      const result = resolvers.Query.menuItems();
      expect(Array.isArray(result)).toBe(true);
    });
  });
}); 