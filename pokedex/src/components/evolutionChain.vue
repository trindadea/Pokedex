<script>
    import { useRoute } from 'vue-router';
    import { mapState } from 'vuex';
    import NestedEvolution from './nestedEvolution.vue';

    export default {
        components: {
            NestedEvolution,
        },

        props: {
            name: String,
            type: String
        },

        computed: {
        ...mapState(['PokemonTypes'])
        },

        data() {
            return {
                evolutionChain: []
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

            await this.defineColors();
            } catch (error) {
            console.error('Error:', error);
            }
        },

        methods: {
            async defineColors() {
                const { PokemonTypes } = this.$store.state;
                    
                const primaryType = this.type;
                const foundType = PokemonTypes.find(type => type.name === primaryType);
                    
                // Define a cor do do nome chainName
                this.$refs.chainName.style.color = foundType.color.primary;
                // Define estilização da div chainContainer
                this.$refs.chainContainer.style.border = `3px solid ${foundType.color.primary}`;
                this.$refs.chainContainer.style.backgroundColor = foundType.color.primary.replace(", 1)", ", 0.1)");
            }
        }
    };
</script>

<template>
    <span ref="chainName">Cadeia de Evoluções</span>
    <div ref="chainContainer" class="evolution-chain-container">
      <div v-if="evolutionChain.chain">
        <!-- Componente recursivo -->
        <NestedEvolution :evolutionChain="evolutionChain.chain" :type="this.type"/>
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
  