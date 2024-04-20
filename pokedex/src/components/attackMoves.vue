<script>
    import Description from "./attackDesc.vue";

    export default {
        props: {
            moves: Array
        },

        components: {
            Description
        }
    };
</script>

<template>
    <div>
      <div v-for="(elemento, index) in moves" :key="index">
        <p>{{ elemento.move.name }}</p>
        <p>Aprendido no nível {{ elemento.version_group_details[0].level_learned_at }}</p>
        <Description :url="elemento.move.url" />
      </div>
    </div>
  </template>