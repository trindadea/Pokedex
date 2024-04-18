<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState(['pokemonTypes']),
    },

    data() {
        return {
        selectedType: '',
        };
    },

    methods: {
        handleTypeChange() {
            console.log('Tipo selecionado:', this.selectedType);
        },
    }
};
</script>

<template>
    <select v-model="selectedType" @change="handleTypeChange">
        <option v-for="type in pokemonTypes" :key="type.name" :value="type.name" :style="{ backgroundColor: type.color.primary }">
            {{ type.name }}
        </option>
    </select>
</template>  