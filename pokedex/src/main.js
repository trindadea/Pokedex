import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

// Importe suas views
import index from './views/index.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: index }
  ]
});

const app = createApp(App);
app.use(router);

app.mount('#app');
