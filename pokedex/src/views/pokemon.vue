<script>
    import { useRoute } from 'vue-router';
    import Sprites from '../components/sprites.vue';
    import AttackMoves from '../components/attackMoves.vue';
    import EvolutionChain from '../components/evolutionChain.vue';
    import Games from '../components/games.vue';
    import Languages from '../components/languages.vue';

    import { number } from '../translation/translation.js';
    
    export default {
        components: {
            Sprites,
            AttackMoves,
            EvolutionChain,
            Games,
            Languages
        },

        data() {
            return {
                name: '',
                image: '',
                sprites: {},
                moves: [],
                evoluions: [],
                games: [],
                type: '',
                color: '',

                // Nomes traduzidos
                names: {},

                // Objtos de tradução
                number
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

                    await this.fetchLocation(json.species.name)

                    this.setColor()

                } catch (error) {
                    console.error('Erro ao buscar dados:', error);
                }
            },

            async fetchLocation(species) {
                try {
                    const names = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${species}/`);
                    const data = await names.json();

                    // Mapeia os resultados para extrair os nomes nas línguas desejadas
                    const filteredNames = data.names.map(entry => {
                        const languageName = entry.language.name;

                        // Mapeia as línguas desejadas para os nomes correspondentes
                        const languageMap = {
                            'pt': 'pt',
                            'en': 'en',
                            'es': 'es',
                            'fr': 'fr',
                            'ja': 'ja',
                        };

                        // Verifica se a língua atual está no mapeamento
                        const mappedLanguage = languageMap[languageName];

                        // Se estiver no mapeamento, armazena o nome correspondente
                        if (mappedLanguage) this.names[mappedLanguage] = entry.name
                    })

                    this.names.pt = this.names.en;
                } catch (error) {
                    console.error('Erro ao buscar nomes em diferentes línguas:', error);
                }
            },

            setColor() {
                const { PokemonTypes } = this.$store.state;

                const primaryType = this.type;
                const foundType = PokemonTypes.find(type => type.name === primaryType);

                // Define a cor de fundo da div pokeBanner
                this.color = foundType.color.primary;
            },

            redirect(page) {
                const id = parseInt(this.$route.params.id);

                const newId = page === 'next' ? id + 1 : id - 1;
                const newRoute = `/pokemon/${newId}`;

                window.location.href = newRoute;
            }
        }
    }
</script>

<template>
    <Languages />
    <div ref="pokeBanner" class="container poke-banner" :style="{ backgroundColor: this.color }">
        <font-awesome-icon @click="redirect('prev')" class="previous" :icon="['fas', 'angle-left']" />
        <div class="data">
            <h3>{{ number[this.$store.state.selectedLanguage] }} {{ $route.params.id }}</h3>
            <div style="display: flex; flex-direction: row; align-items: end; gap: 1rem;">
                <h1>{{ names[this.$store.state.selectedLanguage] }}</h1>
                <h3 class="subname" v-if="this.name.split('-')[1]">{{ this.name.split('-').slice(1).join(' ') }}</h3>
            </div>

            <Sprites :sprites="sprites" :color="color" />
        </div>
        <div class="type">
            <img :src="'/src/assets/types/' + this.type + '.webp'"/>
            <img :src="'/src/assets/types/' + this.type + '.webp'"/>
            <img :src="'/src/assets/types/' + this.type + '.webp'"/>
            <img :src="'/src/assets/pokeball.webp'"/>
        </div>
        <img class="poke-image" :src="this.image" alt="Imagem de {{ this.name }}" />   
        <font-awesome-icon @click="redirect('next')" class="next" :icon="['fas', 'angle-right']" />
    </div>

    <div class="container s">
        <EvolutionChain :type="type" :color="color" />
        <Games :games="games" :color="color" :name="name" />
        <AttackMoves :moves="moves" :color="color" />
    </div>
    
</template>

<style scoped>
.container.s{
  flex-direction: column;
  gap: 24px;
}

.poke-banner{
    position: relative;
    justify-content: space-between;
    height: 420px;
    overflow-x: clip;
    padding-top: 3rem;
    margin-bottom: 24px;
}

.previous,
.next{
    position: absolute;
    color: white;
    height: 100%;
    width: 60px;
    top: 0;
    cursor: pointer;
}

.previous{
    left: 30px;
}

.next{
    right: 30px;
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
    margin-bottom: 10px !important;
}

.poke-banner h1{
    margin-top: 25px;
    font-size: 90px;
    filter: drop-shadow(5px 5px 0px rgba(0, 0, 0, 0.3));
}

.poke-image{
    height: 100%;
    margin-right: 30px;
    z-index: 1;
}
</style>