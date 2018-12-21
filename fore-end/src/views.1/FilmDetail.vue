<template>
  <div class="film-detail">
     <header class="film-header">
        <a href="/" class="go-back"><i class="iconfont icon-zuojiantou"></i></a>
    </header>
    <div class="film-poster">
      <img src="https://pic.maizuo.com/usr/movie/f713d0f85512087679ac951e8565d187.jpg?x-oss-process=image/quality,Q_70" alt="">
    </div>

    <div class="film-detail">
      <div class="col">
        <div class="film-name">
          <span class="name">{{ film.name }}</span>
          <span class="item">{{ film.name && film.filmType.name }}</span>
        </div>
        <div class="film-grade">
          <span class="grade">{{ film.grade }}</span>
          <span class="grade-text">分</span>
        </div>
      </div>

      <div class="film-category grey-text">{{ film.category }}</div>
      <div class="film-premiere-time grey-text">
        {{ new Date().toLocaleString(time).split(" ")[0] }}上映
      </div>
      <div class="film-nation-runtime grey-text">
        {{ film.nation }} | {{ film.runtime }}分钟
      </div>
      <div class="film-synopsis grey-text">
        {{ film.synopsis }}
      </div>
      <div class="toggle">
        <i class="iconfont icon-xiala"></i>
      </div>
    </div>
   <div class="actors">
      <div class="actors-title-bar"><span class="actors-title-text">演职人员</span></div>
      <ul class="actors-list">
        <li><a href="#"><img src="../images/actor1.jpg"/><p class="actors-name">温子仁</p><p class="actors-role">导演</p></a></li>
        <li><a href="#"><img src="../images/actor2.jpg"/><p class="actors-name">温子仁</p><p class="actors-role">导演</p></a></li>
        <li><a href="#"><img src="../images/actor3.jpg"/><p class="actors-name">温子仁</p><p class="actors-role">导演</p></a></li>
        <li><a href="#"><img src="../images/actor4.jpg"/><p class="actors-name">温子仁</p><p class="actors-role">导演</p></a></li>
      </ul>
  </div>
  <div class="actors-photo">
      <div class="actors-photo-bar"><span class="actors-photo-text">剧照</span></div>
      <ul class="actors-photo-list">
        <li><a href="#"><img src="../images/photo1.jpg"/></a></li>
        <li><a href="#"><img src="../images/photo2.jpg"/></a></li>
        <li><a href="#"><img src="../images/photo3.jpg"/></a></li>
        <li><a href="#"><img src="../images/photo4.jpg"/></a></li>
        <li><a href="#"><img src="../images/photo5.jpg"/></a></li>
        <li><a href="#"><img src="../images/photo6.jpg"/></a></li>
      </ul>
  </div>
  <a href="#/film/4469/cinemas" class=""><div class="goSchedule">
        选座购票
      </div></a>
