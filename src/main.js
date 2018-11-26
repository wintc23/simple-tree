import Vue from 'vue'
import App from './App.vue'
import { Icon, Modal, Input } from 'iview'
import 'iview/dist/styles/iview.css'
import router from '@/router'
import simpleTree from '@/components/simple-tree'

Vue.component('simple-tree', simpleTree)

Vue.component('Icon', Icon)
Vue.component('Modal', Modal)
Vue.component('Input', Input)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
