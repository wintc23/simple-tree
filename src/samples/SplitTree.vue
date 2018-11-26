<template>
  <div class="tree-container">
    <div class="tree-path">
      <div class="title">
        <span>当前选择：</span>
        <span
          :class="showList.length ? 'clear' : 'clear-nothing'"
          @click.stop="back()">
          清空
        </span>
      </div>
      <div class="content">
        <span v-for="(item, idx) of showList" :key="item.id" class="path-item" @click.stop="back(item.id)">
          <span class='item-title'>{{ item.title }}</span>
          <span v-if="idx !== showList.length - 1" class="devide">/</span>
        </span>
      </div>
    </div>
    <transition name="tree">
      <simple-tree
        class="tree-content"
        :treeData="treeData"
        :expand="false"
        :splitPage="true"
        :refreshShowPage="refreshShowPage"
        @content-click="choose"
        ref="simpleTree"
        :props="treeProps"
        v-show="showTree">
        <div
          slot-scope="{ data }"
          class="node-content"
          :class="showIds.includes(data[treeProps.id]) ? 'choose' : ''">
          {{ data[treeProps.title] }}
        </div>
      </simple-tree>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showList: [],
      showTree: true
    }
  },
  computed: {
    showIds () {
      return this.showList.map(item => item.id)
    }
  },
  props: {
    treeData: {
      type: Array,
      default: () => {
        return [{
          optionKey: 1,
          name: 'node-1',
          expanded: false,
          children: [{
            optionKey: 2,
            name: 'node-2',
            children: [{
              optionKey: 3,
              name: 'node-3',
              children: true,
              loading: true
            },
            {
              optionKey: 4,
              name: 'node-4'
            },
            {
              optionKey: 5,
              name: 'node-5',
              children: true,
              loading: true
            }]
          }]
        }]
      }
    },
    treeProps: {
      type: Object,
      default: () => {
        return {
          id: 'optionKey',
          title: 'name',
          children: 'children'
        }
      }
    },
    loadFunc: Function // 参数：data, callback获取数据完毕后需要调用callback(children)
  },
  methods: {
    refreshShowPage (titleList) {
      this.showList = titleList
      this.$set(this, 'showList', titleList)
      let list = this.showList.map(item => item.id)
      this.$emit('input', list) // 弹射选择的列表
    },
    choose (event, vComponent) {
      let parentId = vComponent.parentData[this.treeProps.id]
      if (this.showIds.length && this.showIds[this.showIds.length - 1] !== parentId) {
        this.$refs.simpleTree.jumpBack(parentId)
      }
      let data = vComponent.nodeData
      if (data.children) {
        if (data.loading && this.loadFunc) {
          this.loadFunc(data, (children) => {
            data.children = children
            data.loading = false
            this.animationShow()
            this.$refs.simpleTree.pushToShow(data)
          })
        } else {
          if (!data.loading) {
            this.animationShow()
          }
          this.$refs.simpleTree.pushToShow(data)
        }
      } else {
        this.$refs.simpleTree.pushToShow(data)
      }
    },
    back (id = null) {
      this.$refs.simpleTree.jumpBack(id)
    },
    animationShow (dir) {
      this.showTree = false
      this.$nextTick(() => {
        this.showTree = true
      })
    },
  }
}
</script>

<style lang="stylus" scoped>
.tree-container
  position fixed
  top 2rem
  bottom 2rem
  left 1rem
  right 1rem
  border-radius 4px
  box-shadow 0 0 5px 0 #FFA710
  padding 1rem
  .tree-path
    padding .5rem 0
    .title
      display flex
      justify-content space-between
      align-items center
      .clear, .clear-nothing
        cursor pointer
        user-select none
        border 1px solid currentColor
        border-radius 4px
        padding 4px .5rem
      .clear-nothing
        color #D2D2D2
      .clear
        color #FFC227
    .content
      margin 4px 0
      text-align left
      display flex
      flex-wrap wrap
      height 1rem
      .path-item
        user-select none
        .item-title
          // color #FFC227
          cursor pointer
          padding 4px
          border 1px solid #FFC227
          border-radius 4px
        .devide
          margin 0 2px
  .tree-content
    .node-content
      padding .5rem 4px
      margin 2px 0
      border-radius 4px
      box-shadow 0 0 0 1px #FFC227 inset
      &.choose
        color white
        background #FFC227
.tree-enter-active
  background white
  animation slide linear .3s reverse
.tree-leave-active
  background white
  animation slide linear .3s

@keyframes slide {
  0% {
    transform translate(0)
  }
  50% {
    transform translate(50%)
  }
  100% {
    transform translate(100%)
  }
}
</style>
