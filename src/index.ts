import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { readFileSync } from 'fs';
import { join } from 'path';
import { resolvers } from './resolvers';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Context type for authentication
interface MyContext {
  authenticated: boolean;
}

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);

  // Read schema file
  const typeDefs = readFileSync(join(__dirname, 'schema/schema.graphql'), 'utf-8');

  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  // Authentication middleware
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async () => ({ authenticated: true }),
    })
  );

  const PORT = process.env.PORT || 4000;
  
  await new Promise<void>((resolve) => {
    httpServer.listen({ port: PORT }, resolve);
  });

  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
}

startApolloServer().catch((err) => {
  console.error('Error starting server:', err);
}); 