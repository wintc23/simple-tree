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
      :treeData="treeData"
      draggable>
      <div
        class="node-content"
        slot-scope="{ parentData, data }"
        @dblclick="editNode(data)"
        :class="data.id === chooseNode ? 'current-node' : ''">
        <div class="node-name">{{ data.title }}</div>
        <div class="node-divide"></div>
        <div class="node-menu-icons">
          <Icon
            class="node-menu-icon"
            @click.stop="addBrother(parentData, data)"
            type="md-add-circle"
            title="添加同级节点"/>
          <Icon
            @click.stop="addChild(data)"
            class="node-menu-icon"
            type="md-add"
            title="添加子级节点"/>
          <Icon
            @click.stop="deleteNode(parentData, data)"
            class="node-menu-icon"
            type="md-trash"
            title="删除节点"/>
        </div>
      </div>
    </simple-tree>
    <Modal
      title="输入节点名称"
      @on-ok="saveNode"
      @on-cancle="clearEditingInfo"
      v-model="editingInfo.show">
      <Input
        ref="titleInput"
        v-model="editingInfo.title"
        @on-enter="saveNode">
      </Input>
    </Modal>
  </div>
</template>

<script>
import simpleTree from '@/components/simple-tree'

export default {
  components: {
    'simple-tree': simpleTree
  },
  data () {
    return {
      nodeID: 100,
      treeData: [{
        id: 1,
        title: 'node-1',
        children: [{
          id: 2,
          title: 'node-2',
          children: [{
            id: 3,
            title: 'node-3'
          },
          {
            id: 4,
            title: 'node-4'
          },
          {
            id: 5,
            title: 'node-5'
          }]
        }]
      }],
      editingInfo: {
        show: false,
        title: '',
        info: {}
      },
      chooseNode: 0
    }
  },
  methods: {
    allowDrag (data) {
      return true
    },
    allowDrop (dragVNode, dropVNode, position) {
      return true
    },
    handleDrop (dragVNode, dropVNode, dropType) {
      let parentData, insertIndex
      if (dropType === 'before' || dropType === 'after') {
        parentData = dropVNode.parentData
        let dropNodeIndex = dropVNode.parentData.children.indexOf(dropVNode.nodeData)
        insertIndex = dropType === 'before' ? dropNodeIndex : dropNodeIndex + 1
      } else {
        parentData = dropVNode.nodeData
        if (!parentData.children) {
          this.$set(parentData, 'children', [])
        }
        insertIndex = parentData.children.length
      }
      let dragNodeIndex = dragVNode.parentData.children.indexOf(dragVNode.nodeData)
      dragVNode.parentData.children.splice(dragNodeIndex, 1)
      parentData.children.splice(insertIndex, 0, dragVNode.nodeData)
    },
    handleContentClick (event, vNode) {
      this.chooseNode = vNode.nodeData.id
    },
    addBrother (parentData, data) {
      let newNode = {
        id: this.nodeID++,
        title: ''
      }
      let index = parentData.children.indexOf(data)
      parentData.children.splice(index + 1, 0, newNode)
      this.editNode(newNode)
    },
    addChild (data) {
      let newNode = {
        id: this.nodeID++,
        title: ''
      }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.unshift(newNode)
      this.editNode(newNode)
    },
    deleteNode (parentData, data) {
      let index = parentData.children.indexOf(data)
      parentData.children.splice(index, 1)
    },
    editNode (data) {
      this.editingInfo.show = true
      this.editingInfo.title = data.title
      this.editingInfo.info = data
      this.$nextTick(() => {
        this.$refs.titleInput.focus()
      })
    },
    saveNode (data) {
      this.editingInfo.info.title = this.editingInfo.title
      this.clearEditingInfo()
    },
    clearEditingInfo () {
      this.editingInfo = {
        show: false,
        title: '',
        info: {}
      }
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
  user-select none
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
      .node-menu-icons
        display flex
        align-items center
        font-size 1rem
        opacity 0
        .node-menu-icon
          cursor pointer
          &:active
            position relative
            left 1px
            top 1px
      &:hover
        background #ECF2FC
        .node-menu-icons
          opacity 1
      &.current-node
        background #D0DEF8
</style>
