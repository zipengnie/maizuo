// 正在上映影片组件
<template>
 <!-- 影片介绍 -->
    <div class="films-list-content">
      <ul>
        <li
          v-for="(item, index) in films"
          :key="index" @click="goDetail(item.filmId)">
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
          <!-- <div class="buy" @click.stop="addCart(item)">购票</div> -->
          <button @click.stop="reduceFilm(item)">-</button>
          <input type="text" disabled :value="findNum(item)">
          <button @click.stop="addFilm(item)">+</button>
        </li>
      </ul>
       <div class="load-more" @click="loadMore">{{ loadMoreText }}</div>
    </div>
    <!-- 影片介绍 -->

</template>
<script>
// 引入axios库
import axios from 'axios'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'NowPlay', // 也可以不写
  data () {
    return {
      films: [],
      loadMoreText: '点击，加载下一页',
      pageNum: 1, // 当前页码
      pageSize: 5, // 每页条数
      totalPage: 0 // 总页数
    }
  },
  computed: {
    ...mapState(['filmsCart'])
  },
  methods: {
    ...mapMutations(['addFilm', 'reduceFilm']),
    // 获取影片
    getFilms () {
      axios.get('/api/films/list', {
        params: {
          // get请求的参数要放在这个params参数里面
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      })
        .then((response) => {
          // console.log(response)
          var result = response.data
          console.log(result.data.films)
          // 一共多少页
          this.totalPage = Math.ceil(result.data.total / this.pageSize)
          // 判断是否还有更多页
          if (this.pageNum >= this.totalPage) {
          // 没有更多页面
            this.loadMoreText = '别拉啦，没有更多。'
          }
          if (result.code === 0) {
          // this.films = result.data.films
          // 追加
          // this.films = this.films.push(...result.data.films)
            for (var i = 0; i < result.data.films.length; i++) {
              result.data.films[i].num = 0
            }
            this.films = this.films.concat(result.data.films)
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
      if (list) {
        arr = list.map(item => {
          return item.name
        })
      }
      return arr.join('')
    },
    /**
    * 加载更多
    */
    loadMore () {
      // 对当前页码加1
      if (this.pageNum < this.totalPage) {
        this.pageNum++
        this.getFilms()
      }
    },
    /**
     * 去详情页面
     * @param {String} id 影片ID
     */
    goDetail (id) {
      this.$router.push({
        // path: '/film/' + id,
        // path: `/film/${id}`,
        name: 'filmDetail',
        params: {
          filmId: id
        }
      })
    },
    /**
     * 添加电影票到购物车中
     * @param{object} item电影信息
     */
    // addCart (item, index) {
    //   item.num++
    //   // var num = item.num || 0
    //   // // 操作num
    //   // this.$set(this.films[index], 'num', ++num)
    //   // 操作store
    //   this.$store.commit('addFilm', {
    //     filmID: item.filmId,
    //     filmName: item.name,
    //     // 使用随机数来模拟价格
    //     filmPrice: Math.random(10 + 1, 20),
    //     filmQuantity: 1})
    // }
    // 查找当前电影的filmNum
    findNum (item) {
      var filmId = item.filmId
      // 判断当前这个filmId在store中的filmsCart中是否存在？
      var num = 0
      this.filmsCart.forEach(item => {
        if (item.filmId === filmId) {
          num = item.filmNum
        }
      })
      return num
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
  input,button {
    width: 10%;
    height: 10%;
    text-align: center;
    font-size: px2rem(20);
  }
  li {
    display: flex;
    margin: 0 px2rem(15);
    padding: px2rem(15) 0;
    border-bottom: px2rem(1) solid #ededed;
    font-size: px2rem(18);
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
.load-more {
    height: px2rem(30);
    line-height:px2rem(30);
    text-align: center;
}
</style>
