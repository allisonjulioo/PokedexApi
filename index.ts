import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import schema from './graphql/schema';

async function startApolloServer() {
  const app = express();

  const server = new ApolloServer({
    schema,
    validationRules: [depthLimit(7)],
  });

  await server.start();

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
  });

  app.use(compression());

  const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
  };

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(corsOptions),
    json(),
    expressMiddleware(server),
  );

  const httpServer = createServer(app);
  const port = process.env.PORT || 8000;

  await new Promise<void>(resolve => httpServer.listen({port}, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}${server.cache}`);
}

startApolloServer();
