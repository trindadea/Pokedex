<script>
import { mapState, mapMutations } from 'vuex';
import { typesTranslation, indexTranslation } from '../translation/translation.js';

export default {
    computed: {
        ...mapState(['PokemonTypes']),
    },

    data() {
        return {
            // Objetos de tradução
            typesTranslation,
            indexTranslation
        };
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
        <span for="typesList">{{ indexTranslation[this.$store.state.selectedLanguage].filterLabel }}</span>
        <div id="typesList" class="types-list">
            <div class="poke-type" v-for="type in PokemonTypes" :key="type.name" @click="updateType(type.name)" :style="{ backgroundColor: type.color.primary }">
                <img :src="'src/assets/types_icon/' + type.name + '.webp'"/>
                <span>{{ typesTranslation[this.$store.state.selectedLanguage][type.name] }}</span>
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
    font-size: 16px;
    font-weight: bold;
    color: rgb(225 176 102);
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
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width:100px;
    height: fit-content;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
    margin-bottom: 1rem;
    gap: 8px;
    box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.5);
}

.poke-type span{
    font-size: 14px;
    font-weight: bold;
    text-transform: capitalize;
    color: white;
    margin: 0;
}

.poke-type img{
    width: 16px;
    height: 16px;
}
</style>