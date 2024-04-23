<script>
    import { pokemonPageTranslation } from '../translation/translation.js';

    export default {
    props: {
        sprites: Object
    },

    data() {
        return {
            currentSpriteFront: null,
            currentSpriteBack: null,
            pokemonPageTranslation
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
    <div class="sprites-container">
        <div class="sprites">
            <div style="position: relative;">
                <img :src="currentSpriteFront"/>
                <div class="circle"></div>
            </div>
            <div v-if="sprites.back_default" style="position: relative;">
                <img :src="currentSpriteBack"/>
                <div class="circle"></div>
            </div>
        </div>
    
        <div class="buttons">
            <div class="gender-buttons" v-if="sprites.front_female">
                <div class="gender male">
                    <button @click="toggleMale"><font-awesome-icon :icon="['fas', 'venus']" /></button>
                    <span>{{ pokemonPageTranslation[this.$store.state.selectedLanguage].male }}</span>
                </div>
                <div class="gender female">
                    <button @click="toggleFemale"><font-awesome-icon :icon="['fas', 'venus']" /></button>
                    <span>{{ pokemonPageTranslation[this.$store.state.selectedLanguage].female }}</span>
                </div>
            </div>

            <div class="variant-buttons" v-if="sprites.front_shiny">
                <div class="gender default" v-if="!sprites.front_female">
                    <button @click="toggleMale"><font-awesome-icon :icon="['far', 'star']" /></button>
                    <span>{{ pokemonPageTranslation[this.$store.state.selectedLanguage].default }}</span>
                </div>
                <div class="gender shiny">
                    <button @click="toggleShiny"><font-awesome-icon :icon="['fas', 'star']" /></button>
                    <span>{{ pokemonPageTranslation[this.$store.state.selectedLanguage].shiny }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.sprites-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.sprites{
    display: flex;
    flex-direction: row;
}

.sprites .circle{
    position: absolute;
    width: 70px;
    height: 70px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    top: 10px;
    left: calc(50% - 35px);
    z-index: 0;
}

.sprites img{
    position: relative;
    width: 140px;
    height: 140px;
    z-index: 1;
}

.buttons,
.gender-buttons,
.variant-buttons{
    display: flex;
    flex-direction: row;
    gap: 24px;
}

.gender{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
}

.gender span{
    font-size: 14px;
    font-weight: bold;
    color: white;
    text-transform: capitalize;
}

.male button{
    background-color: blue;
}

.female button{
    background-color: rgb(255, 0, 43);
}

.default button{
    background-color: grey;
}

.shiny button{
    background-color: yellow;
}

.gender button{
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 5px 5px 0 0 rgba(0, 0, 0, 0.3);
}

.gender button svg{
    color: white;
    width: 20px;
    height: 20px;
    cursor: pointer;
}
</style>