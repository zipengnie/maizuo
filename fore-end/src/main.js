// 整个前端项目的入口JS文件
import Vue from 'vue'
import App from './App' // 相当于./App.vue
// 引入vue-router路由实例化的对象
import router from './router.js'
// 引入mockjs，项目上线要删除
// import './mockData'
// 去除开发时浏览器的默认设置
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#main',
  router,
  components: {
    App
    // 相当于App:App
  },
  // 使用自闭合标签来渲染
  template: '<App/>'
})
