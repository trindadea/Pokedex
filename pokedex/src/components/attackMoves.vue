<script>
    import Description from "./attackDesc.vue";

    export default {
        props: {
            moves: Array,
            color: String
        },

        components: {
            Description
        }
    };
</script>

<template>
  <div class="moves-container">
    <div class="move" v-for="(elemento, index) in moves" :key="index" :style="{
                backgroundColor: color.replace(', 1)', ', 0.3)'),
                border: `3px solid ${color}`
            }">
      <p :style="{color: color}">{{ elemento.move.name.split("-").join(" ") }}</p>
      <p :style="{color: color}">Aprendido no Nível {{ elemento.version_group_details[0].level_learned_at }}</p>
      <!-- <Description :url="elemento.move.url" /> -->
    </div>
  </div>
</template>

<style scoped>
.moves-container{
  display: flex;
  flex-direction: row;
  gap: 1rem;
  overflow: hidden;
}

.move{
  display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    min-width: calc(222px* 9 / 16);
    height: 222px;
    background-color: rgb(61, 164, 255);
    border-radius: 8px;
    padding: 1rem;

    text-align: center;
    box-shadow: 5px 5px 0px 0px rgba(0, 0, 0, 0.5);
}

.move :first-child{
  font-size: 16px;
  font-weight: bold;
  text-transform: capitalize;
}

.move :nth-child(2){
  font-size: 16px;
  font-weight: bold;
}
</style>