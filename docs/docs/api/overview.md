---
sidebar_position: 1
---

# Ya Gotta Eat API

Welcome to Ya Gotta Eat - a deliciously modern GraphQL API for managing restaurant menus. Built with Node.js and TypeScript, it offers a fresh and tasty approach to menu management.

## Key Features

- **🍽️ GraphQL Interface**: A modern, flexible API that's as easy to consume as your favorite comfort food
- **🔒 Type Safety**: Built with TypeScript for reliable, error-free development
- **✨ CRUD Operations**: Full menu management - create, read, update, and delete items as easily as placing an order
- **⚡ Real-time Updates**: Keep your menu fresh with instant updates
- **🛠️ Developer-Friendly**: Comprehensive documentation and examples that make integration a piece of cake

## Authentication

The API uses API key authentication. You'll need to include your API key in the `x-api-key` header with every request.

```bash
# Example using curl
curl -X POST \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-key-here" \
  -d '{"query": "{ menuItems { id name } }"}' \
  http://localhost:4000/graphql
```

### Getting an API Key

1. Create a `.env` file in the root directory
2. Add your API key: `API_KEY=your-secret-key-here`
3. Restart the server

For development, if no API key is set, the server will use a default key: `default-dev-key`

## Base URL

```
http://localhost:4000/graphql
```

## GraphQL Playground

The API comes with a built-in GraphQL Playground - your test kitchen for trying out queries and mutations. To use it:

1. Open `http://localhost:4000/graphql` in your browser
2. Click on "HTTP HEADERS" at the bottom
3. Add your API key:
```json
{
  "x-api-key": "your-api-key-here"
}
```

The playground allows you to:
- 📖 Browse the API menu (schema)
- 🧪 Test your queries and mutations
- 📚 View the documentation
- 🐛 Debug your requests

## Importing the Postman Collection

1. Open Postman and click on "Import".
2. Select the `postman_collection.json` file from the project root.
3. Set the `baseUrl` environment variable to `http://localhost:4000`.
4. Add your API key to the headers for each request.

## Running Tests

To run the test suite, use the following command:

```bash
npm test
```

For watch mode during development:

```bash
npm run test:watch
```

This will execute all tests and provide feedback on the code's functionality and correctness.

## Learn More

Ready to dive in? Check out our [queries](./queries) and [mutations](./mutations) to start cooking up some requests! 