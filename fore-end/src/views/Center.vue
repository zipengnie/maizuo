<template>
  <div class="center-view">
    <header id="header">
      <div class="tou" :class="{ touPhoto: phone}">
      </div>
      <h2>
        <router-link to="/user/card" v-if="!phone">立即登录</router-link>
        <span v-if="phone">{{ phone.phone.replace(/^(\d{3})\d{4}(\d{4})$/,'$1****$2') }}</span>
      </h2>
    </header>
    <main id="main">
      <div class="dingdan">
        <h3>
          <i class="iconfont icon-dingdan" style="color: orange;"></i>
          <span>电影订单</span>
        </h3>
        <h3>
          <i class="iconfont icon-pintuandingdan" style="color: greenyellow;;"></i>
          <span>拼团订单</span>
        </h3>
      </div>
      <div class="ul">
        <router-link tag="div" class="card" to="/user/card">
          <div class="list">
            <i style="color: rgb(245, 89, 89);" class="iconfont icon-qia01"></i>
            <span>卖座卡</span>
          </div>
          <div class="list1">
            <i class="iconfont icon-20151209tubiaolianxizhuanhuan09-copy"></i>
          </div>
        </router-link>
        <div class="balace">
          <div class="list">
            <i style="color: red;" class="iconfont icon-yue"></i>
            <span>余额</span>
          </div>
          <div class="list1">
            <p>￥0</p>
            <i class="iconfont icon-20151209tubiaolianxizhuanhuan09-copy"></i>
          </div>
        </div>
        <div class="set">
          <div class="list">
            <i style="color: rgb(15, 235, 52);" class="iconfont icon-shezhi2"></i>
            <span>设置</span>
          </div>
          <div class="list1">
            <i class="iconfont icon-20151209tubiaolianxizhuanhuan09-copy"></i>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Center',
  data () {
    return {
      phone: JSON.parse(localStorage.getItem('userName')) ? JSON.parse(localStorage.getItem('userName')) : ''
    }
  }
}
</script>

<style lang="scss" scoped>
/* @import '../styles/common/px2rem.scss'; */
@import "@/styles/common/px2rem.scss";

.center-view {
  flex: 1;
}

#header {
  height: px2rem(160);
  background: url('~@/images/banner.png') no-repeat;
  background-size: 100%;
  display: flex;
  .tou {
    height: px2rem(67);
    width: px2rem(67);
    border: px2rem(2) solid white;
    background: #ccc url('~@/images/head.png') no-repeat 0 0;
    border-radius: 50%;
    align-self: center;
    margin-left: px2rem(20);
  }
 .touPhoto {
    background: #ccc url('../images/tou.gif') no-repeat;
    background-size: 100%;
  }
  h2 {
    font-size: px2rem(16);
    align-self: center;
    margin-left: px2rem(20);
    a {
      color: white;
    }
  }
}
#main {
  flex: 1;
  display: flex;
  background: #f4f4f4;
  flex-direction: column;
  .dingdan {
    display: flex;
    height: px2rem(80);
    h3 {
      background: white;
      flex: 1;
      display: flex;
      flex-direction: column;
      text-align: center;
      i {
        font-size: px2rem(26);
        margin: px2rem(8) 0;
      }
      span {
        font-size: px2rem(20);
        color: #ccc;
      }
    }
  }
  .ul {
    display: flex;
    flex: 1;
    border-top: px2rem(10) solid #f4f4f4;
    flex-direction: column;
    .card,
    .balace,
    .set {
      padding: 0 px2rem(15);
      background: white;
      height: px2rem(50);
      border-bottom: px2rem(1) solid #f4f4f4;
      display: flex;
      .list {
        flex: 1;
        display: flex;
        align-items: center;
        i {
          font-size: px2rem(16);
        }
        span {
          font-size: px2rem(16);
          margin-left: px2rem(10);
        }
      }
      .list1 {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        i {
          font-size: px2rem(14);
        }
        p {
          font-size: px2rem(16);
          color: #444;
        }
      }
    }
  }
}
</style>
