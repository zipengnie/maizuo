<template>
  <div>
    <mt-header title="当前城市 -">
      <router-link to="/" slot="left">
        <mt-button icon="back"><i class="iconfont icon-untitled94"></i></mt-button>
      </router-link>
    </mt-header>
    <mt-search
      v-model="searchCity"
      cancel-text="取消"
      placeholder="搜索">
    </mt-search>
    <div class="cityHeard">
  
      <!-- <header class="mint-header">
        <div class="mint-header-button is-left">
          <a href="#/" class="router-link-active" style="text-decoration: none;">
            <button class="mint-button mint-button--default mint-button--normal">
              <label class="mint-button-text"><i class="iconfont icon-untitled94"></i></label>
            </button>
          </a>
        </div>
        <h1 class="mint-header-title">当前城市 -</h1>
        <div class="mint-header-button is-right"></div>
      </header> -->
      <!-- <div class='mint-searchbar'>
        <div class="mint-searchbar-inner">
          <i class="mintui mintui-search"></i><input type="text" v-model="searchCity" placeholder="输入城市名或拼音" class="mint-searchbar-core">
      </div>
      <a class="mint-searchbar-cancel" style="display: none;">取消</a></div> -->
    <!-- </div> -->
    <!-- <ul class="city-ul" v-show="searchCity">
      <li v-for="(item, index) in filterCity" :key="index">
        {{ item.name || item.pinyin }}
      </li>
    </ul>
    <div class="cityList" v-show="!searchCity">
      <mt-index-list>
        <mt-index-section v-for="(item, index) in cityData" :key="index" :index='item.inital'>
        <li class="cityLi">
          <a href="#" v-for="obj in item.list" :key="obj.id">{{ obj.name }}</a>
        </li>
        </mt-index-section>
      </mt-index-list>
    </div> -->
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import { Header, Search, IndexList, IndexSection, Cell, Toast } from 'mint-ui'
Vue.use(Header.name, Header)
Vue.use(Search.name, Search)
Vue.component(Cell.name, Cell)
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
      }, 1000)
    }
  },
  created () {
    this.getCity()
  }
}
</script>

<style lang="scss">
@import "@/styles/common/px2rem.scss";
// .cityHeard {
//   width: 100%;
//   position: fixed;
//   z-index: 1;
//   background: #fff;
// }
// .mint-header {
//   width: 100%;
//   height: px2rem(40);
//   padding: px2rem(1) 0;
//   background: #fff;
//   // 退出按钮x
//   .mint-header-button {
//     box-sizing: border-box;
//     line-height: px2rem(40);
//     i {
//       font-size: px2rem(16);
//       line-height: px2rem(40);
//       margin: 0 px2rem(30) 0 px2rem(6);
//       color: #000;
//     }
//   }
//   // 当前城市
//   .mint-header-title {
//     font-size: px2rem(18);
//     color: #000;
//   }
// }
// // 搜索
// .mint-searchbar {
//   width: 100%;
//   padding: px2rem(10) px2rem(16);
//   background: rgba(0,0,0,0.08);
//   .mint-searchbar-inner {
//     height: px2rem(30);
//     .mintui-search {
//       font-size: px2rem(14);
//     }
//     .mint-searchbar-core {
//       height: px2rem(30);
//       font-size: px2rem(14);
//       padding-left:  px2rem(14);
//     }
//   }
// }
// ::-webkit-input-placeholder {
//   color:rgba(0,0,0,0.4);
//   font-size:  px2rem(12);
// }
// .mint-searchbar-cancel {
//     text-align: left;
//     font-size: 14px;
//     color: #000;
//     font-size: px2rem(14);
// }
// // 搜索列表
// .city-ul {
//   margin-top: px2rem(106);
//   li {
//     height: px2rem(30);
//     color: #191a1b;
//     font-size: px2rem(14);
//     text-indent: px2rem(34);
//   }
// }
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
.cityLi {
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
