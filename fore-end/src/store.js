// 引入vue
import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'
// 将状态从根组件“注入”到每一个子组件中（需调用 Vue.use(Vuex)）
Vue.use(Vuex)
// 实例化store对象
var store = new Vuex.Store({
    // 一个仓库要写的东西
    // 状态：放置在整个项目中所有能够全局共用的状态
    state: {
      // 当前城市
      curCity: '武汉',
      // 项目名称
      project:'卖座网'
    },
    // 在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
    getters: {

    },
    // 唯一能改变state状态的东西，是同步的操作
    mutations: {

    },
    // 做异步的时候要使用
    actions: {

    },
    // 对store做拆分，拆成一个一个的小store
    modules: {

    }
})
// 暴露该store的实例对象
