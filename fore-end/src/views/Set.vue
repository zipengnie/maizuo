<template>
  <div class="card">
    <mt-header title="设置">
      <router-link to="/" slot="left">
        <mt-button icon="back"><i class="iconfont icon-Home"></i></mt-button>
      </router-link>
    </mt-header>
    <div class="detail">
      <router-link tag='div' to="/" ><img src="../images/card.png"></router-link>
      <p>你还没有卖座卡哟</p>
      <router-link tag='button' to="/">激活新卡</router-link>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Header } from 'mint-ui'
Vue.component(Header.name, Header)
export default {
  name: 'Set'
}
</script>
<style lang="scss" scoped>
/* @import '../styles/common/px2rem.scss'; */
@import "@/styles/common/px2rem.scss";
.card {
  display: flex;
  height: 100%;
  flex-direction: column;
}
.mint-header {
  background: none;
  color: #000;
  border-bottom: px2rem(1) solid rgba(0,0,0,0.2);
  width: 100%;
  height: px2rem(40);
  font-size:  px2rem(20);
  .mint-header-button i {
    width: px2rem(40);
    height: px2rem(40);
    line-height: px2rem(40);
    font-size:  px2rem(30);
    color: #000;
  }
}
.mint-header-button {
   width: px2rem(40);
   border: none;
}
.mint-header-button a {
  display: inline-block;
  text-decoration: none;
}
.mint-header-title {
  width: 100%;
  height: px2rem(40);
  font-size:  px2rem(20);
}
.detail {
  margin-top: 40%;
  display: flex;
  flex: 1;
  height: 100%;
  flex-direction: column;
  align-items: center;
  p {
    margin: px2rem(20);
  }
  button {
    width: px2rem(160);
    height: px2rem(40);
    border-radius: px2rem(4);
    font-size: px2rem(20);
    background: #fff;
    color: #ff5f16;
  }
}
</style>
