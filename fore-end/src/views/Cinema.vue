<template>
<div class="cinema">
  <div class="cinema-header">
    <mt-header title="影院">
      <router-link to="/city" slot="left">
      <!-- <span>{{ curAddress }}</span> -->
        <mt-button icon="back"><span>{{ curCity }}</span><i class="iconfont icon-xiala"></i></mt-button>
      </router-link>
      <mt-header-title>影院</mt-header-title>
      <router-link to="/search" slot="left">
        <mt-button icon="back"><i class="iconfont icon-sousuo"></i></mt-button>
      </router-link>
    </mt-header>
    <!-- 全部和最近去过 -->
    <div class="cinemaTab">
        <span @click.stop="switchList('all')">全部<i class="iconfont icon-xiala"></i></span>
        <span @click.stop="switchList('near')">最近去过<i class="iconfont icon-xiala"></i></span>
    </div>
    <component :is='curAddress' v-show='toggle()'></component>
  </div>
  <div class="cinema-content">
    <ul class="cinema-ul">
      <li v-for="(item, index) in cinemaInfo" :key="index">
        <a href="#">
        <div class="cinema-left">
          <p class="cinema-name">{{ item.name }}</p>
          <p class="cinema-address">{{ item.address }}</p>
        </div>
        <div>
          <p class="cinema-low-price">￥{{  parseInt(item.lowPrice/100) }}起</p>
          <p class="cinema-distance">{{ item.Distance.toFixed(2) }}</p>
        </div>
        </a>
      </li>
    </ul>
  </div>
</div>
</template>
<script>
import Vue from 'vue'
import { Header } from 'mint-ui'
import axios from 'axios'
Vue.use(Header.name, Header)
export default {
  name: 'cinema',
  data () {
    return {
      curCity: this.$store.state.curCity,
      cinemaInfo: '',
      curAddress: ''
    }
  },
  methods: {
    getCinema () {
      axios.get('/api/cinema').then(response => {
        console.log(response.data.data)
        this.cinemaInfo = response.data.data
        console.log(this.curCity)
      })
    },
    // 切换路由
    switchList (type) {
      if (type === 'all') {
        this.curAddress = 'all'
      } else {
        this.curAddress = 'near'
      }
    },
    // 点击切换toggle
    toggle () {
      return !this.curAddress
    }
  },
  // 动态组件（切换选项卡）
  components: {
    all: {
      template: `<ul :class='curAddress'><li>这是all</li></ul>`
    },
    near: {
      template: `<ul :class='curAddress'><li>这是near</li></ul>`
    }
  },
  created () {
    this.getCinema()
  }
}
</script>

<style lang="scss">
// @import '../styles/common/px2rem.scss';相当于@import '@/styles/common/px2rem.scss';@是src文件的别名
@import '@/styles/common/px2rem.scss';
.cinema {
  flex: 1;
  overflow-y: auto;
  .cinema-header {
      // 头部
      position: fixed;
      width: 100%;
      z-index: 1;
      mt-header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        background: #fff;
        border-bottom: px2rem(1) solid #f4f4f4;
        a {
          display: inline-block;
          width: 20%;
          height: px2rem(40);
          text-decoration: none;
          overflow: hidden;
          mt-button {
            display: inline-block;
            width: 100%;
            text-align: center;
            span {
              margin-left: px2rem(16);
              margin-right: px2rem(4);
              display: inline-block;
              width:  40%;
              font-size: px2rem(14);
              color: #191a1b;
              white-space: nowrap;
              // text-overflow: ellipsis;
              overflow: hidden;
            }
            i {
              width: px2rem(40);
              height: px2rem(40);
              font-size: px2rem(16);
              line-height: px2rem(40);
              color: #000;
            }
          }
        }
        mt-header-title {
          width: 60%;
          height: px2rem(40);
          line-height: px2rem(40);
          font-size: px2rem(18);
          color: #000;
          text-align: center;
        }
      }
      // 选项卡
      .cinemaTab {
        display: flex;
        width: 100%;
        background: #fff;
        span {
          width: 50%;
          height: px2rem(40);
          line-height: px2rem(40);
          font-size: px2rem(14);
          color: #000;
          text-align: center;
          i {
             font-size: px2rem(14);
          }
        }
      }
    }
.cinema-content {
  .cinema-ul {
      padding-top: px2rem(90);
    }
    .cinema-ul  li {
        position: relative;
        background-color: #fff;
        padding: px2rem(15);
    }
    .cinema-ul li a {
      display: flex;
      justify-content: space-between;
      width: 100%;
      text-decoration: none;
      align-items: center;
    }
    .cinema-left {
      width: 80%;
    }
    .cinema-name {
      color: #191a1b;
      font-size: px2rem(15);
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      width: 100%;
    }
    .cinema-address {
      font-size: px2rem(12);
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      margin-top: px2rem(10);
      color: #797d82;
      width: 100%;
    }
    .cinema-low-price {
      font-size: px2rem(15);
      color: #ff5f16;
    }
    .cinema-distance {
      font-size: px2rem(12);
      color: #797d82;
      margin-top: px2rem(10);
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

</style>
