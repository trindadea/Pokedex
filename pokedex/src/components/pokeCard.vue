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

    computed: {
        hasSubname() {
            return this.pokemon.name.length > 10;
        }
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
            const { PokemonTypes } = this.$store.state;
            
            const primaryType = this.types[0].type.name;
            const foundType = PokemonTypes.find(type => type.name === primaryType);
                
            // Define a cor de fundo da div pokeCard
            this.$refs.pokeCard.style.backgroundColor = foundType.color.primary;
            // Define a cor da borda da div pokeCard
            this.$refs.pokeCard.style.border = `3px solid ${foundType.color.secondary}`;
        }
    },

};
</script>

<template>
    <div ref="pokeCard" @click="redirectToPokePage" class="poke-card">

        <img class="pokeball" src="../assets/pokeball.webp" />

        
        <span class="poke-number">nº {{ this.id }}</span>

        <div class="poke-sprite">
            <img :src="this.sprite" alt="Imagem de {{ pokemon.name }}" />
        </div>


        <div class="poke-data">
            <span :class="{ 'poke-name': true, 's': hasSubname }">{{ pokemon.name.split('-').join(' ') }}</span>
            <!-- <div>{{ this.species }}</div> -->
            <div class="poke-type">
                <div v-for="(type, index) in this.types" :key="index">
                    <div>
                        <img :src="'src/assets/types_icon/' + type.type.name + '.webp'"/>
                        <span>{{ type.type.name }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
*{
    text-transform: capitalize;
}

.poke-card {
    display: flex;
    flex-direction: column;
    padding: 24px;
    width: 152px;
    height: calc(152px * 16 / 9); /* Calcula a altura com base na largura para manter a proporção 16x9 */
    border-radius: 1rem;
    position: relative;
    overflow: hidden;
    box-shadow: 5px 5px 0px 0px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.poke-card:hover {
    transform: translateY(-5px);
    box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 0.5);
}

.poke-sprite{
    width: 100%;
    display: flex;
    justify-content: center;
}

.poke-sprite img{
    position: relative;
    width: 150px;
    height: 150px;
    margin-bottom: 6px;
}

.poke-type{
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 50px;
}

.poke-type div{
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
}

.poke-type img{
    width: 30px;
    height: 30px;
    margin-bottom: 12px;
    filter: drop-shadow(3px 3px 0px rgba(0, 0, 0, 0.3));}

.poke-data{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: white;
    font-size: 14px;
    font-weight: bold;
}

.poke-name{
    color: white;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 12px;
}

.poke-name.s{
    font-size: 16px;
}

.poke-number{
    font-size: 14px;
    font-weight: bold;
    color: white;
}

.pokeball{
    position: absolute;
    width: 200px;
    height: 200px;
    top: -50px;
    right: -75px;
    rotate: -45deg;
    opacity: 0.3;
    filter: brightness(0) invert(1);
}

</style>