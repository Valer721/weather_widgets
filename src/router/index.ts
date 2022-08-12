import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import WidgetsList from "../views/WidgetsList.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: WidgetsList
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
