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
    project: '卖座网',
    books: [{name: '元宵', isLove: true}, {name: '春节', isLove: true}, {name: '重阳', isLove: false}, {name: '元旦', isLove: true}],
    myFavorite: 1,
    // 购物车
    filmsCart: localStorage.getItem('filmsCart') ? JSON.parse(localStorage.getItem('filmsCart')) : []
  },
  // 在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
  getters: {
    myLoveBooks (state, getters) {
      console.log(getters)
      var arr = state.books.filter(item => {
        return item.isLove
      })
      return arr.splice(0, getters.myFavoriteX2)
    },
    myFavoriteX2 (state) {
      return state.myFavorite * 2
    }
  },
  // mutations是唯一能改变state状态的东西，是同步的操作
  mutations: {
    // state 就是当前 store实例的 state 属性
    chgCurCity (state, payload) {
      // state.curCity = payload
      state.curCity = payload.cityName
    },
    // 添加电影票到购物车
    addFilm (state, payload) {
      var filmId = payload.filmId
      // 判断当前电影是否已经存在在购物车
      var index = -1
      var isExist = state.filmsCart.some((item, i) => {
        if (item.filmId === filmId) {
          index = i
          return true
        }
        return false
      })
      if (isExist) {
        // 存在+1
        state.filmsCart[index].filmNum++
      } else {
        // 不存在就push
        state.filmsCart.push({
          filmId: payload.filmId,
          filmName: payload.name,
          // 使用随机数来模拟价格
          filmPrice: Math.random(10 + 1, 20),
          filmNum: 1
        })
      }
      localStorage.setItem('filmCart', JSON.stringify(state.filmsCart))
      /**
       * payload是一个object
       * filmID: 电影id
       * filmName: 电影名称
       * filmPrice: 电影票价格
       * filmQuantity: 购票数量
       */
      // console.log(payload)
      // state.filmsCart.push(payload)
    },
    // 从购物车删除电影票
    reduceFilm (state, payload) {
      var index = -1
      state.filmsCart.forEach((item, i) => {
        if (item.filmId === payload.filmId) {
          index = i
        }
      })
      // index大于-1表示购物车存在该电影信息
      if (index > -1) {
        // 查询该电影票张数(大于1张减1)
        var film = state.filmsCart[index]
        if (film.filmNum > 1) {
          film.filmNum--
        } else {
          // 只有1张就直接删除当前该电影信息
          state.filmsCart.splice(index, 1)
        }
      }
      localStorage.setItem('filmCart', JSON.stringify(state.filmsCart))
    }
  },
  // 做异步的时候要使用
  actions: {
  },
  // 对store做拆分，拆成一个一个的小store
  modules: {
  }
})
// 暴露该store的实例对象
export default store
