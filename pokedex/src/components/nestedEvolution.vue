<script>
  export default {
    name: 'NestedEvolution',

    props: {
      evolutionChain: Object,
      type: String
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

          await this.defineColors();
        } catch (error) {
          console.error('Erro ao buscar dados:', error);
        }
      },

      async defineColors() {
        const { PokemonTypes } = this.$store.state;
        
        const primaryType = this.type;
        const foundType = PokemonTypes.find(type => type.name === primaryType);
            
        // Define a cor do nome pokemonName
        this.$refs.pokemonName.style.color = foundType.color.primary;
        // Define a cor do ícone de Next
        if(this.$refs.nextIcon) {
          this.$refs.nextIcon.$el.style.color = foundType.color.primary;
        }
      }
    }
  };
</script>

<template>
  <div class="evolution-chain">
    <div class="evolution">
      <img :src="image" alt="Imagem de {{ evolutionChain.species.name }}" />
      <span ref="pokemonName">{{ evolutionChain.species.name }}</span>
    </div>
    
    <div class="next-evolution-container" v-if="evolutionChain.evolves_to.length > 0">
      <font-awesome-icon ref="nextIcon" :icon="['fas', 'chevron-right']" />
      <div class="next-evolution">
        <div v-for="(evolutionTo, index) in evolutionChain.evolves_to" :key="index">
          <NestedEvolution :evolutionChain="evolutionTo" :type="this.type"/>
        </div>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
.evolution-chain{
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.evolution{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.evolution span{
  font-size: 1rem;
  font-weight: bold;
  text-transform: capitalize;
}

.evolution img{
  width: 150px;
  height: 150px;
  margin-bottom: 1rem;
}

.next-evolution-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}

.next-evolution-container svg{
  width: 24px;
  height: 24px;
}

.next-evolution{
  display: flex;
  flex-wrap: wrap;
}

</style>