import Vue from 'vue'
import App from './App.vue'
import { Icon } from 'iview'
import 'iview/dist/styles/iview.css'

Vue.component('Icon', Icon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
