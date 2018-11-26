<template>
  <div class="container">
    <router-link v-for="(item, idx) of sampleList" :to="{ name: item.name }" :key="idx">
      {{item.title}}
    </router-link>
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
  display flex
  flex-direction column
  justify-content center
</style>

