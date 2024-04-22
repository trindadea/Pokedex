<script>
    import { useRoute } from 'vue-router';
    import Sprites from '../components/sprites.vue';
    import AttackMoves from '../components/attackMoves.vue';
    import EvolutionChain from '../components/evolutionChain.vue';

    
    export default {
        components: {
            Sprites,
            AttackMoves,
            EvolutionChain
        },

        data() {
            return {
                name: '',
                image: '',
                sprites: {},
                moves: [],
                evoluions: [],
                games: [],
                type: ''
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
                    this.type = json.types[0].type.name

                    this.backgroundColor()

                } catch (error) {
                    console.error('Erro ao buscar dados:', error);
                }
            },

            backgroundColor() {
                const { PokemonTypes } = this.$store.state;
                
                const primaryType = this.type;
                const foundType = PokemonTypes.find(type => type.name === primaryType);
                    
                // Define a cor de fundo da div pokeBanner
                this.$refs.pokeBanner.style.backgroundColor = foundType.color.primary;
            }
        }
    }
</script>

<template>
    <div ref="pokeBanner" class="container poke-banner">
        <div class="data">
            <h3>Nº {{ $route.params.id }}</h3>
            <h1>{{ this.name.split('-')[0] }}</h1>
            <h3 class="subname" v-if="this.name.split('-')[1]">{{ this.name.split('-').slice(1).join(' ') }}</h3>
        </div>
        <div class="type">
            <img :src="'/src/assets/types/' + this.type + '.webp'"/>
            <img :src="'/src/assets/types/' + this.type + '.webp'"/>
            <img :src="'/src/assets/types/' + this.type + '.webp'"/>
            <img :src="'/src/assets/pokeball.webp'"/>
        </div>
        <img class="poke-image" :src="this.image" alt="Imagem de {{ this.name }}" />   
    </div>

    <div class="container s">
        <EvolutionChain :type="this.type"/>

        <ul>
            <li v-for="(game, index) in this.games" :key="index">
                {{ game.version.name }}
            </li>
        </ul>
        <Sprites :sprites="sprites" />
        <!-- <AttackMoves :moves="moves" /> -->
    </div>
    
</template>

<style scoped>
.container.s{
  flex-direction: column;
}

.poke-banner{
    position: relative;
    justify-content: space-between;
    height: 60vh;
    overflow-x: clip;
    padding-top: 3rem;
}

.type{
   width: 0;
   height: 0;
}

.type img{
    position: absolute;
    opacity: 0.3;
    filter: brightness(0) invert(1);
}

.type > :first-child{
    bottom: 10px;
    right: 350px;
    width: 200px;
}
.type > :nth-child(2){
    bottom: 230px;
    right: 490px;
    width: 100px;
}
.type > :nth-child(3){
    bottom: 330px;
    right: 390px;
    width: 50px;
}
.type > :nth-child(4){
    width: 380px;
    right: -30px;
    top: 25px;
    rotate: -30deg;
    z-index: 0;
}

.poke-banner .data{
    display: flex;
    flex-direction: column;
    height: 100%;
}

.poke-banner h1,
.poke-banner h3 {
    display: flex;
    text-transform: capitalize;
    color: white;
    margin: 0;
}

.poke-banner h3{
    font-weight: lighter;
}

.subname{
    font-size: 30px;
}

.poke-banner h1{
    margin-top: 25px;
    font-size: 90px;
}

.poke-image{
    height: 100%;
    margin-right: 30px;
    z-index: 1;
}
    
</style>
