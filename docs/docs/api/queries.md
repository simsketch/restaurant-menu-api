---
sidebar_position: 2
---

# Queries

The API provides comprehensive queries for menu management, analytics, and search functionality. Here are all available queries with examples.

## Basic Queries

### Get All Menu Items

Retrieves all menu items with their associated categories.

```graphql
query {
  menuItems {
    id
    name
    description
    price
    isAvailable
    category {
      name
    }
    tags
    totalReviews
    reviews {
      rating
      comment
    }
  }
}
```

### Get Single Menu Item

Retrieves a specific menu item by ID.

```graphql
query {
  menuItem(id: "1") {
    id
    name
    description
    price
    isAvailable
    category {
      name
    }
    variations {
      name
      priceDelta
      options
    }
    dietaryInfo
    allergens
    timeRestrictions {
      daysAvailable
      startTime
      endTime
    }
  }
}
```

### Get All Categories

Retrieves all menu categories with their items.

```graphql
query {
  categories {
    id
    name
    items {
      name
      price
      isAvailable
    }
  }
}
```

### Get Single Category

Retrieves a specific category by ID with all its menu items.

```graphql
query {
  category(id: "1") {
    id
    name
    items {
      name
      price
      description
      isAvailable
    }
  }
}
```

## Search and Filtering

### Search Menu Items

Search and filter menu items based on various criteria.

```graphql
query {
  searchMenuItems(filter: {
    minPrice: 10.0
    maxPrice: 30.0
    categories: ["1", "2"]
    searchTerm: "pizza"
    isAvailable: true
    dietaryRestrictions: [VEGETARIAN, GLUTEN_FREE]
  }) {
    id
    name
    price
    category {
      name
    }
  }
}
```

### Find Similar Items

Find menu items similar to a specific item.

```graphql
query {
  findSimilarItems(itemId: "1") {
    id
    name
    price
    category {
      name
    }
  }
}
```

## Analytics

### Get Menu Analytics

Retrieve analytics about the menu.

```graphql
query {
  getMenuAnalytics(timeRange: "LAST_MONTH") {
    popularItems {
      item {
        name
      }
      viewCount
      orderCount
      averageRating
    }
    categoryDistribution {
      category {
        name
      }
      itemCount
      averagePrice
    }
    priceRanges {
      low
      medium
      high
      averagePrice
    }
    dietaryOptions {
      vegetarianCount
      veganCount
      glutenFreeCount
    }
  }
}
```

### Get Item Popularity

Get popularity metrics for a specific item.

```graphql
query {
  getItemPopularity(itemId: "1") {
    item {
      name
    }
    viewCount
    orderCount
    averageRating
  }
}
```

## Menu Bundles

### Get All Bundles

Retrieve all menu bundles.

```graphql
query {
  menuBundles {
    id
    name
    description
    items {
      name
      price
    }
    totalPrice
    savings
  }
}
```

### Get Single Bundle

Get a specific menu bundle by ID.

```graphql
query {
  menuBundle(id: "1") {
    id
    name
    description
    items {
      name
      price
    }
    totalPrice
    savings
  }
}
```

## Query Parameters

| Query | Parameters | Description |
|-------|------------|-------------|
| `menuItems` | None | Returns all menu items |
| `menuItem` | `id: ID!` | Returns a single menu item |
| `categories` | None | Returns all categories |
| `category` | `id: ID!` | Returns a single category |
| `searchMenuItems` | `filter: MenuItemFilter` | Search and filter menu items |
| `findSimilarItems` | `itemId: ID!` | Find similar menu items |
| `getMenuAnalytics` | `timeRange: String` | Get menu analytics |
| `getItemPopularity` | `itemId: ID!` | Get item popularity metrics |
| `menuBundles` | None | Get all menu bundles |
| `menuBundle` | `id: ID!` | Get a specific menu bundle |

## Input Types

### MenuItemFilter

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `minPrice` | Float | No | Minimum price filter |
| `maxPrice` | Float | No | Maximum price filter |
| `categories` | [ID!] | No | Category IDs to filter by |
| `searchTerm` | String | No | Text to search for |
| `isAvailable` | Boolean | No | Filter by availability |
| `dietaryRestrictions` | [DietaryRestriction!] | No | Filter by dietary restrictions | 