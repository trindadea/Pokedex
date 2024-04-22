<script>
import { defineComponent } from 'vue';
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

export default defineComponent({
  name: 'MyCarousel',

  components: {
    Carousel,
    Slide,
    Navigation,
  },

  props: {
    moves: Array,
    color: String,
  },

  data() {
    return {
      // carousel settings
      settings: {
        itemsToShow: 1,
        snapAlign: 'center',
      },
      // breakpoints are mobile first
      // any settings not specified will fallback to the carousel settings
      breakpoints: {
        // 700px and up
        700: {
          itemsToShow: 3.5,
          snapAlign: 'center',
        },
        // 1024 and up
        1024: {
          itemsToShow: 6.4,
          snapAlign: 'center',
        },
      },
    };
  },
});
</script>

<template>
  <div>
    <span :style="{color: color}">Habilidades</span>
    <div class="carousel-container">
      <Carousel :settings="settings" :breakpoints="breakpoints">
        <Slide v-for="(elemento, index) in moves" :key="index">
          <div class="move" :style="{
              backgroundColor: color.replace(', 1)', ', 0.3)'),
              border: `3px solid ${color}`
            }">
            <p>{{ elemento.move.name.split('-').join(' ') }}</p>
            <p :style="{color: color}">Aprendido no Nível {{ elemento.version_group_details[0].level_learned_at }}</p>
            <!-- <Description :url="elemento.move.url" /> -->
          </div>
        </Slide>

        <template #addons>
          <Navigation>
            <template #next>
              <font-awesome-icon class="icon next" :style="{ color: color }" :icon="['fas', 'chevron-right']" />
            </template>
            <template #prev>
              <font-awesome-icon class="icon prev" :style="{ color: color }" :icon="['fas', 'chevron-left']" />
            </template>
          </Navigation>
        </template>
      </Carousel>
    </div>
  </div>
  
</template>

<style scoped>
span{
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 8px;
}

.moves-container {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  overflow: hidden;
}

.move {
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

.move :first-child {
  font-size: 24px;
  font-weight: bold;
  text-transform: capitalize;
  color: white;
  filter: drop-shadow(2px 2px 0 rgba(0, 0, 0, 0.3));
}

.move :nth-child(2) {
  font-size: 16px;
  font-weight: bold;
}

.icon{
  position: relative;
  width: 48px;
  height: 48px;
}

.prev{
  right: 60px !important;
}

.next{
  left: 60px !important;
}
</style>