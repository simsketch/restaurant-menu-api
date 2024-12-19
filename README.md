# Restaurant Menu API

<p align="center">
  <img src="src/assets/ya-gotta-eat-logo.png" alt="Ya Gotta Eat Logo" width="300"/>
</p>

A deliciously modern GraphQL API for managing restaurant menus, built with Node.js, TypeScript, and Apollo Server.

## Features 🌟

- **GraphQL API**: Modern, flexible, and type-safe
- **Full CRUD Operations**: Manage menu items and categories
- **API Key Authentication**: Secure endpoint access (TODO)
- **Interactive Documentation**: Built with Docusaurus
- **GraphQL Playground**: Test your queries in real-time
- **TypeScript**: Full type safety and modern development experience
- **Jest Testing**: Comprehensive test suite included

## Quick Start 🚀

### Prerequisites

- Node.js (v16 or higher)
- npm or pnpm
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ya-gotta-eat.git
cd ya-gotta-eat
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment:
```bash
cp .env.example .env
```

4. Edit `.env` to set your API port
```
PORT=4000
```

### Running the API

Start the development server:
```bash
npm run start-all
```

The API will be available at `http://localhost:4000/graphql`
The documentation will be available at `http://localhost:3333`
The single page front end will be available at `http://localhost:3030`

### Using the GraphQL Playground

1. Open `http://localhost:4000/graphql` in your browser.

### Importing the Postman Collection

1. Open Postman and click on "Import".
2. Select the `postman_collection.json` file from the project root.
3. Set the `baseUrl` environment variable to `http://localhost:4000`.
4. Add your API key to the headers for each request.

### Running Tests

```bash
npm test
```

Watch mode for development:
```bash
npm run test:watch
```

## GraphQL Query Examples 📝

### Fetching Menu Items

1. Get all menu items:
```graphql
query {
  menuItems {
    id
    name
    description
    price
    options
    category {
      name
    }
  }
}
```

2. Get a specific menu item by ID:
```graphql
query {
  menuItem(id: "item-1") {
    name
    description
    price
    category {
      name
    }
  }
}
```

3. Get all menu items in a specific category:
```graphql
query {
  category(id: "cat-1") {
    name
    items {
      name
      price
      description
    }
  }
}
```

### Fetching Categories

1. Get all categories:
```graphql
query {
  categories {
    id
    name
    items {
      name
      price
    }
  }
}
```

2. Get a specific category with its items:
```graphql
query {
  category(id: "cat-1") {
    name
    items {
      name
      description
      price
      options
    }
  }
}
```

### Creating New Items

1. Create a new menu item:
```graphql
mutation {
  createMenuItem(input: {
    name: "New Pizza"
    description: "Fresh and delicious"
    price: 15.99
    categoryId: "cat-2"
    options: ["Extra cheese", "Gluten-free crust"]
  }) {
    id
    name
    price
  }
}
```

2. Create a new category:
```graphql
mutation {
  createCategory(input: {
    name: "Desserts"
  }) {
    id
    name
  }
}
```

### Updating Items

1. Update a menu item:
```graphql
mutation {
  updateMenuItem(
    id: "item-1",
    input: {
      name: "Updated Salad Name"
      price: 8.50
      categoryId: "cat-1"
    }
  ) {
    id
    name
    price
  }
}
```

2. Update a category:
```graphql
mutation {
  updateCategory(
    id: "cat-1",
    input: {
      name: "Starters"
    }
  ) {
    id
    name
  }
}
```

### Deleting Items

1. Delete a menu item:
```graphql
mutation {
  deleteMenuItem(id: "item-1")
}
```

2. Delete a category:
```graphql
mutation {
  deleteCategory(id: "cat-1")
}
```

### Sample Data Exploration

The API comes pre-loaded with sample menu items. Here are some queries to explore the data:

1. View all appetizers:
```graphql
query {
  category(id: "cat-1") {
    name
    items {
      name
      description
      price
    }
  }
}
```

2. Find all items with options:
```graphql
query {
  menuItems {
    name
    options
    category {
      name
    }
  }
}
```

## Development 🛠️

### Running Tests

```bash
npm test
```

Watch mode for development:
```bash
npm run test:watch
```

### Project Structure

```
├── src/
│   ├── index.ts          # Server entry point
│   ├── resolvers.ts      # GraphQL resolvers
│   ├── types.ts          # TypeScript types
│   ├── data/
│   │   └── menuData.ts   # Sample menu data
│   └── schema/
│       └── schema.graphql # GraphQL schema
├── docs/                 # Documentation site
├── __tests__/           # Test files
├── .env.example         # Example environment variables
└── package.json         # Project dependencies
```

## Documentation 📖

Full documentation is available in the `docs` directory and includes:
- API Overview
- Authentication Guide
- Query Examples
- Mutation Examples
- TypeScript Types
- Testing Guide

## Contributing 🤝

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details. 