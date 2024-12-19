import { MenuItem, Category } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Appetizers', items: [] },
  { id: 'cat-2', name: 'Entrees', items: [] },
  { id: 'cat-3', name: 'Sandwiches', items: [] },
  { id: 'cat-4', name: 'Soup & Salad Combos', items: [] },
  { id: 'cat-5', name: 'Fajitas', items: [] },
  { id: 'cat-6', name: 'Tacos', items: [] },
  { id: 'cat-7', name: 'Enchiladas', items: [] },
  { id: 'cat-8', name: 'Green Salads', items: [] },
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: 'item-1',
    name: 'Iceberg Wedge Salad',
    description: 'with House Cured Bacon, tomato salsa gorgonzola',
    price: 7.50,
    categoryId: 'cat-1',
    isAvailable: true,
    reviews: [],
    totalReviews: 0,
    relatedItems: [],
    tags: []
  },
  {
    id: 'item-2',
    name: 'Sautéed Shredded Brussels Sprouts',
    description: 'bacon hazelnuts gorgonzola',
    price: 6.95,
    categoryId: 'cat-1',
    isAvailable: true,
    reviews: [],
    totalReviews: 0,
    relatedItems: [],
    tags: []
  },
  {
    id: 'item-3',
    name: 'Farfalle Pasta with Braised Pork',
    description: 'in Tomato Cream with capers butternut squash kale',
    price: 12.95,
    categoryId: 'cat-2',
    isAvailable: true,
    reviews: [],
    totalReviews: 0,
    relatedItems: [],
    tags: []
  },
  {
    id: 'item-4',
    name: 'Stout Braised Bratwurst',
    description: 'horseradish mashed potatoes roasted root veggies grilled onion',
    price: 13.95,
    categoryId: 'cat-2',
    isAvailable: true,
    reviews: [],
    totalReviews: 0,
    relatedItems: [],
    tags: []
  },
  {
    id: 'item-5',
    name: 'Turkey & Avocado Sandwich',
    description: 'with tomato on sourdough, whole wheat, or rye bread',
    price: 9.25,
    categoryId: 'cat-3',
    isAvailable: true,
    reviews: [],
    totalReviews: 0,
    relatedItems: [],
    tags: []
  },
  {
    id: 'item-6',
    name: 'Southwest Chicken Breast',
    description: 'Grilled Onion, Poblano Pepper, Tomato, Lettuce, Jack Cheese',
    price: 9.50,
    categoryId: 'cat-3',
    isAvailable: true,
    reviews: [],
    totalReviews: 0,
    relatedItems: [],
    tags: []
  },
  {
    id: 'item-7',
    name: 'Chicken Fajitas',
    description: 'Onions, Poblano and Bell Peppers, Guacamole, Two Salsas',
    price: 10.95,
    categoryId: 'cat-5',
    isAvailable: true,
    reviews: [],
    totalReviews: 0,
    relatedItems: [],
    tags: []
  },
  {
    id: 'item-8',
    name: 'Beer Battered Fish Tacos',
    description: 'with Jalapeño Remoulade, Roasted Salsa, Cabbage',
    price: 9.95,
    categoryId: 'cat-6',
    isAvailable: true,
    reviews: [],
    totalReviews: 0,
    relatedItems: [],
    tags: []
  },
  {
    id: 'item-9',
    name: 'Grilled Red Trout Salad',
    description: 'Lentils, Tomatoes, Cukes, Green Beans, Red Bells, Almonds, Sundried Tomato Vinaigrette',
    price: 10.95,
    categoryId: 'cat-8',
    isAvailable: true,
    reviews: [],
    totalReviews: 0,
    relatedItems: [],
    tags: []
  },
].map(item => ({
  ...item,
  isAvailable: true,
  reviews: [],
  totalReviews: 0,
  relatedItems: [],
  tags: []
})); 