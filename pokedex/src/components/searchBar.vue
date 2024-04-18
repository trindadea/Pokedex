<template>
    <div>
        <input type="text" v-model="searchQuery" placeholder="Pesquisar Pokémon" @input="search">
        <div v-if="filteredItems.length > 0">
            <pokeCard v-for="(item, index) in filteredItems" :key="index" :pokemon="item" />
        </div>
        <div v-else>
            <p>Nenhum Pokémon encontrado.</p>
        </div>
    </div>
</template>

<script>
import pokeCard from './pokeCard.vue';
import { mapState } from 'vuex';

export default {
    components: {
        pokeCard
    },

    data() {
        return {
            searchQuery: '', // A variável que armazenará o texto da pesquisa
            filteredItems: [] // Lista filtrada de Pokémon com base na pesquisa
        };
    },

    computed: {
        ...mapState(['pokemonItems']) // Mapeia o estado global pokemonItems para a variável computada pokemonItems
    },

    methods: {
        search() {
            // Filtrar os Pokémon com base na consulta de pesquisa (searchQuery)
            this.filteredItems = this.pokemonItems.filter(pokemon => {
                // Lógica de filtro
            });
        }
    }
};
</script>

<style scoped>
/* Estilos específicos para este componente, se necessário */
</style>
