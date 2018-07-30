import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '*', redirect: '/' },
    { path: '/ssocallback', name: 'ssocallback', component: () => import(/* webpackChunkName: "callback" */ '@/views/SSOCallback.vue') },
    {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: "Home" */ '@/views/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    }
  ]
})
