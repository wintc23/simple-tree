import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: () => import('@/samples/Index')
    },
    {
      path: '/split',
      name: 'SplitTree',
      component: () => import('@/samples/SplitTree')
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: () => import('@/samples/HelloWorld')
    }
  ]
})