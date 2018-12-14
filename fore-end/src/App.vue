<template>
  <div id='app'>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
// NavBar组件引入
import NavBar from './components/NavBar/index.vue'

export default {
  name: 'App',
  components: { NavBar }
}
</script>
<style lang="scss">
// 基础样式
@import "./styles/base.scss"
</style>
