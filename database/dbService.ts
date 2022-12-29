const sqlite3 = require('sqlite3').verbose();
const database = new sqlite3.Database('./database.db', (err: any) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

database.run(
  `CREATE TABLE IF NOT EXISTS favorite_pokemon (id,pokemon_id);`,

  (err: any) => {
    if (err) {
      console.error(err.message);
    }
  },
);

export { database };

