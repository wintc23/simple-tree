import SimpleTree from './simple-tree'

const Components = {
  SimpleTree
}

export const simpleTree = SimpleTree

export default {
  SimpleTree,
  install: function (Vue, opts = {}) {
    Object.keys(Components).forEach(name => {
      Vue.component(name, Components[name])
    })
  }
}
