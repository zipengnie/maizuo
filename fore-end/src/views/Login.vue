<template>
  <div>
    <header id="header">
      <div class="logo"></div>
      <div class="sj">
        <input type="text" placeholder="手机号" v-model.trim="phoneInput">
        <!-- <span>获取验证码</span> -->
      </div>
      <div class="yzm">
        <input type="text" placeholder="验证码" v-model.trim="codeInput">
      </div>
      <button @click="handleLogin" :disabled="isDisabled">登录</button>
    </header>
  </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'mint-ui'
export default {
  name: 'Login',
  data () {
    return {
      phoneInput: '',
      codeInput: ''
    }
  },
  computed: {
    isDisabled () {
      if (this.phoneInput && this.codeInput) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    handleLogin () {
      axios.get('/api/user/login', {
        params: {
          phone: this.phoneInput,
          code: this.codeInput
        }
      }).then(res => {
        var result = res.data
        console.log(result)
        if (result.data.phone === this.phoneInput && result.data.code === this.codeInput) {
          let instance = Toast('登录成功')
          setTimeout(() => {
            instance.close()
          }, 2000)
          // 写入本地存储
          localStorage.setItem('userName', JSON.stringify({'phone': result.data.phone}))

          // var myNeedPage = localStorage.getItem('myNeedPage')

          // 取出 query的 redirect 的值
          let redirect = this.$route.query.redirect
          this.$router.replace(redirect)
        } else {
          let instance = Toast('手机号或验证码错误')
          setTimeout(() => {
            instance.close()
          }, 2000)
          // console.log('手机号或验证码错误')
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/common/px2rem.scss';

#header {
  height: px2rem(500);
  display: flex;
  flex-direction: column;
  .logo {
    width: px2rem(100);
    height: px2rem(100);
    background: url(../images/logo.jpg) no-repeat;
    background-size: 100%;
    margin: px2rem(100) auto;
  }
  .sj,
  .yzm {
    display: flex;
    height: px2rem(55);
    margin: px2rem(10) px2rem(25);
    input {
      width: 100%;
      font-size: px2rem(18);
      border: px2rem(1) solid #FD4E00;
      text-indent: px2rem(10);
      outline: none;
    }
    input::-webkit-input-placeholder {
      color: #FD4E00;
    }
    span {
      width: 30%;
      font-size: px2rem(18);
      color: #ccc;
      display: flex;
      align-self: center;
    }
  }
  button {
    display: flex;
    justify-content: center;
    height: px2rem(80);
    margin: px2rem(20) px2rem(25);
    background: #ff5f16;
    font-size: px2rem(20);
    text-align: center;
    color: white;

    &[disabled]{
      background: #ccc;
    }
  }
}

.mint-toast {
  font-size: px2rem(80);
}
.mint-toast-text {
   font-size: px2rem(80);
}
</style>
