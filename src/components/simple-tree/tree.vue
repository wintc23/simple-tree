<template>
  <div class="tree">
    <tree-node
      v-for="(nodeData, idx) of treeData"
      :nodeData="nodeData"
      :props="props"
      :nodeClass="nodeClass"
      :expand="expand"
      :allowDrag="allowDrag"
      :dragInfo="dragInfo"
      :draggable="draggable"
      :indentLineColor="indentLineColor"
      :indentWidth="indentWidth"
      :dragNote="dragNote"
      :splitPage="splitPage"
      :splitInfo="splitInfo"
      :showPageList="showPageList"
      :async="async"
      :key="idx">
    </tree-node>
  </div>
</template>

<script>
import treeNode from './tree-node.vue'

export default {
  props: {
    treeData: Array,
    props: {
      type: Object,
      default: () => {
        return {
          children: 'children',
          title: 'title',
          id: 'id',
          expanded: 'expanded'
        }
      }
    },
    refreshShowPage: Function,
    nodeClass: [Object, Array, String],
    expand: {
      type: Boolean,
      default: true
    },
    allowDrop: {
      type: Function,
      default: () => true
    },
    allowDrag: {
      type: Function,
      default: () => true
    },
    draggable: {
      type: Boolean,
      default: false
    },
    indentLine: [Array, Boolean],
    indentLimit: Number,
    maxIndent: {
      type: Number,
      default: 20
    },
    dragNote: {
      type: Object,
      default: () => {
        return {
          before: 'relative position: before',
          after: 'relative position: after',
          inner: 'relative position: inner'
        }
      }
    },
    splitPage: {
      type: Boolean,
      default: false
    },
    splitInfo: {
      type: Object,
      default: () => {}
    },
    async: {
      type: Boolean,
      default: false
    }
  },
  components: {
    'tree-node': treeNode
  },
  data () {
    return {
      isTree: true,
      treeWidth: 0,
      observer: null,
      dragInfo: {
        dragData: null,
        dropData: null,
        position: '',
        before: true,
        after: true,
        inner: true
      },
      showPageList: []
    }
  },
  computed: {
    rootData () {
      let data = { isRoot: true }
      data[this.props.children] = this.treeData
      return data
    },
    indentLineColor () {
      let colorList = []
      if (typeof this.indentLine === 'boolean' && this.indentLine) {
        colorList = ['red', 'green', 'blue']
      } else if (Array.isArray(this.indentLine)) {
        colorList = this.indentLine
      }
      return colorList
    },
    indentWidth () {
      if (this.splitPage) return 0
      if (!this.indentLimit || this.indentLimit <= 0 || !this.treeWidth) {
        return this.maxIndent
      }
      let limit = this.indentLimit < 100 ? this.treeWidth * this.indentLimit / 100 : this.indentLimit
      let indent = Math.round(Math.min(limit / this.level, this.maxIndent))
      return indent
    },
    level () {
      return this.getMaxLevel()
    }
  },
  created () {
    this.registerDragHandle()
  },
  mounted () {
    this.treeWidth = Math.round(this.$el.getBoundingClientRect().width)
    this.registerObserver()
  },
  beforeDestroy () {
    this.removeObserver()
    this.$off('tree-node-drag-start')
    this.$off('tree-node-drag-end')
    this.$off('tree-node-drag-enter')
    this.$off('tree-node-drag-position')
    this.$off('tree-node-drag-over')
    this.$off('tree-node-drag-leave')
    this.$off('tree-node-drop')
  },
  methods: {
    checkAllowDrop () {
      if (!this.allowDrop || !this.dragInfo.dragData || !this.dragInfo.dropData || !this.dragInfo.position) {
        return false
      }
      if (typeof this.allowDrop === 'boolean') {
        return this.allowDrop
      }
      return this.allowDrop(this.dragInfo.dragData, this.dragInfo.dropData, this.dragInfo.position) || false
    },
    registerDragHandle () {
      this.$on('tree-node-drag-start', (event, vNode) => {
        this.dragInfo.dragData = vNode
        this.$emit('tree-drag-start', event, vNode)
      })
      this.$on('tree-node-drag-end', (event, vNode) => {
        this.clearDragInfo()
        this.$emit('tree-drag-end', event, vNode)
      })
      this.$on('tree-node-drag-enter', (event, vNode, target) => {
        this.setDropNode(vNode)
        this.$emit('tree-drag-enter', event, vNode)
      })
      this.$on('tree-node-drag-over', (event, vNode, target) => {
        this.$emit('tree-drag-over', event, vNode)
      })
      this.$on('tree-node-drag-position', (position) => {
        this.dragInfo.position = position
        this.$emit('tree-drag-position', event, position)
      })
      this.$on('tree-node-drag-leave', (event, vNode, target) => {
        if (this.eventInElement(event, target)) return
        this.dragInfo.dropData = null
        this.$emit('tree-drag-leave', event, vNode)
      })
      this.$on('tree-node-drop', (event, vNode) => {
        if (this.checkAllowDrop()) {
          this.$emit('tree-drop', this.dragInfo.dragData, this.dragInfo.dropData, this.dragInfo.position)
        }
        this.clearDragInfo()
      })
    },
    clearDragInfo () {
      this.dragInfo = {
        dragData: null,
        dropData: null,
        position: '',
        before: true,
        after: true,
        inner: true
      }
    },
    eventInElement (event, node) {
      let rect = node.getBoundingClientRect()
      return rect.left < event.clientX && event.clientX < rect.right && rect.top < event.clientY && event.clientY < rect.bottom
    },
    setDropNode (vNode) {
      let drag = this.dragInfo.dragData
      if (!drag || drag === vNode) return
      let drop = this.dragInfo.dropData
      if (drop && drop === vNode) return
      this.dragInfo.dropData = vNode
      drop = this.dragInfo.dropData
      let childrenKey = this.props.children
      let before = true
      let after = true
      let inner = true
      if (drop.nodeData[childrenKey] && drop.nodeData[childrenKey].includes(drag.nodeData)) {
        inner = false
      }
      if (drop.parentData === drag.parentData) {
        let dragIndex = drag.parentData[childrenKey].indexOf(drag.nodeData)
        let dropIndex = drop.parentData[childrenKey].indexOf(drop.nodeData)
        if (dragIndex === dropIndex - 1) {
          before = false
        } else if (dragIndex - 1 === dropIndex) {
          after = false
        }
      }
      if (typeof this.allowDrop === 'function') {
        this.dragInfo.before = before && this.allowDrop(drag, drop, 'before')
        this.dragInfo.after = after && this.allowDrop(drag, drop, 'after')
        this.dragInfo.inner = inner && this.allowDrop(drag, drop, 'inner')
      }
    },
    getMaxLevel () {
      let level = 0
      for (let node of this.treeData) {
        let nodeLevel = this.getLevel(node)
        level = Math.max(level, nodeLevel)
      }
      return level
    },
    getLevel (data) {
      let children = data[this.props.children] || []
      if (!children.length) {
        return 0
      }
      let level = 0
      for (let node of children) {
        let nodeLevel = this.getLevel(node)
        level = Math.max(nodeLevel, level)
      }
      return level + 1
    },
    pushToShow (data) {
      if (this.showPageList.includes(data.id)) return
      this.showPageList.push(data.id)
      this.refreshShowPage && this.refreshShowPage(this.getShowList())
    },
    jumpBack (id) {
      let idx = this.showPageList.indexOf(id)
      if (idx !== -1) {
        this.showPageList.splice(idx + 1)
      }
      this.refreshShowPage && this.refreshShowPage(this.getShowList())
    },
    getShowList () {
      let list = []
      let dataList = this.treeData
      for (let id of this.showPageList) {
        let item = dataList.find(data => data.id === id)
        if (item) {
          list.push({
            title: item[this.props.title],
            id: item[this.props.id]
          })
          dataList = item[this.props.children] || []
        } else {
          break
        }
      }
      return list
    },
    registerObserver () {
      let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
      this.observer = new MutationObserver(() => {
        this.treeWidth = Math.round(this.$el.getBoundingClientRect().width)
      })
      this.observer.observe(document.body, { attributes: true, subtree: true })
    },
    removeObserver () {
      if (this.observer) {
        this.observer.disconnect()
        this.observer.takeRecords()
        this.observer = null
      }
    }
  }
}
</script>
