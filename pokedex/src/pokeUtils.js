export const PokemonList = [];
export const PokemonByType = [];
export const PokemonByQuery = [];
export const filteredItems = [];

export const PokemonTypes = [];

// Dicionário de tipo e cor
const colours = {
    normal: { primary: '#A8A77A', secondary: '#7E7E7E' },
    fire: { primary: '#EE8130', secondary: '#8C4300' },
    water: { primary: '#6390F0', secondary: '#004785' },
    electric: { primary: '#F7D02C', secondary: '#8A7500' },
    grass: { primary: '#7AC74C', secondary: '#4C7A00' },
    ice: { primary: '#96D9D6', secondary: '#668F8F' },
    fighting: { primary: '#C22E28', secondary: '#761515' },
    poison: { primary: '#A33EA1', secondary: '#6F0F68' },
    ground: { primary: '#E2BF65', secondary: '#967D36' },
    flying: { primary: '#A98FF3', secondary: '#6250A9' },
    psychic: { primary: '#F95587', secondary: '#9C1A4C' },
    bug: { primary: '#A6B91A', secondary: '#6A7418' },
    rock: { primary: '#B6A136', secondary: '#7C751E' },
    ghost: { primary: '#735797', secondary: '#49315A' },
    dragon: { primary: '#6F35FC', secondary: '#3A1F7A' },
    dark: { primary: '#705746', secondary: '#3A3939' },
    steel: { primary: '#B7B7CE', secondary: '#6D6D7E' },
    fairy: { primary: '#D685AD', secondary: '#80556E' }
};


// Função para obter a cor de um tipo
export function getColors(type) {    
    if (colours.hasOwnProperty(type)) return colours[type];
    else return { primary: '#000000', secondary: '#000000'};
}