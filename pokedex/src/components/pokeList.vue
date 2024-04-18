<script>
import { mapState } from 'vuex';

import PokeCard from './pokeCard.vue';
import Header from './header.vue';

export default {
    components: {
        PokeCard,
        Header
    },

    data() {
        return {
            itemsPerPage: 30
        };
    },

    computed: {
        ...mapState(['filteredItems']), // Mapeia o estado global filteredItems para a variável computada visibleItems
        visibleItems() {
            return this.filteredItems.slice(0, this.itemsPerPage);
        }
    },

    mounted() {    
        window.addEventListener('scroll', this.handleScroll);
    },
    
    methods: {
        async loadMoreItems() {
            this.itemsPerPage += 30;
        },

        handleScroll() {
            const pokeList = this.$refs.pokeList;
            const scrollPosition = window.scrollY + window.innerHeight;
            const listBottom = pokeList.offsetTop + pokeList.offsetHeight;

            // Se estiver perto do final da lista, carregar mais itens
            if (scrollPosition > listBottom - 300) {
                this.loadMoreItems();
            }
        }
    }
};
</script>

<template>
    <Header />
    <div class="poke-list" ref="pokeList">
        <PokeCard v-for="(item, index) in visibleItems" :key="index" :pokemon="item" />
    </div>
</template>

<style>
.poke-list {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
}
</style>