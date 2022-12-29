import {
  deleteFavorite, getAllFavorite,
  saveFavoritePokemon
} from '../dataSources/favoriteList';
import { getAll, getById } from '../dataSources/pokemon';

interface ID {
  id: string;
}

export type PokemonListInput = {
  input: {
    filter?: string;
    perPage?: number;
    currentPage?: number;
  };
};

const pokemonList = async (_: any, {input}: PokemonListInput) => {
  return await getAll(input);
};

const pokemonById = async (_: any, {id}: ID) => {
  return await getById(id);
};

const pokemonFavoriteList = async () => {
  return await getAllFavorite();
};

const addPokemonToFavoriteList = async (_: any, {id}: ID) => {
  return await saveFavoritePokemon(id);
};

const removePokemonToFavoriteList = async (_: any, {id}: ID) => {
  return await deleteFavorite(id);
};

const pokemonListResolvers = {
  Query: {
    pokemonList,
    pokemonById,
    pokemonFavoriteList,
  },
  Mutation: {
    addPokemonToFavoriteList,
    removePokemonToFavoriteList,
  },
};

export { pokemonListResolvers };

