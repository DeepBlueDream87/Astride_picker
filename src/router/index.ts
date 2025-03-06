import { createRouter, createWebHistory, Router } from 'vue-router';
import CharacterListView from '@/views/CharacterListView.vue';
import TeamBuilderView from '@/views/TeamBuilderView.vue';

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CharacterListView
    },
    {
      path: '/team-builder',
      name: 'team-builder',
      component: TeamBuilderView
    }
  ]
});

export default router; 