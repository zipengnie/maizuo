<template>
  <div id="app">
    <transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" :duration="{enter:400,leave:200}">
     <router-view></router-view>
    </transition>
    <nav-bar></nav-bar>
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
