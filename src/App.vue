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

<style>
.container{
    display: flex;
    flex-direction: row;
    padding: 0 10% 0rem 10%;
}

*{
    font-family: sans-serif;
}

body{
    background-color: #fffbf5;
    margin: 0;
    padding: 0;
}
</style>