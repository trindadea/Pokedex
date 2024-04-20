<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            query: '', // A variável que armazenará o texto da pesquisa
        };
    },

    methods: {
        ...mapActions(['filterByQuery']), // Mapeia a ação filterByQuery da store Vuex para o método search deste componente
        search() {
            this.filterByQuery(this.query);
        }
    }
};
</script>

<template>
    <div>
        <input type="text" v-model="query" placeholder="Pesquise por Nome ou Número" @input="search">
    </div>
</template>