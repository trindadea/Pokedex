<script>
  // Configurações do componente Vue
  export default {    
    data() {
      return {
        items: [],
        random_poke_name: '',
        random_poke_sprite: ''
      };
    },

    mounted() {
        this.fetchData();
    },
    
    methods: {
        async fetchData() {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
                if (!response.ok) {
                throw new Error('Falha ao buscar os dados');
                }

                var json = await response.json();
                this.items = json.results;

                this.requestRandomPokemon();
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        },

        async requestRandomPokemon() {
            if (this.items.length === 0) {
                console.error('Nenhum Pokémon disponível');
                return;
            }

            const randomIndex = Math.floor(Math.random() * this.items.length);
            this.random_poke_name = this.items[randomIndex].name
            const randomPokemonUrl = this.items[randomIndex].url;

            try {
                const response = await fetch(randomPokemonUrl);
                if (!response.ok) {
                    throw new Error('Falha ao buscar os dados do Pokémon');
                }
                const pokemonData = await response.json();

                this.random_poke_sprite = pokemonData.sprites.front_default
            } catch (error) {
                console.error('Erro ao buscar dados do Pokémon:', error);
            }
        }
    }
};
</script>

<template>
    <div class="container banner">
      
      <div class="banner-att">
        <img src="../assets/pokedex.webp">
      </div>

      <img class="pikachu" src="../assets/pikachu.png">
      
    </div>
</template>

<style scoped> 
.banner{
  position: relative;
  justify-content: space-between;
  height: 420px;
  overflow-x: clip;
  padding-top: 3rem;
  margin-bottom: 24px;
  background-color: yellow;
}

.pikachu{
  margin-bottom: 3rem;
}

</style>