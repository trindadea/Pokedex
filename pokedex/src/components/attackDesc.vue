<script>
  export default {
    props: {
      url: String
    },

    data() {
      return {
        description: ''
      };
    },

    async created() {
      try {
        const response = await fetch(this.url);
        if (!response.ok) {
          throw new Error('Falha ao buscar descrição');
        }

        const json = await response.json();
        this.description = json.effect_entries[0].effect;
      } catch (error) {
        console.log(this.url)
        console.error('Erro ao buscar descrição:', error);
      }
    }
  };
</script>

<template>
    <div>
      <p>{{ description }}</p>
    </div>
</template>