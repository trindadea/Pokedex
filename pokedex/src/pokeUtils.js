export const PokemonList = [];
export const PokemonByType = [];
export const PokemonByQuery = [];
export const filteredItems = [];

export const PokemonTypes = [];

// Dicionário de tipo e cor
const colours = {
    normal: { primary: 'rgba(168, 167, 122, 1)', secondary: 'rgba(151, 150, 108, 1)' },
    fire: { primary: 'rgba(238, 129, 48, 1)', secondary: 'rgba(214, 87, 33, 1)' },
    water: { primary: 'rgba(99, 144, 240, 1)', secondary: 'rgba(89, 129, 216, 1)' },
    electric: { primary: 'rgba(247, 208, 44, 1)', secondary: 'rgba(222, 187, 39, 1)' },
    grass: { primary: 'rgba(122, 199, 76, 1)', secondary: 'rgba(110, 179, 68, 1)' },
    ice: { primary: 'rgba(150, 217, 214, 1)', secondary: 'rgba(135, 196, 193, 1)' },
    fighting: { primary: 'rgba(194, 46, 40, 1)', secondary: 'rgba(175, 41, 36, 1)' },
    poison: { primary: 'rgba(163, 62, 161, 1)', secondary: 'rgba(147, 56, 147, 1)' },
    ground: { primary: 'rgba(226, 191, 101, 1)', secondary: 'rgba(203, 171, 90, 1)' },
    flying: { primary: 'rgba(169, 143, 243, 1)', secondary: 'rgba(152, 129, 218, 1)' },
    psychic: { primary: 'rgba(249, 85, 135, 1)', secondary: 'rgba(224, 76, 121, 1)' },
    bug: { primary: 'rgba(166, 185, 26, 1)', secondary: 'rgba(149, 166, 24, 1)' },
    rock: { primary: 'rgba(182, 161, 54, 1)', secondary: 'rgba(164, 145, 48, 1)' },
    ghost: { primary: 'rgba(115, 87, 151, 1)', secondary: 'rgba(104, 79, 138, 1)' },
    dragon: { primary: 'rgba(111, 53, 252, 1)', secondary: 'rgba(100, 48, 226, 1)' },
    dark: { primary: 'rgba(112, 87, 70, 1)', secondary: 'rgba(101, 78, 63, 1)' },
    steel: { primary: 'rgba(183, 183, 206, 1)', secondary: 'rgba(165, 165, 185, 1)' },
    fairy: { primary: 'rgba(214, 133, 173, 1)', secondary: 'rgba(193, 119, 155, 1)' }
};

// Função para obter a cor de um tipo
export function getColors(type) {    
    if (colours.hasOwnProperty(type)) return colours[type];
    else return { primary: '#000000', secondary: '#000000'};
}