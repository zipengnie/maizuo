<template>
<div class="city">
  <div class="city-header">
    <mt-header title="当前城市 -">
      <router-link to="/" slot="left">
        <mt-button icon="back"><i class="iconfont icon-untitled94"></i></mt-button>
      </router-link>
      <mt-header-title>当前城市 -</mt-header-title>
      <a></a>
    </mt-header>
    <mt-search
      v-model="searchCity"
      cancel-text="取消"
      placeholder="搜索">
    </mt-search>
  </div>
  <div class="city-content">
    <!-- 搜索之后的城市列表 -->
    <ul class="city-search-ul" v-show="searchCity">
      <li v-for="(item, index) in filterCity" :key="index">
        {{ item.name || item.pinyin }}
      </li>
    </ul>
    <!-- 页面的城市列表 -->
    <div class="city-render-ul" v-show="!searchCity">
      <mt-index-list>
        <mt-index-section v-for="(item, index) in cityData" :key="index" :index='item.inital'>
        <li class="city-render-li">
          <a href="#" v-for="obj in item.list" :key="obj.id">{{ obj.name }}</a>
        </li>
        </mt-index-section>
      </mt-index-list>
    </div>
  </div>
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
  name: 'City',
  data () {
    return {
      originData: [],
      cityData: [],
      searchCity: ''
    }
  },
  computed: {
    filterCity () {
      var arr = this.originData.filter(item => {
        let reg = new RegExp('^' + this.searchCity)
        return reg.test(item.name) || reg.test(item.pinyin)
      })
      if (arr.length <= 0) {
        this.toastMeg()
      }
      return arr
    }
  },
  methods: {
    // 将数据库的数据处理为我们需要的json格式
    trimData () {
      var Obj = {} // 首字母对象
      var i = 0 // 用来记录某个拼音首字母的下标
      var res = [] // 最终需要得到的数据
      var sortArr = [] // 排序后的数组
      this.originData.forEach(item => {
        // 获取城市pinyin首字母并转为大写(A,B,C....)
        var py = item.pinyin.substring(0, 1).toUpperCase()
        // 判断当前这个首字母的城市是否已经存在
        if (Obj[py]) {
          res[Obj[py] - 1].list.push(item)
        } else {
          // 给每个首字母编号
          Obj[py] = ++i
          // 不存在
          res.push({inital: py, list: [item]})
        }
        return res
      })
      // 让数据元素按照A-Z排序
      for (var m = 65; m <= 90; m++) {
        for (var z = 0; z < res.length; z++) {
          if (String.fromCharCode(m) === res[z].inital) {
            sortArr.push(res[z])
            break
          }
        }
      }
      this.cityData = sortArr
    },
    getCity () {
      axios.get('/api/city').then(response => {
        this.originData = response.data.data
        this.trimData()
      })
    },
    toastMeg () {
      let instance = Toast('未查询到匹配的城市信息')
      setTimeout(() => {
        instance.close()
      }, 600)
    }
  },
  created () {
    this.getCity()
  }
}
</script>
<style lang="scss">
@import "@/styles/common/px2rem.scss";
.city {
  .city-header {
    // 头部
    position: fixed;
    width: 100%;
    z-index: 1;
    mt-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      background: #fff;
      a {
        width: 20%;
        height: px2rem(40);
        mt-button {
          margin-left:  px2rem(10);
          i {
            height: px2rem(40);
            font-size: px2rem(16);
            line-height: px2rem(40);
            margin: 0 px2rem(30) 0 px2rem(6);
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
  .city-content {
  // 搜索列表
  .city-search-ul {
    margin-top: px2rem(106);
    li {
      height: px2rem(30);
      color: #191a1b;
      font-size: px2rem(14);
      text-indent: px2rem(34);
    }
  }
  // 页面的城市列表
  .city-render-li {
    width: 100%;
    a {
        text-decoration: none;
        display: inline-block;
        width: 33%;
        height: px2rem(48);
        line-height: px2rem(48);
        padding: 0 px2rem(16);
        text-align: center;
        color: #191a1b;
        font-size: px2rem(14);
        background: #fff;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
  }
  }
  // 城市列表
  .mint-indexlist-content {
    width: 97%;
    margin-top: px2rem(96);
    .mint-indexsection-index {
      font-size: px2rem(12);
      background: #f4f4f4;
      color: #797d82;
      padding: 0 0 0 px2rem(15);
      height: px2rem(30);
      line-height: px2rem(30);
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
  }
  // 首字母
  .mint-indexlist-nav {
    width: 3%;
    position: relative;
    .mint-indexlist-navlist {
      position: fixed;
      right: 1%;
      top: 56%;
      transform: translateY(-50%);
      width: 3%;
      text-align: center;
    }
  }
  .mint-indexlist-navitem {
    width: 100%;
    font-size: px2rem(12);
    margin: px2rem(2) 0;
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
