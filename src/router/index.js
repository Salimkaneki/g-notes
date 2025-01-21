import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import NoteDetail from '../views/NoteDetail.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/note/:id', name: 'NoteDetail', component: NoteDetail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
