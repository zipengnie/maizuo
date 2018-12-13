// 正在上映影片组件
<template>
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
</template>
<script>
// 引入axios库
import axios from 'axios'
export default {
  name: 'NowPlay', // 也可以不写
  data () {
    return {
      films: [],
      pageNum: 1, // 当前页码
      pageSiz: 5, // 每页条数
      totalPage: 0 // 总页数
    }
  },
  methods: {
    // 获取影片
    getFilms () {
      axios.get('/api/films/list', {
        params: {
          // get请求的参数要放在这个params参数里面
          pageNum: this.pageNum,
          pageSiz: this.pageSiz,
          type: 1
        }
      })
        .then((response) => {
          // console.log(response)
          var result = response.data
          if (result.code === 0) {
            this.films = result.data.films
          } else {
            alert(result.msg)
          }
        })
    },
    /**
     * 排列我们主演列表
     * @param {Array} list 主演列表
     */
    actorsList (list) {
      var arr = []
      arr = list.map(item => {
        return item.name
      })
      return arr.join(' ')
    }
  },
  created () {
    this.getFilms()
  }
}
</script>
<style lang="scss" scoped>// scoped 表示只对当前组件生效
// lang 属性规定元素内容的语言。
@import '../../styles/common/px2rem.scss';
@import '@/styles/common/px2rem.scss';
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
