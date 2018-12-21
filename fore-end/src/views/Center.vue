<template>
  <div class="center">
    <div class="center-header">
      <div class="avatar" :class="{ touPhoto: phone}"></div>
      <h2>
        <router-link to="/user/card" v-if="!phone">立即登录</router-link>
        <span
          v-if="phone"
          style="font: 16 Tahoma,Helvetica,Arial,sans-serif;
    font-family: Microsoft YaHei,Tahoma,Helvetica,Arial,sans-serif;
    -webkit-font-smoothing: antialiased;color:#fff;"
        >{{ phone.phone.replace(/^(\d{3})\d{4}(\d{4})$/,'$1****$2') }}</span>
      </h2>
    </div>
    <div class="center-content">
      <div class="centerTab">
        <h3>
          <img class="filmOrder" src="../images/filmOrder.png">
          <span>电影订单</span>
        </h3>
        <h3>
          <img class="order" src="../images/order.png">
          <span>拼团订单</span>
        </h3>
      </div>
      <div class="center-margin">
        <router-link tag="div" class="router-div" to="/user/card">
          <div class="left">
            <img src="../images/1.png" alt srcset>
            <span class="text">卖座卡</span>
          </div>
          <div class="right">
            <span class="value"></span>
            <i class="iconfont icon-youjiantou"></i>
          </div>
        </router-link>
        <router-link tag="div" class="router-div" to="/user/balance">
          <div class="left">
            <img src="../images/2.png" alt srcset>
            <span class="text">余额</span>
          </div>
          <div class="right">
            <span class="value"></span>
            <i class="iconfont icon-youjiantou"></i>
          </div>
        </router-link>
        <router-link tag="div" class="router-div" to="/user/set">
          <div class="left">
            <img src="../images/3.png" alt srcset>
            <span class="text">设置</span>
          </div>
          <div class="right">
            <span class="value"></span>
            <i class="iconfont icon-youjiantou"></i>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Center',
  data () {
    return {
      phone: JSON.parse(localStorage.getItem('userName'))
        ? JSON.parse(localStorage.getItem('userName'))
        : ''
    }
  }
}
</script>

<style lang="scss">
/* @import '../styles/common/px2rem.scss'; */
@import "@/styles/common/px2rem.scss";
.center {
  flex: 1;
  background: #f4f4f4;
  .center-header {
    height: px2rem(160);
    background: url("~@/images/banner.png") no-repeat;
    background-size: 100%;
    display: flex;
    .avatar {
      height: px2rem(67);
      width: px2rem(67);
      border: px2rem(2) solid white;
      background: #ccc url("~@/images/head.png") no-repeat 0 0;
      border-radius: 50%;
      align-self: center;
      margin-left: px2rem(20);
    }
    .touPhoto {
      background: #ccc url("../images/tou.gif") no-repeat;
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
  .center-content {
    flex: 1;
    display: flex;
    background: #f4f4f4;
    flex-direction: column;
    .centerTab {
      display: flex;
      height: px2rem(80);
      h3 {
        background: white;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        img {
          width: px2rem(26);
          height: px2rem(26);
        }
        span {
          font-size: px2rem(16);
          color: #ccc;
        }
      }
    }
  }
  .center-margin {
    border-top: px2rem(10) solid #f4f4f4;
    .router-div {
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-content: center;
      padding: px2rem(10) px2rem(20);
      .left {
        height: px2rem(24);
        display: flex;
        justify-content: space-between;
        align-content: center;
        img {
          height: px2rem(24);
        }
        .text {
          font-size: px2rem(16);
          line-height: px2rem(24);
          margin-left: px2rem(10);
        }
      }
      .right {
        i {
          font-size: px2rem(16);
        }
      }
    }
  }
}
</style>
