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
    <div @click="teste" class="search-bar">
        <span for="searchInput">Pesquise por Nome, Número ou Espécie</span>
        <div style="position: relative;">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
            <input type="text" v-model="query" @input="updateQuery">
        </div>
    </div>
</template>

<style scoped>
.search-bar{
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}

.search-bar span{
    font-size: 14px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.3);
    margin-bottom: 8px;
}

.search-bar svg{
    position: absolute;
    top: 8px;
    left: 12px;
    color: rgb(195 117 0 / 50%);
    transform: rotateZ(90deg);
    width: 18px;
    height: 18px;
}

.search-bar input{
    width: calc(100% - 36px);
    padding: 6px 0 6px 36px;
    border-radius: 8px;
    border: solid 3px rgb(195 117 0 / 50%);
    background-color: blanchedalmond;
    font-size: 14px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.7);
}

.search-bar input:focus,
.search-bar input:hover{
    outline: none;
    border: solid 3px rgb(195 117 0 / 70%);
}
</style>