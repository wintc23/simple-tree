import Vue from 'vue'
import iView from 'iview'
import SimpleTree from './simple-tree'
import 'iview/dist/styles/iview.css'

Vue.use(iView)

const Components = {
  SimpleTree
}

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})

export default Components