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

            // Obtém um índice aleatório
            const randomIndex = Math.floor(Math.random() * this.items.length);

            // Pega nome do pokemon aleatório
            this.random_poke_name = this.items[randomIndex].name

            // Obtém o URL do Pokémon aleatório
            const randomPokemonUrl = this.items[randomIndex].url;
            try {
                const response = await fetch(randomPokemonUrl);
                if (!response.ok) {
                    throw new Error('Falha ao buscar os dados do Pokémon');
                }
                const pokemonData = await response.json();

                // Pega sprite do pokemon aleatório
                this.random_poke_sprite = pokemonData.sprites.front_default
            } catch (error) {
                console.error('Erro ao buscar dados do Pokémon:', error);
            }
        }
    }
};
</script>

<template>
    <div class="banner">
      
      <div class="banner-att">
        <span>POKEDEX</span>
        <div class="banner-att name">
          <span>{{ random_poke_name }}</span>
        </div>
      </div>

      <div v-if="random_poke_sprite">
        <img :src="random_poke_sprite" alt="Imagem do Pokémon" />
      </div>
      
    </div>
</template>

<style scoped> 
.banner{
  display: flex;
}

.banner-att,
.banner-att .name{
  display: flex;
  flex-direction: column;
}

</style>