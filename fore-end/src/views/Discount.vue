<template>
<div>
  9.9折扣
</div>
</template>

<script>
import Vue from 'vue'
// import axios from 'axios'
import { Header, Search, IndexList, IndexSection } from 'mint-ui'
Vue.use(Header.name, Header)
Vue.use(Search.name, Search)
Vue.use(IndexList.name, IndexList)
Vue.use(IndexSection.name, IndexSection)
export default {
  name: 'Discount'
}
</script>

<style lang="scss" scoped>
@import "@/styles/common/px2rem.scss";

</style>
