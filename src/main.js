import Vue from 'vue'
import App from './App.vue'
import { Icon, Modal, Input } from 'iview'
import 'iview/dist/styles/iview.css'

Vue.component('Icon', Icon)
Vue.component('Modal', Modal)
Vue.component('Input', Input)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
