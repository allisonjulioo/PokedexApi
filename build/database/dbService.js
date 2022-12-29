"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const node_json_db_1 = require("node-json-db");
const JsonDBConfig_1 = require("node-json-db/dist/lib/JsonDBConfig");
const database = new node_json_db_1.JsonDB(new JsonDBConfig_1.Config('database', true, false, '/'));
exports.database = database;
//# sourceMappingURL=dbService.js.map