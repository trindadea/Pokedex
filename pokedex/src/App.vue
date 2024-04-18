<script>
    export default {
        name: 'Pokedex arthureiro',
        created() {
            // Chamar a ação fetchPokemonItems quando o componente a aplicação é iniciada
            this.$store.dispatch('fetchPokemonItems');
        }
}
</script>

<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>