import 'graphql-import-node';
import {typeDefs} from '../graphql/typeDefs';
import {makeExecutableSchema} from 'graphql-tools';
import {resolvers} from './resolvers';
import {GraphQLSchema} from 'graphql';

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
