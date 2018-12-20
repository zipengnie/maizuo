<template>
  <div class="cinemas-list">
    <div>
      <header class="mint-header">
        <div class="mint-header-button is-left">
          <a href="#/" class="router-link-active">
            <button class="mint-button mint-button--default mint-button--normal">
              <label class="mint-button-text">{{ curCity }}</label>
              <i class="iconfont icon-xiala"></i>
            </button>
          </a>
        </div>
        <div class="mint-header-title">
            <h1 class="mint-header-text">影院</h1>
        </div>
        <div class="mint-header-button is-right" style="text-align: right;">
          <router-link to="/search"><i class="iconfont icon-sousuo"></i></router-link>
        </div>
      <div class="mint-header-button is-right"></div>
    </header>
    <!-- 全部和最近去过 -->
      <div class="tab-bar-wrapper">
        <ul class="tab-bar">
          <li @click="switchList('all')">
            <span>全部</span>
            <span>1</span>
          </li>
          <li @click="switchList('near')">
            <span>最近去过</span>
            <span>2</span>
          </li>
        </ul>
      </div>
      <!-- 全部和最近去过 -->
    </div>
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
</template>
<script>
import Vue from 'vue'
import { Header } from 'mint-ui'
import axios from 'axios'
// import { mapState, mapGetters } from 'vuex'
Vue.use(Header.name, Header)
export default {
  name: 'cinema',
  data () {
    return {
      curCity: this.$store.state.curCity,
      cinemaInfo: ''
    }
  },
  methods: {
    getCinema () {
      axios.get('/api/cinema').then(response => {
        console.log(response.data.data)
        this.cinemaInfo = response.data.data
        console.log(this.curCity)
      })
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
.cinemas-list {
  flex: 1;
 overflow-y: auto;
}
.mintui {
   font-size: px2rem(20);
}
.mint-header {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background-color: #fff;
    box-sizing: border-box;
    color: #000;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: px2rem(17);
    height: px2rem(40);
    width: 100%;
    line-height: 1;
    padding: 0 px2rem(10);
    position: fixed;
    text-align: center;
    white-space: nowrap;
    background: #fff;
    z-index: 1;
    border-bottom: px2rem(0.5) solid rgba(0,0,0,0.1);
    top: px2rem(0);
    a {
      text-decoration: none;
      i {
        text-align: right;
        font-size: px2rem(20);
      }
    }
}
.mint-header-title {
  // width: 60%;
  width:  px2rem(420);
}
.mint-button {
  width: 16%;
}
.mint-button-text {
    font-size: px2rem(14);
    font-weight: 300;
    height: px2rem(80);
}

.tab-bar-wrapper {
  position: fixed;// position的新属性，可以实现吸顶效果，但是兼容性不好
  top: px2rem(78);
  z-index: 1;
  top: px2rem(40);
  height: px2rem(50);
  width: 100%;
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
</style>
