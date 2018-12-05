<template>
  <div class="container">
    <div class="link-list">
      <router-link v-for="(item, idx) of sampleList" :to="{ name: item.name }" :key="idx" class="router-link">
        <span class="link"></span>{{item.title}}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sampleList: [
        {
          name: 'HelloWorld',
          title: '简单使用'
        },
        {
          name: 'SplitTree',
          title: '分页显示'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  height 100%
  font-size 1rem
  display flex
  .link-list
    width 10rem
    margin auto
    display flex
    flex-direction column
    .router-link
      display flex
      align-items center
    .link
      display inline-block
      width 1rem
      height 1rem
      margin 0 .5rem
      border 2px solid #FFA710
      border-radius .5rem
</style>

