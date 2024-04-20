<script>
import { mapState, mapMutations } from 'vuex';

export default {
    data() {
        return {
            selectedType: ''
        };
    },

    computed: {
        ...mapState(['PokemonTypes']),
    },
    
    methods: {
        ...mapMutations(['setSelectedType']), // Mapeia a mutation setSelectedType da store o método updateType deste componente
        async updateType() {
            this.setSelectedType(this.selectedType);

            await this.$store.dispatch('filterByType');
            this.$store.dispatch('setFilteredItems');
        }
    }
};
</script>

<template>
    <select v-model="selectedType" @change="updateType">
        <option v-for="type in PokemonTypes" :key="type.name" :value="type.name" :style="{ backgroundColor: type.color.primary }">
            {{ type.name }}
        </option>
    </select>
</template>  