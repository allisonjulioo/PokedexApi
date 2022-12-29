"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFavoriteById = exports.deleteFavorite = exports.saveFavoritePokemon = exports.getAllFavorite = void 0;
const dbService_1 = require("../../database/dbService");
const pokemon_1 = require("./pokemon");
const path = '/favoritelist';
const findFavoriteById = (dataId) => {
    const data = dbService_1.database.getData(path);
    return data.find((data) => data.id === +dataId);
};
exports.findFavoriteById = findFavoriteById;
const getAllFavorite = async () => {
    try {
        const data = dbService_1.database.getData(path);
        return data;
    }
    catch (error) {
        console.error(error);
    }
};
exports.getAllFavorite = getAllFavorite;
const saveFavoritePokemon = async (id) => {
    const hasSaved = findFavoriteById(id);
    if (hasSaved) {
        return;
    }
    const response = (await (0, pokemon_1.getById)(id));
    dbService_1.database.push(path, [response], false);
    return response;
};
exports.saveFavoritePokemon = saveFavoritePokemon;
const deleteFavorite = (dataId) => {
    const index = dbService_1.database.getIndex(path, +dataId, 'id');
    if (!index) {
        return 'not found';
    }
    try {
        dbService_1.database.delete(`${path}[${index}]`);
        return 'removed';
    }
    catch (error) {
        return error;
    }
};
exports.deleteFavorite = deleteFavorite;
//# sourceMappingURL=favoriteList.js.map