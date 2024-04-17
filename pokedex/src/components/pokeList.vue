<script>
import pokeCard from './pokeCard.vue';

// Configurações do componente Vue
export default {
    components: {
        pokeCard
    },

    data() {
        return {
            items: []
        };
    },

    mounted() {
        this.fetchPokemon();
    },
    
    methods: {
        async fetchPokemon() {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30&offset=0');
                if (!response.ok) {
                throw new Error('Falha ao buscar os dados');
                }

                var json = await response.json();
                this.items = json.results;
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        }
    }
};
</script>

<template>
    <div class="poke-list">
        <pokeCard v-for="(item, index) in items" :key="index" :pokemon="item" />
    </div>
</template>

<style>
.poke-list {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
}

</style>
