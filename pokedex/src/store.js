import { createStore } from 'vuex';

export default createStore({
    // Propriedades de estado
    state: {
        pokemonItems: [], // Lista de todos os Pokemons (nome e id's)
        filteredItems: [] // Lista de pokemons filtrados
    },

    // Mutações são funções que modificam as propriedades de estado de forma síncrona
    mutations: {
        setPokemonItems(state, items) {
            // Atualiza a lista com novos itens
            state.pokemonItems = items;
        },

        setFilteredItems(state, items) {
            state.filteredItems = items;
        }
    },

    actions: {
        async fetchPokemonItems({ commit }) {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=3000&offset=0');
                if (!response.ok) {
                    throw new Error('Falha ao buscar os dados');
                }

                const json = await response.json();
                commit('setPokemonItems', json.results);
                commit('setFilteredItems', json.results);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        }, 

        async filterItems({ state, commit }, query) {
            // Verifica se a query é um número
            if (!isNaN(query)) {
                // Converte a query para string
                const queryString = query.toString();
        
                // Filtra os itens com base no índice
                const filteredItems = state.pokemonItems.filter(item => {
                    // Extrai o número da URL e converte-o para string
                    const numberInUrl = item.url.split('/').slice(-2, -1)[0];

                    // Verifica se o número na URL começa com a query digitada
                    return numberInUrl.startsWith(queryString);
                });
        
                // Chama a mutation para definir os itens filtrados
                commit('setFilteredItems', filteredItems);
            } else {
                // Filtra os itens com base no nome (Verifica se o nome do item começa com a query digitada)
                const filteredItems = state.pokemonItems.filter(item => {
                    return item.name.toLowerCase().startsWith(query.toLowerCase());
                });
        
                commit('setFilteredItems', filteredItems);
            }
        }
        
    }
});
