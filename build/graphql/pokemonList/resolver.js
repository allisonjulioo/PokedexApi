"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pokemonListResolvers = void 0;
const favoriteList_1 = require("../dataSources/favoriteList");
const pokemon_1 = require("../dataSources/pokemon");
const pokemonList = async (_, { input }) => {
    return await (0, pokemon_1.getAll)(input);
};
const pokemonById = async (_, { id }) => {
    return await (0, pokemon_1.getById)(id);
};
const pokemonFavoriteList = async () => {
    return await (0, favoriteList_1.getAllFavorite)();
};
const addPokemonToFavoriteList = async (_, { id }) => {
    return await (0, favoriteList_1.saveFavoritePokemon)(id);
};
const removePokemonToFavoriteList = async (_, { id }) => {
    return await (0, favoriteList_1.deleteFavorite)(id);
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
exports.pokemonListResolvers = pokemonListResolvers;
//# sourceMappingURL=resolver.js.map