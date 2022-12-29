import pokemonList from './../schema/schema.graphql';

const pokeSchema = `
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

