<script>
import Banner from '../components/banner.vue';
import PokeList from '../components/pokeList.vue';
import Languages from '../components/languages.vue';

// Configurações do componente Vue
export default {
    components: {
        Banner,
        PokeList,
        Languages
    }
};
</script>

<template>
    <Languages />
    <Banner />
    <PokeList />
</template>