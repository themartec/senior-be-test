import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/Home.vue')
    },
    {
      path: '/:type/folder/:pathMatch(.*)*',
      name: 'folder',
      component: () => import('@/FolderView.vue')
    }
  ]
})
export default router
