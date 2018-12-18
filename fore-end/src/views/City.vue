<template>
<div>
  <header class="mint-header">
    <div class="mint-header-button is-left">
      <a href="#/" class="router-link-active">
        <button class="mint-button mint-button--default mint-button--normal">
          <label class="mint-button-text">×</label>
        </button>
      </a>
    </div>
    <h1 class="mint-header-title">当前城市 -</h1>
    <div class="mint-header-button is-right"></div>
  </header>
  <div class='mint-searchbar'>
    <div class="mint-searchbar-inner">
      <i class="mintui mintui-search"></i><input type="search" placeholder="搜索" class="mint-searchbar-core">
  </div><a class="mint-searchbar-cancel" style="display: none;">取消</a></div>
  <mt-index-list>
  <mt-index-section index="A">
    <mt-cell title="Aaron"><a href="#">鞍山</a></mt-cell>
    <mt-cell title="Aaron"><a href="#">鞍山</a></mt-cell>
    <mt-cell title="Aaron"><a href="#">鞍山</a></mt-cell>
    <mt-cell title="Aaron"><a href="#">鞍山</a></mt-cell>
  </mt-index-section>
   <mt-index-section index="A">
    <mt-cell title="Aaron"><a href="#">鞍山</a></mt-cell>
    <mt-cell title="Aaron"><a href="#">鞍山</a></mt-cell>
    <mt-cell title="Aaron"><a href="#">鞍山</a></mt-cell>
    <mt-cell title="Aaron"><a href="#">鞍山</a></mt-cell>
  </mt-index-section>
</mt-index-list>

</div>
</template>

<script>
import Vue from 'vue'
// import axios from 'axios'
import { Header, Search, IndexList, IndexSection } from 'mint-ui'
Vue.use(Header.name, Header)
Vue.use(Search.name, Search)
Vue.component(IndexList.name, IndexList)
Vue.component(IndexSection.name, IndexSection)
export default {
  name: 'City'
  // data: {
  //   return {
  //     value:[
  //       {leter:'a', cityName:['安阳']}
  //     ]
  //   }
  // }
}
</script>

<style lang="scss" scoped>
@import "@/styles/common/px2rem.scss";
.mintui {
   font-size: px2rem(20);
}
.mint-header {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background-color: #fff;
    box-sizing: border-box;
    color: #000;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: px2rem(17);
    height: px2rem(40);
    line-height: 1;
    padding: 0 px2rem(10);
    position: relative;
    text-align: center;
    white-space: nowrap;
}
.mint-button-text {
    font-size: px2rem(40);
    font-weight: 300;
}

.mint-searchbar {
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  font-size: px2rem(30);
}
.mint-searchbar-inner {
  background-color: #fff;
  border-radius: px2rem(4);
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  height: px2rem(28);
  padding: px2rem(4) px2rem(6);
}
.mint-searchbar-inner .mintui-search {
  font-size: px2rem(12);
  color: #d9d9d9;
  font-size: px2rem(20);
}
.mint-searchbar-cancel {
  color: #26a2ff;
  margin-left: px2rem(10);
  text-decoration: none;
}

mt-index-section {
  font-size: px2rem(40);
}
.mint-searchbar-core {
  font-size: 0;
}
</style>
