<template>
  <div class="set">
    <mt-header title="设置">
      <router-link to="/" slot="left">
      </router-link>
    </mt-header>
    <div class="content">
      <div class="userId">
        <span class="left">账户ID</span>
        <span class="right">2551331</span>
      </div>
      <router-link tag="div" class="userPwd" to="/">
        <span class="left">登录密码</span>
        <span class="right">未设置
          <i class="iconfont icon-youjiantou"></i>
        </span>
      </router-link>
      <router-link tag="div" class="safePwd" to="/">
        <span class="left">安全密码</span>
        <span class="right">未设置
          <i class="iconfont icon-youjiantou"></i>
        </span>
      </router-link>
      <router-link tag="div" class="userPwd" to="/">
        <span class="left">软件版本</span>
        <span class="right">
          <i class="iconfont icon-youjiantou"></i>
        </span>
      </router-link>
      <router-link tag="div" class="safePwd" to="/">
        <span class="left">意见反馈</span>
        <span class="right">
          <i class="iconfont icon-youjiantou"></i>
        </span>
      </router-link>
      <div>
        <span class="left">清除缓存</span>
        <span class="right">0.01KB</span>
      </div>
    </div>
    <div class="logout" @click="removeLocalStorage">退出登录</div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Header } from 'mint-ui'
Vue.component(Header.name, Header)
export default {
  name: 'Set',
  methods: {
    removeLocalStorage () {
      this.$router.replace({path: '/'})
      localStorage.clear()
    }
  }
}
</script>
<style lang="scss">
/* @import '../styles/common/px2rem.scss'; */
@import "@/styles/common/px2rem.scss";
.set {
  display: flex;
  flex-direction: column;
  height: 100%;
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
    font-size:  px2rem(20);
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
.content {
  height: 100%;
  background: #f4f4f4;
  div {
    display: flex;
    justify-content: space-between;
    height: px2rem(40);
    line-height: px2rem(40);
    padding: 0 px2rem(10);
    background: #fff;
    .left {
      font-size: px2rem(16);
    }
    .right {
      font-size: px2rem(16);
      color:rgba(0,0,0,0.4);
      i {
        font-size: px2rem(16);
      }
    }
  }
}
.userId {
  margin: px2rem(10) 0;
}
.userPwd {
  border-bottom: px2rem(1) solid rgba(0,0,0,0.2) ;
}
.safePwd {
  margin-bottom: px2rem(10);
}
// .detail {
//   margin-top: 40%;
//   display: flex;
//   flex: 1;
//   height: 100%;
//   flex-direction: column;
//   align-items: center;
//   p {
//     margin: px2rem(20);
//   }
//   button {
//     width: px2rem(160);
//     height: px2rem(40);
//     border-radius: px2rem(4);
//     font-size: px2rem(20);
//     background: #fff;
//     color: #ff5f16;
//   }
// }
.logout {
  height: px2rem(50);
  text-align: center;
  line-height: px2rem(50);
  font-size: px2rem(16);
  color:#ff5f16;
  background: #000;
}
</style>
