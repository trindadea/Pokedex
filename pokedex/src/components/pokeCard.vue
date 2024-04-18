<script>
    export default {
        props: {
            pokemon: {
                type: Object,
                required: true
            }
        },

        data() {
            return {
                id: '',
                species: '',
                types: [], 
                sprite: ''
            };
        },

        mounted() {
            this.fetchPokemon(this.pokemon.name);
        },

        methods: {
            async fetchPokemon(name) {
                try {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                    if (!response.ok) {
                    throw new Error(`Falha ao buscar os dados de ${name}`);
                    }

                    var json = await response.json();
                    this.id = json.id;
                    this.species = json.species.name
                    this.types = json.types
                    this.sprite = json.sprites.other["official-artwork"].front_default
                    // console.log(this.types[0].type.name)
                } catch (error) {
                    console.error('Erro ao buscar dados:', error);
                }
            },

            redirectToPokePage() {
                // Alternativamente, você pode redirecionar programaticamente usando o método push do router
                this.$router.push(`/pokemon/${this.id}`);
            }
        }
    }
</script>

<template>
    <div @click="redirectToPokePage" class="poke-card">
        <div class="poke-sprite">
            <img :src="this.sprite" alt="Imagem de {{ pokemon.name }}" />
        </div>

        <div class="poke-data">
            <span>{{ pokemon.name }}</span>
            <span>nº {{ this.id }}</span>
            <div>
                <div>{{ this.species }}</div>
                <div class="poke-type">
                    <div v-for="(type, index) in this.types" :key="index">
                        {{ type.type.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.poke-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: aliceblue;
    width: 200px;
    height: calc(200px * 16 / 9); /* Calcula a altura com base na largura para manter a proporção 16x9 */
    border-radius: 1rem;
}

.poke-sprite{
    position: relative;
    background-color: white;
    border-radius: 50%;
}
.poke-sprite img{
    width: 150px;
    height: 150px;
}

.poke-type{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

</style>