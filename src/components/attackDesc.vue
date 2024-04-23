<script>
  export default {
    props: {
      url: String
    },

    data() {
      return {
        // description: '',
        moveNames:{}
      };
    },

    mounted(){
      this.fetchMoves()
    },

    methods: {
      async fetchMoves() {
        try {
            const response = await fetch(this.url);
            if (!response.ok) {
                throw new Error(`Falha ao buscar os dados das habilidades`);
            }

            const json = await response.json();

            const filteredNames = json.names.map(entry => {
                const languageName = entry.language.name;

                const languageMap = {
                    'pt': 'pt',
                    'en': 'en',
                    'es': 'es',
                    'fr': 'fr',
                    'ja': 'ja',
                };

                const mappedLanguage = languageMap[languageName];

                if (mappedLanguage) this.moveNames[mappedLanguage] = entry.name;
            });

            if (!this.moveNames.pt) {
                this.moveNames.pt = this.moveNames.en;
            }
        } catch (error) {
            console.error('Erro ao buscar nomes dos movimentos em diferentes línguas:', error);
        }
      }
    }
  };
</script>

<template>
    <div>
      <p>{{ moveNames[this.$store.state.selectedLanguage] }}</p>
      <!-- <p>{{ description }}</p> -->
    </div>
</template>