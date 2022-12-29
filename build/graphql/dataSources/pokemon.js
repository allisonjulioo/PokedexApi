"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getById = exports.getAll = void 0;
const axios_1 = __importDefault(require("axios"));
const pokemonColors_1 = require("../../utils/pokemonColors");
const lightenDarkenColor_1 = require("../../utils/lightenDarkenColor");
const favoriteList_1 = require("./favoriteList");
const hostname = 'http://pokeapi.co/api/v2';
const path = '/pokemon';
const createObjectPokemon = (pokemon) => {
    const types = pokemon.types.flatMap(({ type }) => ({
        color: (0, pokemonColors_1.colorType)(type.name),
        name: type.name,
    }));
    const image = pokemon.sprites.other['official-artwork'].front_default;
    const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const primaryColor = (0, lightenDarkenColor_1.lightenDarkenColor)(types[0].color, 50);
    const score = pokemon.base_experience;
    const id = pokemon.id;
    const favorite = Boolean((0, favoriteList_1.findFavoriteById)(pokemon.id));
    return {
        id,
        primaryColor,
        name,
        types,
        image,
        score,
        favorite,
    };
};
const getAbilities = async (id) => {
    const abilities = [];
    const dataList = await axios_1.default
        .get(`https://pokeapi.co/api/v2/ability/${id}`)
        .then(response => response.data);
    for (const entry in dataList) {
        if (entry === 'flavor_text_entries') {
            const dataEntry = dataList[entry];
            for (const flavor in dataEntry) {
                const entrieFlavor = dataList[entry][flavor];
                const language = entrieFlavor['language'].name;
                const ability = entrieFlavor.flavor_text;
                const isEnglish = language === 'en';
                if (isEnglish) {
                    abilities.push(ability);
                    break;
                }
            }
        }
    }
    return abilities;
};
const getByUrl = async (pokemon) => {
    const url = pokemon.url;
    return new Promise((resolve, reject) => {
        axios_1.default
            .get(url)
            .then(pok => resolve(createObjectPokemon(pok.data)))
            .catch(reject);
    });
};
const getById = async (id) => {
    return new Promise((resolve, reject) => {
        axios_1.default
            .get(`${hostname}${path}/${id}/`)
            .then(pokemon => {
            resolve(Object.assign(Object.assign({}, createObjectPokemon(pokemon.data)), { abilities: getAbilities(id) }));
        })
            .catch(reject);
    });
};
exports.getById = getById;
const fetchDataByUniqueUrl = async (results) => {
    const pokemons = results.map(async (pokemon) => await getByUrl(pokemon));
    return await Promise.all(pokemons);
};
const getAll = async (input) => {
    var _a;
    let url = `${hostname}${path}?limit=${input.perPage}&offset=${input.currentPage}`;
    let urlFilter = `${hostname}${path}/${input.filter}?limit=${input.perPage}&offset=${input.currentPage}`;
    const hasFilter = input.filter && ((_a = input.filter) === null || _a === void 0 ? void 0 : _a.length) > 0;
    try {
        let response;
        let pokemons;
        let results;
        if (hasFilter) {
            response = await axios_1.default.get(urlFilter);
            results = [createObjectPokemon(await response.data)];
        }
        else {
            response = await axios_1.default.get(url);
            pokemons = await response.data.results;
            results = await fetchDataByUniqueUrl(pokemons);
        }
        const result = {
            pageable: Object.assign(Object.assign({}, input), { hasMore: true }),
            results,
        };
        return result;
    }
    catch (error) { }
};
exports.getAll = getAll;
//# sourceMappingURL=pokemon.js.map