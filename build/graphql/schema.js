"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("graphql-import-node");
const typeDefs_1 = require("../graphql/typeDefs");
const graphql_tools_1 = require("graphql-tools");
const resolvers_1 = require("./resolvers");
const schema = (0, graphql_tools_1.makeExecutableSchema)({
    typeDefs: typeDefs_1.typeDefs,
    resolvers: resolvers_1.resolvers,
});
exports.default = schema;
//# sourceMappingURL=schema.js.map