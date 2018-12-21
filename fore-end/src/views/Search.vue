<template>
<div class="searchCinema">
  <div class="searchCinema-header">
    <div class='mint-searchbar'>
      <div class="mint-searchbar-inner">
      <i class="mintui mintui-search"></i><input type='text' v-model="searchValue" placeholder="输入影院名或者影院地址" class="mint-searchbar-core">
    </div>
    <a class="mint-searchbar-cancel" style="display: none;">取消</a></div>
  </div>
  <ul class="searchCinema-ul" v-show="searchValue">
    <li v-for="(item, index) in filterCinemas" :key="index">
      <a href="#">
      <div class="searchCinema-li-left">
        <p class="searchCinema-li-name">{{ item.name || item.address }}</p>
        <p class="searchCinema-li-address">{{ item.address }}</p>
      </div>
      <div class="searchCinema-li-right">
        <p class="searchCinema-li-low-price">￥{{  parseInt(item.lowPrice/100) }}起</p>
        <p class="searchCinema-li-distance">{{ item.Distance.toFixed(2) }}</p>
      </div>
      </a>
    </li>
  </ul>
</div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import { Header, Search, IndexList, IndexSection, Toast } from 'mint-ui'
Vue.use(Header.name, Header)
Vue.component(Search.name, Search)
Vue.component(IndexList.name, IndexList)
Vue.component(IndexSection.name, IndexSection)
export default {
  name: 'Search',
  data () {
    return {
      searchValue: '',
      cinemaInfo: []
    }
  },
  computed: {
    filterCinemas () {
      var arr = this.cinemaInfo.filter(item => {
        let reg = new RegExp('^' + this.searchValue)
        return reg.test(item.name) || reg.test(item.address)
      })
      if (arr.length <= 0) {
        this.toastMeg()
      }
      return arr
    }
  },
  methods: {
    getCinema () {
      axios.get('/api/cinema').then(response => {
        this.cinemaInfo = response.data.data
      })
    },
    toastMeg () {
      let instance = Toast('未查询到匹配的影院信息')
      setTimeout(() => {
        instance.close()
      }, 600)
    }
  },
  created () {
    this.getCinema()
  }
}
</script>
<style lang="scss">
@import "@/styles/common/px2rem.scss";
.searchCinema {
  .searchCinema-header {
    position: fixed;
    width: 100%;
    z-index: 1;
  // 搜索
    .mint-searchbar {
      width: 100%;
      padding: px2rem(10) px2rem(16);
      .mint-searchbar-inner {
        height: px2rem(30);
        .mintui-search {
          font-size: px2rem(14);
        }
        .mint-searchbar-core {
          height: px2rem(30);
          font-size: px2rem(14);
          padding-left:  px2rem(14);
        }
      }
    }
    ::-webkit-input-placeholder {
      color:rgba(0,0,0,0.4);
      font-size:  px2rem(12);
    }
    .mint-searchbar-cancel {
        text-align: left;
        font-size: 14px;
        color: #000;
        font-size: px2rem(14);
    }
  }
  // 搜索影院信息
  .searchCinema-ul {
    padding-top: px2rem(56);
    li {
      position: relative;
      background-color: #fff;
      padding: px2rem(15);
      a {
    display: flex;
    justify-content: space-between;
    width: 100%;
    text-decoration: none;
    align-items: center;
  }
  }
  }
  .searchCinema-li-left {
    width: 80%;
  }
  .searchCinema-li-name {
    color: #191a1b;
    font-size: px2rem(15);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
  }
  .searchCinema-li-address {
    font-size: px2rem(12);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-top: px2rem(10);
    color: #797d82;
    width: 100%;
  }
  .searchCinema-li-low-price {
    font-size: px2rem(15);
    color: #ff5f16;
  }
  .searchCinema-li-distance {
    font-size: px2rem(12);
    color: #797d82;
    margin-top: px2rem(10);
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
// 提示信息
.mint-toast {
  background: #f4f4f4;
}
.mint-toast-text {
  background: #f4f4f4;
  color: #000;
  font-size: px2rem(14);
}
</style>
