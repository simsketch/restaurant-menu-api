---
sidebar_position: 3
---

# Mutations

The API provides comprehensive mutations for managing menu items, categories, variations, reviews, and bundles. Here are all available mutations with examples.

## Menu Items

### Create Menu Item

Creates a new menu item in a specific category.

```graphql
mutation {
  createMenuItem(input: {
    name: "Margherita Pizza"
    description: "Fresh tomatoes, mozzarella, and basil"
    price: 14.99
    categoryId: "1"
    isAvailable: true
    tags: ["vegetarian", "classic"]
    dietaryInfo: [VEGETARIAN]
    allergens: [DAIRY, WHEAT]
    timeRestrictions: {
      daysAvailable: [MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY]
      startTime: "11:00"
      endTime: "22:00"
    }
  }) {
    id
    name
    price
  }
}
```

### Update Menu Item

Updates an existing menu item by ID.

```graphql
mutation {
  updateMenuItem(
    id: "1",
    input: {
      name: "Deluxe Margherita Pizza"
      price: 16.99
      categoryId: "1"
      isAvailable: true
      tags: ["vegetarian", "premium"]
    }
  ) {
    id
    name
    price
  }
}
```

### Delete Menu Item

Removes a menu item by ID.

```graphql
mutation {
  deleteMenuItem(id: "1")
}
```

### Toggle Item Availability

Quickly toggle the availability of a menu item.

```graphql
mutation {
  toggleItemAvailability(id: "1") {
    id
    name
    isAvailable
  }
}
```

## Categories

### Create Category

Creates a new menu category.

```graphql
mutation {
  createCategory(input: {
    name: "Pizzas"
  }) {
    id
    name
  }
}
```

### Update Category

Updates an existing category by ID.

```graphql
mutation {
  updateCategory(
    id: "1",
    input: {
      name: "Wood-Fired Pizzas"
    }
  ) {
    id
    name
  }
}
```

### Delete Category

Removes a category by ID.

```graphql
mutation {
  deleteCategory(id: "1")
}
```

### Reorder Menu Items

Reorder items within a category.

```graphql
mutation {
  reorderMenuItems(
    categoryId: "1",
    orderedItemIds: ["item1", "item2", "item3"]
  ) {
    id
    name
    items {
      id
      name
    }
  }
}
```

## Menu Item Variations

### Add Variation

Add a variation to an existing menu item.

```graphql
mutation {
  addMenuItemVariation(
    itemId: "1",
    variation: {
      name: "Large Size"
      priceDelta: 3.00
      options: ["Extra Cheese", "Thick Crust"]
    }
  ) {
    id
    name
    variations {
      name
      priceDelta
      options
    }
  }
}
```

### Remove Variation

Remove a variation from a menu item.

```graphql
mutation {
  removeMenuItemVariation(
    itemId: "1",
    variationId: "var1"
  ) {
    id
    name
    variations {
      id
      name
    }
  }
}
```

## Reviews

### Add Review

Add a review for a menu item.

```graphql
mutation {
  addReview(
    itemId: "1",
    input: {
      rating: 5
      comment: "Excellent pizza, very authentic!"
    }
  ) {
    id
    rating
    comment
    createdAt
  }
}
```

### Respond to Review

Add a response to an existing review.

```graphql
mutation {
  respondToReview(
    reviewId: "1",
    response: "Thank you for your feedback!"
  ) {
    id
    comment
    response
  }
}
```

## Menu Bundles

### Create Bundle

Create a new menu bundle.

```graphql
mutation {
  createMenuBundle(
    input: {
      name: "Family Feast"
      description: "Perfect for 4-6 people"
      itemIds: ["1", "2", "3", "4"]
    }
  ) {
    id
    name
    totalPrice
    savings
  }
}
```

### Update Bundle

Update an existing menu bundle.

```graphql
mutation {
  updateMenuBundle(
    id: "1",
    input: {
      name: "Weekend Family Feast"
      itemIds: ["1", "2", "3", "4", "5"]
    }
  ) {
    id
    name
    totalPrice
    savings
  }
}
```

### Delete Bundle

Remove a menu bundle.

```graphql
mutation {
  deleteMenuBundle(id: "1")
}
```

### Set Daily Specials

Set the daily special menu items.

```graphql
mutation {
  setDailySpecials(
    itemIds: ["1", "2", "3"]
  ) {
    id
    name
    price
  }
}
```

## Input Types

### MenuItemInput

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | String | Yes | Name of the menu item |
| `description` | String | No | Description of the menu item |
| `price` | Float | Yes | Price of the menu item |
| `categoryId` | ID | Yes | ID of the category this item belongs to |
| `isAvailable` | Boolean | No | Whether the item is available |
| `timeRestrictions` | TimeRestrictionInput | No | Time-based availability |
| `dietaryInfo` | [DietaryRestriction!] | No | Dietary information |
| `allergens` | [Allergen!] | No | Allergen information |
| `tags` | [String!] | No | Tags for the item |

### CategoryInput

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | String | Yes | Name of the category |

### MenuItemVariationInput

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | String | Yes | Name of the variation |
| `priceDelta` | Float | Yes | Price difference from base item |
| `options` | [String!]! | Yes | Available options for this variation |

### ReviewInput

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `rating` | Int | Yes | Rating (1-5) |
| `comment` | String | No | Review comment |

### MenuBundleInput

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | String | Yes | Name of the bundle |
| `description` | String | No | Bundle description |
| `itemIds` | [ID!]! | Yes | IDs of items in the bundle |

### TimeRestrictionInput

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `daysAvailable` | [WeekDay!]! | Yes | Days when available |
| `startTime` | String | No | Start time (HH:MM) |
| `endTime` | String | No | End time (HH:MM) |
| `seasonalStart` | String | No | Season start date |
| `seasonalEnd` | String | No | Season end date |