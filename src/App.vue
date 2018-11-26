<template>
  <div id="app">
    <!-- <HelloWorld/> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './samples/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    // HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
html, body {
  height: 100%;
}
</style>
