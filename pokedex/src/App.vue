<script>
    export default {
        name: 'Pokedex arthureiro',
        created() {
            // Chamar a ação fetchPokemonList quando o componente a aplicação é iniciada
            this.$store.dispatch('fetchPokemonList');
            this.$store.dispatch('fetchPokemonTypes');
        }
}
</script>

<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>