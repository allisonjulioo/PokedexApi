import 'graphql-import-node';
import { typeDefs } from '../graphql/typeDefs';
import { resolvers } from './resolvers';

const APOLLO_CONFIG = {
  typeDefs,
  resolvers,
};

export { APOLLO_CONFIG };

