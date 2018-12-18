<template>
  <div class="cinemas-list">
    <h1>当前项目是：{{project}}</h1>
    <h1>影院首页</h1>
    <h3>当前定位的城市是{{curCity}}</h3>
    <h4>{{cinemaCity}}</h4>
    <button @click="change">修改</button>
    <br>
    <ul>
      <li v-for="(item,index) in myLoveBooks" :key="index">{{item.name}}</li>
    </ul>
  </div>
</template>
<script>
// // 引入store仓库
// import store from '../store'
// 需要使用辅助函数就得引入,这里使用了ES6解构赋值
import { mapState, mapGetters } from 'vuex'
// var mapState = vuex.mapState

export default {
  name: 'cinema',
  data () {
    return {
      // changku: this.$store //  this.$store是一个对象（引用数据类型）
      cinemaName: '深圳市-凤凰传奇'
    }
  },
  // computed: {
  //   curCity () {
  //     return this.$store.state.curCity
  //   },
  //   project () {
  //     return this.$store.state.project
  //   },
  //   cinemaCity () {
  //     return this.cinemaName.split('-')[0]
  //   }
  // },
  // computed: mapState(['curCity', 'project']),
  // computed: mapState({myCity: 'curCity', myProject: 'project'})
  computed: {...mapState(['curCity', 'project']), ...mapGetters(['myLoveBooks']), cinemaCity () { return this.cinemaName.split('-')[0] }},
  methods: {
    // 注意：这里修改的是当前组件的changku的值，并不会改变store的state.curCity，需要使用store.commit 方法提交 mutation改变state得状态
    change () {
      // 如果不小心定义了this.changku = 'zhangsan'就切断了与store的联系
      // this.changku.state.curCity = '南京市'
      // this.$store.commit('chgCurCity', '南京')
      // this.$store.commit('chgCurCity', { 'cityName': '南京', 'quName': '宝安区' })
      this.$store.commit({ type: 'chgCurCity', 'cityName': '南京', 'quName': '宝安区' })
    }
  },
  mounted () {
    // 怎样访问到store里面的getters
    // console.log(this.$store.getters.myLoveBooks)
  }
}
</script>

<style lang="scss">
// @import '../styles/common/px2rem.scss';相当于@import '@/styles/common/px2rem.scss';@是src文件的别名
@import '@/styles/common/px2rem.scss';
.cinemas-list {
  flex: 1;
}
button {
  font-size: px2rem(20);
}
</style>
