import { createStore } from 'vuex';

export default createStore({
    // Propriedades de estado
    state: {
        pokemonItems: [] // Lista de Pokemons (nome e id's)
    },

    // Mutações são funções que modificam as propriedades de estado de forma síncrona
    mutations: {
        setPokemonItems(state, items) {
            // Atualiza a lista com novos itens
            state.pokemonItems = items;
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
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        }
    }
});
