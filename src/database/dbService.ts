import {JsonDB} from 'node-json-db';
import {Config} from 'node-json-db/dist/lib/JsonDBConfig';

const database = new JsonDB(new Config('database', true, false, '/'));

export {database};
