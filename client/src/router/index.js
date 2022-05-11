import Vue from "vue"
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import join from "../views/Join.vue"
import BoardList from "../views/board/list.vue"
import Boardwrite from "../views/board/write.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: "/join",
    component: join
  },
  {
    path: "/board",
    component: BoardList
  },
  {
    path: "/board/write",
    component: Boardwrite
  }

]


const router = new VueRouter({
  routes
})

export default router
