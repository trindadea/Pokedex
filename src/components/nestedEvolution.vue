<script>
  export default {
    name: 'NestedEvolution',

    props: {
      evolutionChain: Object,
      color: String
    },

    data() {
      return {
        image: '',
        
        // Nomes traduzidos
        names: {}
      };
    },

    mounted() {
      this.fetchImage();
      this.fetchLocation();
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
      },

      async fetchLocation() {
            try {
                const names = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${this.evolutionChain.species.name}/`);
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
    }
  };
</script>

<template>
  <div class="evolution-chain">
    <div class="evolution">
      <div class="circle"></div>
      <img :src="image" alt="Imagem de {{ evolutionChain.species.name }}" />
      <span :style="{color: color}">{{ names[this.$store.state.selectedLanguage] }}</span>
    </div>
    
    <div class="next-evolution-container" v-if="evolutionChain.evolves_to.length > 0">
      <font-awesome-icon :icon="['fas', 'chevron-right']" :style="{ color: color } " />
      <div class="next-evolution">
        <div v-for="(evolutionTo, index) in evolutionChain.evolves_to" :key="index">
          <NestedEvolution :evolutionChain="evolutionTo" :color="color"/>
        </div>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
.circle{
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: rgb(255, 255, 255, 0.5);
  top: 0;
}

.evolution-chain{
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.evolution{
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
  align-self: center;
}

.evolution span{
  font-size: 24px;
  font-weight: bold;
  text-transform: capitalize;
}

.evolution img{
  position: relative;
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
  width: 48px;
  height: 48px;
}

.next-evolution{
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

</style>