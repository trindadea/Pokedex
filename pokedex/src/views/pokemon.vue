<script>
    import { useRoute } from 'vue-router';
    import Sprites from '../components/sprites.vue';
    import AttackMoves from '../components/attackMoves.vue';
    
    export default {
        components: {
            Sprites,
            AttackMoves
        },

        data() {
            return {
                name: '',
                image: '',
                sprites: {},
                moves: [],
                evoluions: [],
                games: []
            };
        },

        mounted() {
            const route = useRoute();
            this.fetchPokemon(route.params.id);
        },

        methods: {
            async fetchPokemon(id) {
                try {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                    if (!response.ok) {
                    throw new Error(`Falha ao buscar os dados de ${id}`);
                    }

                    var json = await response.json();
                    this.name = json.name,
                    this.image = json.sprites.other["official-artwork"].front_default
                    this.sprites = json.sprites
                    this.moves = json.moves
                    this.games = json.game_indices

                } catch (error) {
                    console.error('Erro ao buscar dados:', error);
                }
            }
        }
    }
</script>

<template>
    <h1>{{ this.name }}</h1>
    <img :src="this.image" alt="Imagem de {{ this.name }}" />
    <ul>
        <li v-for="(game, index) in this.games" :key="index">
            {{ game.version.name }}
        </li>
    </ul>
    <Sprites :sprites="sprites" />
    <AttackMoves :moves="moves" />
</template>
