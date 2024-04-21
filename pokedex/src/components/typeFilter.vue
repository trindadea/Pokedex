<script>
import { mapState, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapState(['PokemonTypes']),
    },
    
    methods: {
        ...mapMutations(['setSelectedType']), // Mapeia a mutation setSelectedType da store o método updateType deste componente
        async updateType(typeName) {
            this.setSelectedType(typeName);

            await this.$store.dispatch('filterByType');
            this.$store.dispatch('setFilteredItems');
        }
    }
};
</script>

<template>
    <div class="types-container">
        <span for="typesList">Filtre por Tipo</span>
        <div id="typesList" class="types-list">
            <div class="poke-type" v-for="type in PokemonTypes" :key="type.name" @click="updateType(type.name)" :style="{ backgroundColor: type.color.primary }">
                {{ type.name }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.types-container{
    display: flex;
    flex-direction: column;
    flex: 1;
}

.types-container span{
    font-size: 14px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.3);
    margin-bottom: 8px;
}

.types-list{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    background-color: blanchedalmond;
    border: 3px solid #e1b066;
    padding: 1rem;
    border-radius: 8px;
    height: fit-content;
}

.poke-type{
    width: 60px;
    height: fit-content;
    font-size: 14px;
    font-weight: bold;
    text-transform: capitalize;
    text-align: center;
    color: white;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
    margin-bottom: 1rem;
}
</style>