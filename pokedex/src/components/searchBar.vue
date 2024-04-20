<script>
import { mapMutations } from 'vuex';

export default {
    data() {
        return {
            query: ''
        };
    },

    methods: {
        ...mapMutations(['setQuery']), // Mapeia a mutation setQuery da store o método updateQuery deste componente
        async updateQuery() {
            this.setQuery(this.query);

            await this.$store.dispatch('filterByQuery');
            this.$store.dispatch('setFilteredItems');
        }
    }
};
</script>

<template>
    <div>
        <input type="text" v-model="query" @input="updateQuery" placeholder="Pesquise por Nome ou Número">
    </div>
</template>
