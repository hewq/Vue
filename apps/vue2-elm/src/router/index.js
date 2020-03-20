import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/Login.vue')
  },
  {
    path: '/city/:cityid',
    component: () => import(/* webpackChunkName: "city" */ '@/views/city/City.vue')
  },
  {
    path: '/msite',
    component: () => import(/* webpackChunkName: "msite" */ '@/views/msite/Msite.vue'),
    meta: { keepAlive: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
