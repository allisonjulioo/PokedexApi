import { gql } from 'apollo-server';
import pokemonList from './../schema/schema.graphql';

const pokeSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;

const typeDefs = [pokeSchema, pokemonList];

export { typeDefs };

