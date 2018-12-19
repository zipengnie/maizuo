<template>
<div>
  <div class='mint-searchbar'>
    <div class="mint-searchbar-inner">
      <i class="mintui mintui-search"></i><input type='text' v-model.lazy="searchValue" placeholder="搜索" class="mint-searchbar-core">
  </div>
  <a class="mint-searchbar-cancel" style="display: none;">取消</a></div>
  <div v-show="searchValue">
    <ul class="cinema-ul">
        <li v-for="(item, index) in filterCinemas" :key="index">
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
import axios from 'axios'
import { Header, Search, IndexList, IndexSection, Toast } from 'mint-ui'
Vue.use(Header.name, Header)
Vue.use(Search.name, Search)
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
        return item.name.indexOf(this.searchValue) > -1
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
        console.log(response.data.data)
        this.cinemaInfo = response.data.data
        console.log(this.cinemaInfo)
      })
    },
    toastMeg () {
      let instance = Toast('未查询到匹配的影院信息')
      setTimeout(() => {
        instance.close()
      }, 22000)
    }
  },
  created () {
    this.getCinema()
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/common/px2rem.scss";
.mint-searchbar {
  position: fixed;
  z-index: 1;
  width: 100%;
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  font-size: px2rem(30);
}
.mint-searchbar-inner {
  background-color: #fff;
  border-radius: px2rem(4);
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  height: px2rem(28);
  padding: px2rem(4) px2rem(6);
}
.mint-searchbar-inner .mintui-search {
  font-size: px2rem(12);
  color: #d9d9d9;
  font-size: px2rem(20);
}
.mint-searchbar-cancel {
  color: #26a2ff;
  margin-left: px2rem(10);
  text-decoration: none;
}
.mint-toast-text {
  font-size: px2rem(30)!important;
}
.cinema-ul {
  padding-top: px2rem(28);
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
