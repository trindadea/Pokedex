<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
        model_selectedType: ''
        };
    },

    // Mapeia o estado global pokemonTypes para uma propriedade computada
    computed: {
        ...mapState(['pokemonTypes', 'selectedType']),
    },
    
    methods: {
        handleTypeChange() {
            this.$store.commit('handleTypeChange', this.model_selectedType);
        }
    }
};
</script>

<template>
    <select v-model="model_selectedType" @change="handleTypeChange">
        <option v-for="type in pokemonTypes" :key="type.name" :value="type.name" :style="{ backgroundColor: type.color.primary }">
            {{ type.name }}
        </option>
    </select>
</template>  