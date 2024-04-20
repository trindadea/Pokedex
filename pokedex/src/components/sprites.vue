<script>
    export default {
    props: {
        sprites: Object
    },

    data() {
        return {
        currentSpriteFront: null,
        currentSpriteBack: null
        }
    },
    
    methods: {
        toggleMale() {
            this.currentSpriteFront = this.sprites.front_default;
            this.currentSpriteBack = this.sprites.back_default;
        },

        toggleFemale() {
            this.currentSpriteFront = this.sprites.front_female;
            this.currentSpriteBack = this.sprites.back_female;
        },

        toggleShiny() {
            this.currentSpriteFront = this.sprites.front_shiny;
            this.currentSpriteBack = this.sprites.back_shiny;
        }
        },

        // Monitorar as alterações na propriedade sprites pois, durante a criação do componente, sprites ainda não foi passado como propriedade
        watch: {
            sprites: {
                handler(loadedSprites) {
                    this.currentSpriteFront = loadedSprites.front_default;
                    this.currentSpriteBack = loadedSprites.back_default;
                },
            immediate: true
            }
        }
    }
</script>

<template>
    <div>
        <img :src="currentSpriteFront"/>
        <img :src="currentSpriteBack"/>

        <div v-if="sprites.front_female">
            <button @click="toggleMale">Male</button>
            <button @click="toggleFemale">Female</button>
        </div>

        <div v-if="sprites.front_shiny">
            <button v-if="!sprites.front_female" @click="toggleMale">Default</button>
            <button @click="toggleShiny">Shiny</button>
        </div>
    </div>
</template>