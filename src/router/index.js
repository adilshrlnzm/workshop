import { createWebHistory, createRouter } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import UploadPage from '../views/UploadPage.vue'

const routes = [
    { path: '/', component: HomePage },
    { path:'/upload',component: UploadPage}
  ]

const router = createRouter({
history: createWebHistory(),
routes,
})

export default router;