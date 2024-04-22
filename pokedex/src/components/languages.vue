<script>
    export default {
        methods: {
            // Método para selecionar o idioma e emitir um evento
            selectLanguage(languageCode) {
                // Emitir evento para informar que o idioma foi selecionado
                this.$emit('language-selected', languageCode);
            }
        }
    };
</script>

<template>
    <div class="languages">
        <img src="../assets/flags/pt-br.png" @click="selectLanguage('pt-br')">
        <img src="../assets/flags/en.png" @click="selectLanguage('en')">
        <img src="../assets/flags/es.png" @click="selectLanguage('es')">
        <img src="../assets/flags/fr.png" @click="selectLanguage('fr')">
        <img src="../assets/flags/ja.png" @click="selectLanguage('ja')">
    </div>
    </template>

<style scoped>
.languages{
    position: absolute;
    display: flex;
    gap: 1rem;
    top: 1rem;
    right: 1rem;
    z-index: 1;
}

.languages img{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
}
</style>