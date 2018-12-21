<template>
  <div class="films-list">
    <!-- Banner组件（轮播图组件） -->
    <Banner></Banner>
     <!-- 定位城市 -->
    <div class="city-fixed">
      <router-link tag='span' :to="{path:'/city'}">{{ curCity }}</router-link>
      <i class="iconfont icon-xiala"></i>
    </div>
    <!-- /定位城市 -->

    <!-- 正在上映和即将上映 -->
    <div class="tab-bar-wrapper">
      <ul class="tab-bar">
        <li :class="{'z-act': $route.path === '/films/nowPlaying'}" @click="switchList('now')">
          <span>正在热映</span>
        </li>
        <li :class="{'z-act': $route.path === '/films/soonPlaying'}" @click="switchList('soon')">
          <span>即将上映</span>
        </li>
      </ul>
    </div>
    <!-- 正在上映和即将上映 -->

    <router-view></router-view>
  </div>
</template>
<script>
// 引入滑动插件
import Swiper from 'swiper'
// 引入Banner组件
import Banner from '../components/Banner'
// import { mapState } from 'vuex'
// 引入store仓库
// import store from '../store'
// console.log(store.state.curCity)
export default {
  name: 'Films',
  components: {
    Banner
  },
  data () {
    return {
      curCity: ''
    }
  },
  // computed: {
  //   ...mapState(['curCity'])
  // },
  methods: {
    // 根据百度地图API接口获取当前城市的名称
    getCityName () {
    /* eslint-disable */
     var myCity = new BMap.LocalCity()
     myCity.get(result=> {
       this.curCity = result.name
       // 将获取的当前城市名称通过commit提交给store的state
       this.$store.commit('curCity',this.curCity)
     })
    },
    // 切换路由
    switchList (type) {
      if(type === 'now'){
        //   this.$router.push('/films/nowPlaying')
        this.$router.push(
          {
            path:'/films/nowPlaying'
          }
        )
      }else {
        //   this.$router.push('/films/soonPlaying')
         this.$router.push(
          {
            name:'soonPlaying'
          }
        )
      }
    }
  },
  created () {
    this.getCityName ()
  },
   mounted () {
    new Swiper('.swiper-container', {
      // autoplay: true,
      autoplay: {
      // 默认3秒
        delay: 3000
      },
      // direction: 'aligin', // 垂直切换选项
      loop: true, // 循环模式选项
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination'
      },
      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      // 如果需要滚动条
      scrollbar: {
        el: '.swiper-scrollbar'
      }
    })
  }
}
</script>

<style lang="scss">
// @import '../styles/common/px2rem.scss';相当于@import '@/styles/common/px2rem.scss';@是src文件的别名
@import '@/styles/common/px2rem.scss';
// 引入滑动样式
@import 'swiper/dist/css/swiper.min.css';
.films-list {
  flex: 1;
  overflow-y: auto;
}

.swiper-container {
  height: px2rem(210);
  .swiper-pagination-bullet {
    width: px2rem(10);
    height: px2rem(10);
  }
  .swiper-pagination-bullet-active {
    background: black;
  }

  img {
    width: 100%;
  }
}

.city-fixed {
  position: absolute;
  top: px2rem(18);
  left: px2rem(8);
  z-index: 999;
  height: px2rem(30);
  line-height: px2rem(30);
  font-size: px2rem(14);
  color: #fff;
  border-radius: px2rem(15);
  text-align: center;
  padding: 0 px2rem(5);
  background: rgba(0, 0, 0, 0.2);
}

.tab-bar-wrapper {
  position: sticky;// position的新属性，可以实现吸顶效果，但是兼容性不好
  z-index: 999;
  top: px2rem(0);
  height: px2rem(50);
  border-bottom: px2rem(1) solid #ededed;
  background: #fff;
  .tab-bar {
    display: flex;
    height: px2rem(50);
    align-items: center;
    li {
      flex: 1;
      text-align: center;
      font-size: px2rem(14);
      span {
        padding: 0 px2rem(10);
      }
      &.z-act {
        color: #ff5f16;
      }
    }
  }
}


</style>
