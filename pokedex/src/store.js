import { createStore} from 'vuex';
import { PokemonList, PokemonByQuery, PokemonByType, filteredItems, PokemonTypes, getColors } from './pokeUtils.js';

export default createStore({
    // Propriedades de estado
    state: {
        PokemonList, // Lista de todos os Pokemons (nome e id's)
        PokemonByQuery,
        PokemonByType,
        filteredItems,

        PokemonTypes, //Lista de tipos de Pokemons

        query: '',
        selectedType: '',
        selectedLanguage: 'en',
    },

    // Mutações são funções que modificam as propriedades de estado de forma síncrona
    mutations: {
        setPokemonList(state, items) {
            // Atualiza a lista com novos itens
            state.PokemonList = items;
        },

        setPokemonByQuery(state, items) {
            state.PokemonByQuery = items;
        },

        setPokemonByType(state, items) {
            state.PokemonByType = items;
        },

        setFilteredItems(state, items) {
            state.filteredItems = items;
        },

        setPokemonTypes(state, types) {
            state.PokemonTypes = types;
        },

        // ------

        setQuery(state, newQuery) {
            state.query = newQuery;
        },
    
        setSelectedType(state, newType) {
            state.selectedType = newType;
        }
    },

    actions: {
        // Inicializadas com o App
        async fetchPokemonList({ commit }) {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=3000&offset=0');
                if (!response.ok) {
                    throw new Error('Falha ao buscar os dados');
                }

                const json = await response.json();
                commit('setPokemonList', json.results);
                commit('setFilteredItems', json.results);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        }, 

        async fetchPokemonTypes({ commit }) {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/type');
                if (!response.ok) {
                    throw new Error('Falha ao buscar os tipos');
                }
                const data = await response.json();

                const types = data.results.map(type => {
                return {
                    name: type.name,
                    color: getColors(type.name)
                };
            });
            commit('setPokemonTypes', types);
            } catch (error) {
                console.error('Erro ao buscar os tipos:', error);
            }
        },
    
        // Usadas em componentes
        async filterByQuery({ state, commit }) {
            // Verifica se a query é um número
            if (!isNaN(state.query)) {
                // Converte a query para string
                const queryString = state.query.toString();
        
                // Filtra os itens com base no índice
                const filteredByNumber = state.PokemonList.filter(item => {
                    // Extrai o número da URL e converte-o para string
                    const numberInUrl = item.url.split('/').slice(-2, -1)[0];

                    // Verifica se o número na URL começa com a query digitada
                    return numberInUrl.startsWith(queryString);
                });
        
                // Chama a mutation para definir os itens filtrados
                commit('setPokemonByQuery', filteredByNumber);
            } else {
                // Filtra os itens com base no nome ou espécie (Verifica se o nome do item começa com a query digitada)
                const filteredByName = state.PokemonList.filter(item => {
                    return item.name.toLowerCase().startsWith(state.query.toLowerCase());
                });
        
                commit('setPokemonByQuery', filteredByName);
            }
        },

        async filterByType({ state, commit }) {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/type/${state.selectedType}`);
                if (!response.ok) {
                    throw new Error('Falha ao buscar tipos');
                }

                const json = await response.json();
                
                // Mapeia os resultados para obter a lista de Pokémons
                const filteredByType = json.pokemon.map(item => ({
                    name: item.pokemon.name,
                    url: item.pokemon.url
                }));

                commit('setPokemonByType', filteredByType);
            } catch (error) {
                console.error('Erro ao buscar tipos:', error);
            }
        },

        setFilteredItems({state, commit}) {
            if (state.query === '' && state.selectedType === '') {
                // Se não houver query nem tipo selecionado, os pokémons filtrados são todos os pokémons
                commit('setFilteredItems', state.PokemonList);
            } else if (state.query !== '' && state.selectedType === '') {
                // Se houver apenas query e nenhum tipo selecionado, os pokémons filtrados são os pokémons ordenados por nome
                commit('setFilteredItems', state.PokemonByQuery);
            } else if (state.query === '' && state.selectedType !== '') {
                // Se houver apenas tipo selecionado e nenhum query, os pokémons filtrados são os pokémons ordenados por tipo
                commit('setFilteredItems', state.PokemonByType);
            } else {
                // Se houver tanto query quanto tipo selecionado, os pokémons filtrados são aqueles presentes em ambas as listas
                const filteredByName = state.PokemonByQuery.map(pokemon => pokemon.name);
                const filteredByType = state.PokemonByType.map(pokemon => pokemon.name);
    
                const filteredItems = state.PokemonList.filter(pokemon => {
                    return filteredByName.includes(pokemon.name) && filteredByType.includes(pokemon.name);
                });
    
                commit('setFilteredItems', filteredItems);
            }
        }
        
    }
    
});
