import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';
import 'dotenv/config';
import express from 'express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import schema from './graphql/schema';

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

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

  server.applyMiddleware({app, path: '/graphql', cors: corsOptions});

  const httpServer = createServer(app);
  const port = 8000;

  httpServer.listen({port}, () =>
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`,
    ),
  );
}

startApolloServer();