</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import { Header } from 'mint-ui'
Vue.use(Header.name, Header)
export default {
  name: 'FilmDetail',
  data () {
    return {
      film: ''
    }
  },
  methods: {
    getFilmDetail () {
      var filmId = this.$route.params.filmId
      axios.get('/api/filmDetail', {
        params: {
          // 电影id
          filmId: filmId
        }
      }).then((response) => {
        console.log(response.data.data)
        this.film = response.data.data[0]
      })
    }
  },
  created () {
    this.getFilmDetail()
  },
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    console.log('进入到组件守beforeRouteEnter卫详情')
    next()
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    console.log('详情页组件路由有更新的情况, 会进来beforeRouteUpdate')
    // 上面 watch $route 的代码可以在这里写
    this.getFilmDetail()
    next()
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    console.log('详情页离开之前，会调用beforeRouteLeave')
    next()
  }
}
</script>
<style lang="scss">
@import '@/styles/common/px2rem.scss';
.film-header {
  position: fixed;
  z-index: 1;
  height: px2rem(30);
  width: 100%;
}
.go-back {
  text-decoration: none;
  display: inline-block;
  height: px2rem(30);
  width: px2rem(30);
  background: #fff;
  border-radius: px2rem(15);
  text-align: center;
  margin: px2rem(2);
}
.go-back i {
  color: rgba(10, 5, 5, 0.4);
  height: px2rem(30);
  line-height: px2rem(30);
  font-size: px2rem(20);
  font-weight: 800;
}
.film-detail {
  flex: 1;
  overflow-y: auto;
  .film-poster {
    height: px2rem(210);
    img {
      width: 100%;
      height: 100%;
    }
  }
  .film-detail {
    padding: px2rem(15);
    padding-top: px2rem(12);
    background-color: #fff;
    .col {
      display: flex;
      align-items: center;
    }
    .film-name {
      flex: 1;
      display: flex;
      align-items: center;
      .name {
        color: #191a1b;
        font-size: px2rem(18);
        height: px2rem(24);
        line-height: px2rem(24);
        margin-right: px2rem(8);
      }
      .item {
        font-size: px2rem(12);
        color: #fff;
        background-color: #d2d6dc;
        height: px2rem(14);
        line-height: px2rem(14);
        padding: 0 px2rem(2);
        border-radius: px2rem(2);
        display: inline-block;
      }
    }
    .film-grade {
      flex-shrink: 0;
      width: px2rem(100);
      text-align: right;
      color: #ffb232;
      font-size: px2rem(12);
      .grade {
        font-size: px2rem(18);
        font-style: italic;
      }
    }
    .grey-text {
      font-size: px2rem(13);
      line-height: px2rem(20);
      color: #797d82;
      margin-top: px2rem(4);
    }
    .film-synopsis {
      height: px2rem(40);
      margin-top: px2rem(8);
      overflow: hidden;
      white-space: wrap;
      text-overflow: ellipsis;
      &.hide {
        height: px2rem(40);
      }
    }
    .toggle {
      text-align: center;
      &.hide {
        i {
          transform: translate(180deg);
        }
      }
    }
  }
}
.actors {
  border-top: px2rem(10) solid rgba(0,0,0,0.1);
  padding: px2rem(4);
  width: 100%;
}
.actors-title-bar {
    width: 100%;
    padding: px2rem(15);
}
.actors-title-text {
  font-size: px2rem(16);
  text-align: left;
  color: #191a1b;
}
.actors-title-bar span {
    display: inline-block;
    height: px2rem(22);
    line-height: px2rem(22);
}
.actors-list {
  display: flex;
  justify-content: space-between;
}
.actors-list li {
  width: 24%;
}
.actors-list li a {
  text-decoration: none;
  display: inline-block;
  width: 100%;
  text-align: center;
}
.actors-list a img {
  width: 100%;
}
.actors-name {
  padding-top: 10px;
  font-size: px2rem(12);
  color: #191a1b;
}
.actors-role {
  padding: px2rem(9);
  font-size: px2rem(10);
  color: #797d82;
}
.goSchedule {
    position: fixed;
    bottom: 0;
    left: 0;
    height: px2rem(49);
    width: 100%;
    text-align: center;
    background-color: #ff5f16;
    color: #fff;
    font-size: px2rem(16);
    line-height: px2rem(49);
}

// <div class="actors-photo">
//       <div class="actors-photo-bar"><span class="actors-photo-text">剧照</span></div>
//       <ul class="actors-photo-list">

.actors-photo {
  border-top: px2rem(10) solid rgba(0,0,0,0.1);
  padding: px2rem(4);
  width: 100%;
}
.actors-photo-bar {
    width: 100%;
    padding: px2rem(15);
}
.actors-photo-text {
  font-size: px2rem(16);
  text-align: left;
  color: #191a1b;
}
.actors-photo-bar span {
    display: inline-block;
    height: px2rem(22);
    line-height: px2rem(22);
}
.actors-photo-list {
  display: flex;
  // justify-content: space-between;
}
.actors-photo-list li {
  width: 46%;
}
.actors-photo-list a {
  display: inline-block;
  width: 100%;
}
.actors-photo-list a img {
  width: 100%;
}
</style>
