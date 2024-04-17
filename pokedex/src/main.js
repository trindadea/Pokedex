import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

// Importe suas views
import Index from './views/index.vue';
import PokemonPage from './views/pokemon.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Index },
    { path: '/pokemon/:id', component: PokemonPage }
  ]
});

const app = createApp(App);
app.use(router);

app.mount('#app');