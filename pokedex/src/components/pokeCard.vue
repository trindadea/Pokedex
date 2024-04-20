<script>
import { mapState } from 'vuex';

export default {
    props: {
        pokemon: {
            type: Object,
            required: true
        }
    },

    computed: {
        // Mapeia o estado global selectedType para a propriedade computada
        ...mapState(['selectedType']),
        
        typeMatches() {
            // Se nenhum tipo estiver selecionado, retorna true para renderizar o card
            if (!this.selectedType) {
                return true
            }
            
            // Verifica se o tipo do Pokémon está na lista de tipos selecionados
            return this.types.some(type => type.type.name === this.selectedType);
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

    // watcher é usado para observar as mudanças na prop 'pokemon'
    watch: {
        pokemon: {
            immediate: true,
            // Função que será executada sempre que a propriedade pokemon for alterada (filtragem por pesquisa)
            handler(newPokemon) {
                this.fetchPokemon(newPokemon.name);
            }
        }
    },

    methods: {
        async fetchPokemon(name) {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                if (!response.ok) {
                    throw new Error(`Falha ao buscar os dados de ${name}`);
                }

                const json = await response.json();
                this.id = json.id;
                this.species = json.species.name;
                this.types = json.types;
                this.sprite = json.sprites.other['official-artwork'].front_default;
                
                this.backgroundColor()
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        },

        redirectToPokePage() {
            this.$router.push(`/pokemon/${this.id}`);
        },

        backgroundColor() {
            console.log('alo')
            const { pokemonTypes } = this.$store.state;
            
            const primaryType = this.types[0].type.name;
            const foundType = pokemonTypes.find(type => type.name === primaryType);

            // Retorna a cor primária correspondente ao tipo do Pokémon
            const backgroundColor = foundType.color.primary
                
            // Define a cor de fundo da div pokeCard
            this.$refs.pokeCard.style.backgroundColor = backgroundColor;
        }
    },

};
</script>

<template>
    <div v-if="typeMatches" ref="pokeCard" @click="redirectToPokePage" class="poke-card">
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
    /* background-color: aliceblue; */
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