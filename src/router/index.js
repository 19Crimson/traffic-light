import Vue from 'vue'
import Router from 'vue-router'
import TrafficLight from '@/components/TrafficLight.vue'

Vue.use(Router)
let currentPath = localStorage.getItem('color') || 'red'

const routes = [
  {
    path: '/',
    redirect: `/${currentPath}`
  },
  {
    path: '/:color',
    name: 'TrafficLight',
    component: TrafficLight
  }
]
/* router.beforeEach((to, next) => {
  if (!['red', 'yellow', 'green'].includes(to.params.color)) {
      next({path: '/red'})
  }
}) */

export default new Router({
  routes,
  mode: 'history'
})
