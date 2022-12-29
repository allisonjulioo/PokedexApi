"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_1 = require("apollo-server");
const schema_graphql_1 = __importDefault(require("./../schema/schema.graphql"));
const pokeSchema = (0, apollo_server_1.gql) `
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
const typeDefs = [pokeSchema, schema_graphql_1.default];
exports.typeDefs = typeDefs;
//# sourceMappingURL=typeDefs.js.map