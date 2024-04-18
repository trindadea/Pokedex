<template>
    <div>
        <input type="text" v-model="query" placeholder="Pesquise por Nome ou Número" @input="search">
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            query: '', // A variável que armazenará o texto da pesquisa
        };
    },

    methods: {
        ...mapActions(['filterItems']), // Mapeia a ação filterItems da store Vuex para o método search deste componente
        search() {
            this.filterItems(this.query);
        }
    }
};
</script>