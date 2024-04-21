export const PokemonList = [];
export const PokemonByType = [];
export const PokemonByQuery = [];
export const filteredItems = [];

export const PokemonTypes = [];

// Dicionário de tipo e cor
const colours = {
    normal: 'rgba(168, 167, 122, 1)',
    fire: 'rgba(238, 129, 48, 1)',
    water: 'rgba(99, 144, 240, 1)',
    electric: 'rgba(247, 208, 44, 1)',
    grass: 'rgba(122, 199, 76, 1)',
    ice: 'rgba(150, 217, 214, 1)',
    fighting: 'rgba(194, 46, 40, 1)',
    poison: 'rgba(163, 62, 161, 1)',
    ground: 'rgba(226, 191, 101, 1)',
    flying: 'rgba(169, 143, 243, 1)',
    psychic: 'rgba(249, 85, 135, 1)',
    bug: 'rgba(166, 185, 26, 1)',
    rock: 'rgba(182, 161, 54, 1)',
    ghost: 'rgba(115, 87, 151, 1)',
    dragon: 'rgba(111, 53, 252, 1)',
    dark: 'rgba(112, 87, 70, 1)',
    steel: 'rgba(183, 183, 206, 1)',
    fairy: 'rgba(214, 133, 173, 1)',
};


// Função para obter a cor de um tipo
export function getColors(type) {    
    if (colours.hasOwnProperty(type)) return colours[type];
    else return { primary: '#000000', secondary: '#000000'};
}