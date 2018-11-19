import Vue from 'vue'
import SimpleTree from './simple-tree'
import { Icon } from 'iview'
import 'iview/dist/styles/iview.css'

Vue.component('Icon', Icon)

const Components = {
  SimpleTree
}

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})

export default Components