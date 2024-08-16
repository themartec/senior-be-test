import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:type/folder/:pathMatch(.*)*',
      name: 'folder',
      component: () => import('@/FolderView.vue')
    }
  ]
})
export default router
