"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const compression_1 = __importDefault(require("compression"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const graphql_depth_limit_1 = __importDefault(require("graphql-depth-limit"));
const http_1 = require("http");
const schema_1 = __importDefault(require("./graphql/schema"));
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
};
async function startApolloServer() {
    const app = (0, express_1.default)();
    const server = new apollo_server_express_1.ApolloServer({
        schema: schema_1.default,
        validationRules: [(0, graphql_depth_limit_1.default)(7)],
    });
    await server.start();
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
    app.use((0, compression_1.default)());
    server.applyMiddleware({ app, path: '/graphql', cors: corsOptions });
    const httpServer = (0, http_1.createServer)(app);
    const port = 8000;
    httpServer.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`));
}
startApolloServer();
//# sourceMappingURL=index.js.map