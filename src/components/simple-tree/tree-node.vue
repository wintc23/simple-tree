<template>
  <div
    class="tree-node"
    :class="nodeClass"
    @dblclick="nodeDoubleClick"
    @click="nodeClick" v-if="showNode">
    <div
      v-if="!showChildOnly"
      class="tree-node-content"
      :draggable="canBeDrag"
      @dragstart.stop="dragStart"
      @dragend.stop="dragEnd"
      @dragenter.stop="dragEnter"
      @dragover.stop="dragOver"
      @dragleave.stop="dragLeave"
      @drop.stop="drop"
      @click="contentClick"
      @mouseenter="hover=true"
      @mouseleave="hover=false"
      ref="treeContent"
      @dbclick="contentDoubleClick">
      <div class="expand-button" @click.stop="clickExpand" v-if="expand">
        <template v-if="nodeData[props.children] && nodeData[props.children].length">
          <Icon type="ios-arrow-dropdown" v-if="expanded"/>
          <Icon type="ios-arrow-dropright" v-else/>
        </template>
        <template v-else>
          <div class="expand-dot"></div>
        </template>
      </div>
      <div class="node-render">
        <div
          v-if="dragHover && this.dragInfo.before"
          class="node-drag-helper">
          <div
            :class="{
              'drag-position': true,
              'drop': this.dropPosition === 'before'
            }"
            @dragenter="dragPosition('before')"
            @dragleave="dragPosition('')"
            v-text="dragNote.before">
          </div>
        </div>
        <node-content class="node-render-content"></node-content>
        <div
          v-if="dragHover && (this.dragInfo.after || this.dragInfo.inner)"
          class="node-drag-helper">
          <div
            :class="{
              'drag-position': true,
              'drop': this.dropPosition === 'after'
            }"
            @dragenter="dragPosition('after')"
            @dragleave="dragPosition('')"
            v-if="this.dragInfo.after"
            v-text="dragNote.after">
          </div>
          <div
            :class="{
              'drag-position': true,
              'drop': this.dropPosition === 'inner'
            }"
            @dragenter="dragPosition('inner')"
            @dragleave="dragPosition('')"
            v-if="this.dragInfo.inner"
            v-text="dragNote.inner">
          </div>
        </div>
      </div>
    </div>
    <div
      :class="{
        'tree-node-children': true,
        'children-hide': dragging
      }"
      :style="childrenStyle"
      v-if="(nodeData[props.children] && nodeData[props.children].length)"
      v-show="showNode || expanded">
      <tree-node
        v-for="(child, idx) of nodeData[props.children]"
        :key="idx"
        :nodeData="child"
        :nodeClass="nodeClass"
        :allowDrag="allowDrag"
        :dragInfo="dragInfo"
        :draggable="draggable"
        :expand="expand"
        :indentLineColor="indentLineColor"
        :indentWidth="indentWidth"
        :splitInfo="splitInfo"
        :splitPage="splitPage"
        :showPageList="showPageList"
        :dragNote="dragNote"
        :props="props">
      </tree-node>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tree-node',
  props: {
    nodeData: {
      type: Object,
      required: true
    },
    props: {
      type: Object,
      required: true
    },
    nodeClass: {
      type: [Object, Array, String]
    },
    expand: {
      type: Boolean,
      default: true
    },
    allowDrag: Function,
    dragInfo: Object,
    draggable: Boolean,
    indentLineColor: Array,
    indentWidth: Number,
    dragNote: Object,
    splitPage: Boolean,
    splitInfo: Object,
    async: Boolean,
    showPageList: Array
  },
  components: {
    'node-content': {
      render (h) {
        const parent = this.$parent
        const tree = parent.tree
        const data = parent.nodeData
        const parentData = parent.parentData
        return (
          tree.$scopedSlots.default
            ? tree.$scopedSlots.default({ data, parentData })
            : <div>{data[parent.props.title]}</div>
        )
      }
    }
  },
  computed: {
    canBeDrag () {
      return this.draggable && this.allowDrag && this.allowDrag(this.nodeData)
    },
    dragHover () {
      return this === this.dragInfo.dropData
    },
    childrenStyle () {
      let style = {
        marginLeft: this.indentWidth + 'px'
      }
      let length = this.indentLineColor.length
      if (length) {
        let colorIndx = (this.level % length + length - 1) % length
        let color = this.indentLineColor[colorIndx]
        style.borderLeft = `1px ${this.hover ? 'solid' : 'dotted'} ${color}`
      }
      return style
    },
    showNode () {
      if (!this.splitPage) return true
      let list = this.showPageList
      if (list.length) {
        if (list.includes(this.nodeData[this.props.id])) {
          return true
        } else if (list[list.length - 1] === this.parentData[this.props.id]) {
          return true
        } else if (list.length >= 2 && list[list.length - 2] === this.parentData[this.props.id]) {
          let node = this.tree.getShowNode()
          if (node && (!node[this.props.children] || !node[this.props.children].length)) {
            return true
          }
        }
        return false
      } else {
        if (this.$parent.isTree) return true
        return false
      }
    },
    showChildOnly () {
      if (!this.showNode) return false
      if (this.showPageList.includes(this.nodeData[this.props.id])) {
        if (this.nodeData[this.props.children] && this.nodeData[this.props.children].length) return true
        return false
      }
      return false
    }
  },
  data () {
    return {
      tree: null,
      parentData: null,
      level: 1,
      expanded: this.nodeData.hasOwnProperty(this.props.expanded) ? this.nodeData[this.props.expanded] : true,
      dragging: false,
      dropPosition: '',
      hover: false
    }
  },
  watch: {
    dragHover () {
      if (!this.dragHover) {
        this.dropPosition = ''
      }
    }
  },
  created () {
    const parent = this.$parent
    if (parent.isTree) {
      this.tree = parent
      this.parentData = parent.rootData
      this.level = 1
    } else {
      this.tree = parent.tree
      this.level = parent.level + 1
      this.parentData = parent.nodeData
    }
  },
  methods: {
    nodeClick (event) {
      this.tree.$emit('node-click', event, this)
    },
    nodeDoubleClick (event) {
      this.tree.$emit('node-double-click', event, this)
    },
    contentClick (event) {
      this.tree.$emit('content-click', event, this)
    },
    contentDoubleClick (event) {
      this.tree.$emit('content-double-click', event, this)
    },
    clickExpand (event) {
      this.expanded = !this.expanded
      this.tree.$emit('expand-button-click', event, this)
    },
    refreshNodeData (data, children) {
      this.$set(data, this.props.children, children)
    },
    /**
     * 拖动相关接口，涉及多个节点，此处弹射事件均在tree.vue中处理
     * 组件调用应该监听由tree.vue弹射的事件
     */
    dragStart (event) {
      this.hideChildren()
      this.tree.$emit('tree-node-drag-start', event, this)
    },
    dragEnd (event) {
      this.recoverChildren()
      this.tree.$emit('tree-node-drag-end', event, this)
    },
    dragEnter (event) {
      this.tree.$emit('tree-node-drag-enter', event, this, this.$refs.treeContent)
    },
    dragOver (event) {
      event.preventDefault()
      this.tree.$emit('tree-node-drag-over', event, this, this.$refs.treeContent)
    },
    dragLeave (event) {
      this.tree.$emit('tree-node-drag-leave', event, this, this.$refs.treeContent)
    },
    drop (event) {
      this.tree.$emit('tree-node-drop', event, this)
    },
    hideChildren () {
      this.dragging = true
    },
    recoverChildren () {
      this.dragging = false
    },
    dragPosition (position) {
      this.dropPosition = position
      this.tree.$emit('tree-node-drag-position', position)
    }
  }
}
</script>

<style lang="stylus" scoped>
.tree-node
  .tree-node-content
    display flex
    align-items center
    .expand-button
      width 1rem
      height 1rem
      font-size 1rem
      font-weight bolder
      display flex
      align-items center
      justify-content center
      .expand-dot
        border 3px solid gray
        border-radius 3px
    .node-render
      flex auto
      .node-drag-helper
        display flex
        .drag-position
          margin 2px
          margin-right 1rem
          padding 2px 0.5rem
          box-shadow 0 0 1px 1px #FFD04C
          border-radius 5px
          &.drop
            background #FFC82C
            color red
            font-weight bolder
      .node-render-content
        text-align left
  .tree-node-children
    &.children-hide
      display none
</style>
