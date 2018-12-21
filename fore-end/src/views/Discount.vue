<template>
  <div class="discount">
    <ul class="discount-ul">
      <li v-for="(item, index) in info" :key="index">
        <a href="#">
          <img class="discount-img" :src="item.activeBannerUrl">
          <div class="discount-li-foot">
            <p class="discount-address">{{ item.masterTitle }}</p>
            <p class="discount-detail">{{ item.slaveTitle }}</p>
            <div class="price">
              <div class="price-left">
                <span class="currentPrice">￥{{ (item.price/100).toFixed(2) }}</span>
                <span class="originalPrice">原价￥{{ (item.marketPrice/100).toFixed(2) }}</span>
                <div class="imgs">
                  <img class="user-img"
                    v-for="user in item.userList"
                    :key="user.icon"
                    :src="user.icon" />
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

<style lang="scss">
@import "@/styles/common/px2rem.scss";
.discount {
  width: 100%;
  .discount-ul {
    width: 100%;
    li {
      border-bottom: px2rem(6) solid rgba(0,0,0,0.2);
      a {
        display: inline-block;
        width: 100%;
        text-decoration: none;
        .discount-img{
          width: 100%;
          height: px2rem(210);
        }
        .discount-li-foot {
          p {
              margin:  px2rem(15);
            }
           .price {
              margin: px2rem(15);
              padding-top: px2rem(10);
              display: flex;
              justify-content: space-between;
              .price-left {
                width: 70%;
                display: flex;
                justify-content: space-between;
                align-items: center;
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
                .imgs {
                  // width: px2rem(70);
                  position: relative;
                  padding-left: px2rem(20);
                  img {
                    width:  px2rem(30);
                    line-height:  px2rem(30);
                    overflow: hidden;
                    border-radius:  px2rem(23);
                    box-sizing: content-box;
                    .user-img:nth-of-type(2) {
                      position: absolute;
                      z-index: -1;
                      left: px2rem(40);
                    }
                  }
                }
              }
              button {
                width: px2rem(90);
                height: px2rem(33);
                font-size: px2rem(14);
                background: #c03131;
                color: #fff;
                border-radius: px2rem(3);
              }
          }
        }
      }
    }
  }
}
.discount-address {
  margin-top: 0;
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
</style>
