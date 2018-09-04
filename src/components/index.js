import Vue from 'vue'
import SimpleTree from './simple-tree'

const Components = {
  SimpleTree
}

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})

export default Components