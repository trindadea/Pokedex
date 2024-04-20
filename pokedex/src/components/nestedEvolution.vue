<script>
  export default {
    name: 'NestedEvolution',

    props: {
      evolutionChain: Object
    },

    data() {
      return {
        image: ''
      };
    },

    mounted() {
      this.fetchImage();
    },

    methods: {
      async fetchImage() {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.evolutionChain.species.name}`);
          if (!response.ok) {
            throw new Error(`Falha ao buscar os dados de ${this.evolutionChain.species.name}`);
          }
          const json = await response.json();
          this.image = json.sprites.other["official-artwork"].front_default;
        } catch (error) {
          console.error('Erro ao buscar dados:', error);
        }
      }
    }
  };
</script>

<template>
  <div>
    <p>{{ evolutionChain.species.name }}</p>
    <img :src="image" alt="Imagem de {{ evolutionChain.species.name }}" />
    <div v-if="evolutionChain.evolves_to.length > 0">
      <div v-for="(evolutionTo, index) in evolutionChain.evolves_to" :key="index">
        <NestedEvolution :evolutionChain="evolutionTo" />
      </div>
    </div>
  </div>
</template>