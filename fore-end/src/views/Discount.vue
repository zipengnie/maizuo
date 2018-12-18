<template>
  <div>
    <ul>
      <li v-for="(item, index) in info" :key="index">
        <a href="#">
          <img class="discount-img" :src="item.activeBannerUrl">
          <div>
            <p class="discount-address">{{ item.masterTitle }}</p>
            <p class="discount-detail">{{ item.slaveTitle }}</p>
            <div class="price">
              <div class="price-left">
                <span class="currentPrice">￥{{ (item.price/100).toFixed(2) }}</span><span class="originalPrice">原价￥{{ (item.marketPrice/100).toFixed(2) }}</span>
                <div class="imgs">
                  <!-- <img  class="user-img" :src="img1" />
                  <img class="user-img" :src="img2"/> -->
                </div>
              </div>
              <button>去拼单</button>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Discount',
  data () {
    return {
      info: []
    }
  },
  methods: {
    getDiscount () {
      axios.get('/api/discount').then(response => {
        this.info = response.data.data
        console.log(this.info)
      })
    }
  },
  created () {
    this.getDiscount()
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/common/px2rem.scss";
li {
  border-bottom: px2rem(6) solid rgba(0,0,0,0.2);
}
a {
  display: inline-block;
  width: 100%;
  text-decoration: none;
}
.discount-img{
  height: px2rem(210);
}
p {
  margin:  px2rem(15);
}
p:first {
  margin-top: 0;
}
.discount-address {
  font-size: px2rem(15);
  height: px2rem(21);
  line-height: px2rem(21);
  color: #191a1b;
}
.discount-detail {
  font-size: px2rem(13);
  height: px2rem(19);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: px2rem(19);
  color: #797d82;
}
.price {
  margin: px2rem(15);
  padding-top: px2rem(10);
  display: flex;
  justify-content: space-between;
}
.price-left {
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.currentPrice {
  font-size: px2rem(20);
  line-height: px2rem(20);
  color: #c03131;
}
.originalPrice {
  font-size: px2rem(11);
  text-decoration: line-through;
  color: #bdc0c5;
}
.user-img {
  width:  px2rem(30);
  height:  px2rem(30);
  border-radius:  px2rem(23);
}
img[user-img]:last-child {
  margin-left: px2rem(-10);
  z-index: 1;
  border: px2rem(1) solid #fff;
  transform: translateZ(1px);
}
.user-img img {
  width:  px2rem(30);
  line-height:  px2rem(30);
  overflow: hidden;
  border-radius:  px2rem(23);
  box-sizing: content-box;
}
button {
  width: px2rem(90);
  height: px2rem(33);
  font-size: px2rem(14);
  background: #c03131;
  color: #fff;
  border-radius: px2rem(3);
}
</style>
