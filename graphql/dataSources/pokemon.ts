import axios from 'axios';
import { PokemonListInput } from 'graphql/pokemonList/resolver';
import { lightenDarkenColor } from '../../utils/lightenDarkenColor';
import { colorType } from '../../utils/pokemonColors';
import { findFavoriteById } from './favoriteList';

const hostname = 'http://pokeapi.co/api/v2';
const path = '/pokemon';

type PokemonData = {
  name: string;
  url: string;
};

interface PokemonApiResponse {
  name: string;
  id: string;
  base_experience: number;
  types: {
    type: {
      name: string;
    };
  }[];
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}

const createObjectPokemon = (pokemon: PokemonApiResponse) => {
  const types = pokemon.types.flatMap(({type}) => ({
    color: colorType(type.name),
    name: type.name,
  }));
  const image = pokemon.sprites.other['official-artwork'].front_default;
  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const primaryColor = lightenDarkenColor(types[0].color, 50);
  const score = pokemon.base_experience;
  const id = pokemon.id;
  const favorite = Boolean(findFavoriteById(pokemon.id));

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

const getAbilities = async (id: string) => {
  const abilities: string[] = [];
  const dataList = await axios
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

const getByUrl = async (pokemon: PokemonData) => {
  const url = pokemon.url;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(pok => resolve(createObjectPokemon(pok.data)))
      .catch(reject);
  });
};

const getById = async (id: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${hostname}${path}/${id}/`)
      .then(pokemon => {
        resolve({
          ...createObjectPokemon(pokemon.data),
          abilities: getAbilities(id),
        });
      })
      .catch(reject);
  });
};

const fetchDataByUniqueUrl = async (results: any) => {
  const pokemons = results.map(
    async (pokemon: PokemonData) => await getByUrl(pokemon),
  );
  return await Promise.all(pokemons);
};

const getAll = async (input: PokemonListInput['input']) => {
  let url = `${hostname}${path}?limit=${input.perPage}&offset=${input.currentPage}`;
  let urlFilter = `${hostname}${path}/${input.filter}?limit=${input.perPage}&offset=${input.currentPage}`;
  const hasFilter = input.filter && input.filter?.length > 0;

  try {
    let response: any;
    let pokemons: any;
    let results: any[];
    if (hasFilter) {
      response = await axios.get(urlFilter);
      results = [createObjectPokemon(await response.data)];
    } else {
      response = await axios.get(url);
      pokemons = await response.data.results;
      results = await fetchDataByUniqueUrl(pokemons);
    }

    const result = {
      pageable: {...input, hasMore: true},
      results,
    };

    return result;
  } catch (error) {}
};

export { getAll, getById };

