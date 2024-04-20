<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
        selectedType: ''
        };
    },

    // Mapeia o estado global pokemonTypes para uma propriedade computada
    computed: {
        ...mapState(['pokemonTypes']),
    },
    
    methods: {
        async handleTypeChange() {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/type/${this.selectedType}`);
                if (!response.ok) {
                    throw new Error('Falha ao buscar tipos');
                }

                const json = await response.json();
                
                // Mapeia os resultados para obter a lista de Pokémons
                const pokemonList = json.pokemon.map(item => ({
                    name: item.pokemon.name,
                    url: item.pokemon.url
                }));

                this.$store.commit('setFilteredItems', pokemonList);
            } catch (error) {
                console.error('Erro ao buscar tipos:', error);
            }
        }
    }
};
</script>

<template>
    <select v-model="selectedType" @change="handleTypeChange">
        <option v-for="type in pokemonTypes" :key="type.name" :value="type.name" :style="{ backgroundColor: type.color.primary }">
            {{ type.name }}
        </option>
    </select>
</template>  