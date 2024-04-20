<script>
    import { useRoute } from 'vue-router';
    import NestedEvolution from './nestedEvolution.vue';

    export default {
        components: {
            NestedEvolution,
        },

        props: {
            name: String
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

            console.log(this.evolutionChain)

            } catch (error) {
            console.error('Error:', error);
            }
        }
    };
</script>

<template>
    <div>
      <div v-if="evolutionChain.chain">
        <!-- Componente recursivo -->
        <NestedEvolution :evolutionChain="evolutionChain.chain" />
      </div>
    </div>
</template>
  