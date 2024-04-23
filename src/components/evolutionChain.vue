<script>
    import { useRoute } from 'vue-router';
    import { mapState } from 'vuex';
    import NestedEvolution from './nestedEvolution.vue';

    import { pokemonPageTranslation } from '../translation/translation.js';

    export default {
        components: {
            NestedEvolution
        },

        props: {
            name: String,
            color: String
        },

        computed: {
        ...mapState(['PokemonTypes'])
        },

        data() {
            return {
                evolutionChain: [],
                pokemonPageTranslation
            };
        },

        async mounted() {
            const route = useRoute();

            try {
                const speciesJson = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${route.params.id}/`);
                
                if (!speciesJson.ok) {
                    throw new Error('Falha ao buscar dados da Espécie');
                }

                const speciesData = await speciesJson.json();
                const evolutionChainUrl = speciesData.evolution_chain.url;
                const evolutionChainJson = await fetch(evolutionChainUrl);

                if (!evolutionChainJson.ok) {
                    throw new Error('Faha ao buscar dados da cadeia de Evolução');
                }

                const evolutionChainData = await evolutionChainJson.json();
                this.evolutionChain = evolutionChainData;

            } catch (error) {
                console.error('Error:', error);
            }
        }
    };
</script>

<template>
    <div>
        <span ref="chainName" :style="{color: color}">{{ pokemonPageTranslation[this.$store.state.selectedLanguage].evolutionChain }}</span>
        <div ref="chainContainer" class="evolution-chain-container" :style="{
                backgroundColor: color.replace(', 1)', ', 0.3)'),
                border: `3px solid ${color}`
            }">
        <div v-if="evolutionChain.chain">
            <!-- Componente recursivo -->
            <NestedEvolution :evolutionChain="evolutionChain.chain" :color="this.color"/>
        </div>
        </div>
    </div>
    
</template>

<style scoped>
span{
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 8px;
}

.evolution-chain-container{
    background-color: rgb(255 255 255);
    border-radius: 8px;
    padding: 1rem;
    display: flex;
    justify-content: center;
    box-shadow: 5px 5px 0px 0px rgba(0, 0, 0, 0.5);
}
</style>
  