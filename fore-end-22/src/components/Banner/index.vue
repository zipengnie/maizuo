// Banner组件
<template>
    <!-- 轮播图组件 -->
    <!-- 轮播图 -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src="../../images/pic-1.jpg" alt="">
        </div>
        <div class="swiper-slide">
          <img src="../../images/pic-2.jpg" alt="">
        </div>
        <div class="swiper-slide">
          <img src="../../images/pic-3.jpg" alt="">
        </div>
        <div class="swiper-slide">
          <img src="../../images/pic-4.jpg" alt="">
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
    <!-- /轮播图 -->
</template>
<script>
export default {
  name: 'Banner' // 也可以不写
}
</script>
<style lang="scss" scoped>// scoped 表示只对当前组件生效
// lang 属性规定元素内容的语言。
@import '../../styles/common/px2rem.scss';
</style>
