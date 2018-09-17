<template>
  <div class="container">
    <simple-tree
      class="tree"
      :allowDrag="allowDrag"
      :allowDrop="allowDrop"
      @tree-drop="handleDrop"
      @content-click="handleContentClick"
      :indentLine="true"
      :indentLimit="40"
      :treeData="treeData">
      <div
        class="node-content"
        slot-scope="{ parentData, data }">
        <div class="node-name">{{ data.title }}</div>
        <div class="node-divide"></div>
        <div class="node-menu-icon">
          <Icon
          type="md-add-circle"
          title="添加同级节点"/>
          <Icon
            type="md-add"
            title="添加子级节点"/>
          <Icon
            type="md-trash"
            title="删除节点"/>
        </div>
      </div>
    </simple-tree>
  </div>
</template>

<script>
import simpleTree from './simple-tree'

export default {
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
      }],
      editingInfo: {
        show: false,
        title: '',
        info: {}
      }
    }
  },
  methods: {
    allowDrag (data) {
      return true
    },
    allowDrop (dragVNode, dropVNode, position) {
      return true
    },
    handleDrop (dragVnode, dropVnode, dropType) {
    },
    handleContentClick (event, vNode) {
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  position fixed
  top 10%  
  bottom 10%
  left 0
  right 0
  .tree
    width 50%
    height 100%
    box-shadow 0 0 2px 1px #3361D8
    border-radius 5px
    padding 0.5rem
    margin 0 auto
    .node-content
      display flex
      box-shadow 0 0 1px 0 #A1BFFC
      align-items center
      margin 2px
      .node-name
        padding 0 2px
        word-break break-all
        display -webkit-box
        -webkit-line-clamp 3
        -webkit-box-orient vertical
        overflow-y hidden
      .node-divide
        flex auto
      .node-menu-icon
        display flex
        align-items center
        font-size 1rem
        opacity 0
      &:hover
        background #ECF2FC
        .node-menu-icon
          opacity 1
      &.choose
        background #D0DEF8
</style>
