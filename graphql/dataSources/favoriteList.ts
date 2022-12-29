import { database } from '../../database/dbService';
import { getById } from './pokemon';

interface ID {
  id: number;
}

const path = '/favoritelist';

const findFavoriteById = async (dataId: string) => {
  const data = await database.getData(path);
  return data.find((data: ID) => data.id === +dataId);
};

const getAllFavorite = async () => {
  try {
    const data = database.getData(path);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const saveFavoritePokemon = async (id: string) => {
  const hasSaved = await findFavoriteById(id);

  if (hasSaved) {
    return;
  }

  const response = (await getById(id)) as ID;
  database.push(path, [response], false);

  return response;
};

const deleteFavorite = (dataId: string) => {
  const index = database.getIndex(path, +dataId, 'id');
  if (!index) {
    return 'not found';
  }

  try {
    database.delete(`${path}[${index}]`);
    return 'removed';
  } catch (error) {
    return error;
  }
};

export { getAllFavorite, saveFavoritePokemon, deleteFavorite, findFavoriteById };

