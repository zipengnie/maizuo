<template>
  <div class="films-list">
     <!-- 轮播图 -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src="../images/pic-1.jpg" alt="">
        </div>
        <div class="swiper-slide">
          <img src="../images/pic-2.jpg" alt="">
        </div>
        <div class="swiper-slide">
          <img src="../images/pic-3.jpg" alt="">
        </div>
        <div class="swiper-slide">
          <img src="../images/pic-4.jpg" alt="">
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
    <!-- /轮播图 -->

     <!-- 定位城市 -->
    <div class="city-fixed">
      <span>{{ curCity }}</span>
      <i class="iconfont icon-xiala"></i>
    </div>
    <!-- /定位城市 -->

    <!-- 正在上映和即将上映 -->
    <div class="tab-bar-wrapper">
      <ul class="tab-bar">
        <li class="z-act">
          <span>正在热映</span>
        </li>
        <li>
          <span>即将上映</span>
        </li>
      </ul>
    </div>
    <!-- 正在上映和即将上映 -->

    <!-- 影片介绍 -->
    <div class="films-list-content">
      <ul>
        <li
          v-for="(item, index) in films"
          :key="index">
          <div class="img">
            <img :src="item.poster" alt="">
          </div>
          <div class="info">
            <div>
              <span class="name">{{ item.name }}</span>
              <span class="type">{{ item.filmType.name }}</span>
            </div>
            <div>
              <span class="label">观众评分</span>
              <span class="grade">{{ item.grade }}</span>
            </div>
            <div>
              <span class="label">主演： {{ actorsList(item.actors) }}</span>
            </div>
            <div>
              <span class="label">{{ item.nation }} | {{ item.runtime }}分钟</span>
            </div>
          </div>
          <div class="buy">购票</div>
        </li>
      </ul>
    </div>
    <!-- 影片介绍 -->
  </div>
</template>
<script>
// 引入滑动插件
import Swiper from 'swiper'
// 引入axios库
import axios from 'axios'
export default {
  name: 'films',
  data () {
    return {
      // 当前城市
      curCity: '',
      films: [],
      pageNum: 1, // 当前页码
      pageSiz: 5, // 每页条数
      totalPage: 0 // 总页数
    }
  },
  methods: {
    // 根据百度地图API接口获取当前城市的名称
    getCityName () {
    /* eslint-disable */
     var myCity = new BMap.LocalCity()
     myCity.get(result=> {
       this.curCity = result.name
     })
    },
    // 获取影片
    getFilms () {
        axios.get('/api/films/list',{
            params:{
                // get请求的参数要放在这个params参数里面
                pageNum: this.pageNum,
                pageSiz: this.pageSiz
            }
        })
        .then((response) => {
            // console.log(response)
            var result = response.data
           if (result.code === 0) {
            this.films = result.data.films;
           } else {
            alert(result.msg);
           }
        })
    },
    /**
     * 排列我们主演列表
     * @param {Array} list 主演列表
     */
    actorsList (list) {
      var arr = [];
      arr = list.map(item => {
        return item.name;
      });
      return arr.join(' ');
    }
  },
  created () {
    this.getCityName ()
    this.getFilms ()
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
    // axios库
  }
}
</script>

<style lang="scss">
// @import '../styles/common/px2rem.scss';相当于@import '@/styles/common/px2rem.scss';@是src文件的别名
@import '@/styles/common/px2rem.scss';
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

.films-list-content {
  li {
    display: flex;
    margin: 0 px2rem(15);
    padding: px2rem(15) 0;
    border-bottom: px2rem(1) solid #ededed;
  }

  .img {
    flex-shrink: 0;
    width: px2rem(66);
    height: px2rem(94);
    img {
      width: 100%;
    }
  }

  .info {
    min-width: 100px;
    padding: 0 px2rem(10);
    font-size: px2rem(14);
    &>div {
      width: 100%;
      height: px2rem(22);
      line-height: px2rem(22);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .label {
      color: #797d82;
      margin-right: px2rem(2);
    }
    .name {
      font-size: px2rem(16);
      color: #191a1b;
    }
    .type {
      font-size: px2rem(12);
      color: #fff;
      background: #d2d6dc;
      padding: 0 px2rem(2);
    }
    .grade {
      color: #ffb232;
    }
  }

  .buy {
    flex-shrink: 0;
    align-self: center;
    width: px2rem(50);
    height: px2rem(26);
    line-height: px2rem(26);
    font-size: px2rem(14);
    color: #ff5f16;
    border: px2rem(1) solid #ff5f16;
    text-align: center;
    border-radius: px2rem(4);
  }
}
</style>
