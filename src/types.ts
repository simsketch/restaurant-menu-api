/**
 * Enums
 */
export enum WeekDay {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export enum DietaryRestriction {
  VEGETARIAN = 'VEGETARIAN',
  VEGAN = 'VEGAN',
  GLUTEN_FREE = 'GLUTEN_FREE',
  DAIRY_FREE = 'DAIRY_FREE',
  NUT_FREE = 'NUT_FREE',
}

export enum Allergen {
  NUTS = 'NUTS',
  DAIRY = 'DAIRY',
  EGGS = 'EGGS',
  SOY = 'SOY',
  WHEAT = 'WHEAT',
  SHELLFISH = 'SHELLFISH',
  FISH = 'FISH',
}

/**
 * Base Types
 */
export interface TimeRestriction {
  daysAvailable: WeekDay[];
  startTime?: string;
  endTime?: string;
  seasonalStart?: string;
  seasonalEnd?: string;
}

export interface MenuItemVariation {
  id: string;
  name: string;
  priceDelta: number;
  options: string[];
}

export interface Review {
  id: string;
  menuItemId: string;
  rating: number;
  comment?: string;
  response?: string;
  createdAt: string;
}

/**
 * Main Types
 */
export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  categoryId: string;
  options?: string[];
  isAvailable: boolean;
  timeRestrictions?: TimeRestriction;
  dietaryInfo?: DietaryRestriction[];
  allergens?: Allergen[];
  variations?: MenuItemVariation[];
  reviews: Review[];
  averageRating?: number;
  totalReviews: number;
  relatedItems: string[]; // Array of MenuItem IDs
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface MenuBundle {
  id: string;
  name: string;
  description?: string;
  itemIds: string[];
  totalPrice: number;
  savings: number;
}

/**
 * Analytics Types
 */
export interface MenuItemStats {
  itemId: string;
  viewCount: number;
  orderCount: number;
  averageRating?: number;
}

export interface CategoryStats {
  categoryId: string;
  itemCount: number;
  averagePrice: number;
}

export interface PriceRangeStats {
  low: number;
  medium: number;
  high: number;
  averagePrice: number;
}

export interface DietaryStats {
  vegetarianCount: number;
  veganCount: number;
  glutenFreeCount: number;
}

export interface MenuAnalytics {
  popularItems: MenuItemStats[];
  categoryDistribution: CategoryStats[];
  priceRanges: PriceRangeStats;
  dietaryOptions: DietaryStats;
}

/**
 * Input Types
 */
export interface TimeRestrictionInput {
  daysAvailable: WeekDay[];
  startTime?: string;
  endTime?: string;
  seasonalStart?: string;
  seasonalEnd?: string;
}

export interface MenuItemInput {
  name: string;
  description?: string;
  price: number;
  categoryId: string;
  options?: string[];
  isAvailable?: boolean;
  timeRestrictions?: TimeRestrictionInput;
  dietaryInfo?: DietaryRestriction[];
  allergens?: Allergen[];
  tags?: string[];
}

export interface CategoryInput {
  name: string;
}

export interface MenuItemFilter {
  minPrice?: number;
  maxPrice?: number;
  categories?: string[];
  searchTerm?: string;
  isAvailable?: boolean;
  dietaryRestrictions?: DietaryRestriction[];
}

export interface MenuBundleInput {
  name: string;
  description?: string;
  itemIds: string[];
}

export interface ReviewInput {
  rating: number;
  comment?: string;
} 