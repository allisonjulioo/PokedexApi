import { database } from '../../database/dbService';
import { getById } from './pokemon';

const path = '/favoritelist';

const findFavoriteById = async (dataId: string) => {
  const result = await new Promise((resolve, reject) => {
    try {
      let sql = `SELECT * FROM favorite_pokemon WHERE pokemon_id = ?`;

      database.get(sql, [String(dataId)], (err: any, item: any) => {
        if (err) {
          throw err;
        }
        resolve(item);
        return item;
      });
    } catch (error) {
      reject(error);
      console.error(error);
    }
  });

  return result;
};

const getAllFavorite = async () => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT * FROM favorite_pokemon`;

      database.all(sql, [], (err: any, rows: any) => {
        if (err) {
          throw err;
        }
        const results = rows.map(async (row: any) => {
          return await getById(row.pokemon_id);
        });

        resolve(results);
        return results;
      });
    } catch (error) {
      reject(error);
      console.error(error);
    }
  });
};

const saveFavoritePokemon = async (id: string) => {
  const hasSaved = await findFavoriteById(id);

  if (hasSaved) {
    return;
  }

  database.run(
    `INSERT INTO favorite_pokemon(pokemon_id) VALUES(?)`,
    [id],
    (err: any, data: any) => {
      if (err) {
        return console.log(err.message);
      }
      console.log(`A row has been inserted with rowid ${data}`);
    },
  );
};

const deleteFavorite = async (dataId: string) => {
  const result = await new Promise((resolve, reject) => {
    try {
      let sql = `DELETE FROM favorite_pokemon WHERE pokemon_id = ?`;

      database.get(sql, [String(dataId)], (err: any, item: any) => {
        if (err) {
          throw err;
        }
        resolve(item);
        return item;
      });
    } catch (error) {
      reject(error);
      console.error(error);
    }
  });

  return result;
};

export { getAllFavorite, saveFavoritePokemon, deleteFavorite, findFavoriteById };

