// 路由相关的代码
import VueRouter from 'vue-router'
// import和require一样，第一次加载vue模块时，会缓存该模块，以后再加载该模块，就直接从缓存取出该模块 ，这里引入的其实是main.js引入vue模块的缓存，并不是真正又引入了一次vue组件，因为main.js是第一次引入的)
import Vue from 'vue'
// 引入home组件
import Home from './views/Home.vue'
// 引入电影首页（单页面组件）组件
import Films from './views/Films.vue'
// 引入影院首页（单页面组件）组件
import Cinema from './views/Cinema.vue'
// 引入个人中心首页（单页面组件）组件
import Center from './views/Center.vue'

// 引入影片详情页组件
import FilmDetail from './views/filmDetail.vue'

// 引入正在上映影片组件
import NowPlay from './components/NowPlay/index.vue'
// 引入正在上映影片组件
import SoonPlay from './components/SoonPlay/index.vue'
// 插件安装
Vue.use(VueRouter)
var router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          redirect: '/films/NowPlaying'
        },
        {
          // 电影首页
          path: 'films',
          name: 'films',
          component: Films,
          children: [
            {
              path: 'nowPlaying',
              name: 'nowPlaying',
              component: NowPlay
            },
            {
              path: 'soonPlaying',
              name: 'soonPlaying',
              component: SoonPlay
            }
          ]
        },
        // 影院首页
        {
          path: '/cinema',
          name: 'cinema',
          component: Cinema
        },
        // 个人中心首页
        {
          path: '/center',
          name: 'center',
          component: Center
        }
      ]
    },
    // 影片详情页
    {
      path: '/film/:filmId',
      name: 'filmDetail',
      component: FilmDetail
    },
    { // 默认路径
      path: '*',
      redirect: '/films/NowPlaying'
    }]
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // console.log(from)
  // console.log(to)
  next()
  // console.log(to)
})

// 全局后置守卫
router.afterEach((to, from) => {
  console.log(from)
  console.log(to)
})
export default router
