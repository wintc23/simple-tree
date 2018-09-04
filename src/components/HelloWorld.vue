<template>
  <div>
    <simple-tree
      class="tree"
      :treeData="treeData">
      <div
        slot-scope="{ parentData, data }">
        <div class="node-name">{{ data.title }}</div>
      </div>
    </simple-tree>
  </div>
</template>

<script>
import simpleTree from './simple-tree'
export default {
  name: 'HelloWorld',
  components: {
    'simple-tree': simpleTree
  },
  data () {
    return {
      nodeID: 100,
      treeData: [{
        id: 1,
        children: [{
          id: 2,
          title: '昆明',
          children: [{
            id: 3,
            title: '五华'
          },
          {
            id: 3,
            title: '西山'
          },
          {
            id: 4,
            title: '盘龙'
          }]
        }],
        title: '云南'
      }]
    }
  }
}
</script>

<style lang="stylus" scoped>
.tree
  width 50%
  box-shadow 0 0 2px 1px #3361D8
  border-radius 5px
  padding 0.5rem
  margin 0 auto
</style>
