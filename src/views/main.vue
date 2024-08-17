<template>

  <!--背景颜色-->
  <div class="bgColor">
    <!--背景图片-->
    <div class="">
      <!--面板-->
      <div>
        <Board/>
      </div>
    </div>
  </div>

</template>

<script setup>
import Board from '../components/board.vue'

</script>

<style lang="scss" scoped>
.bgImg {
  //background-image: url("../assets/bg.jpg");
  height: 100%;
  background-size: cover;
  background-position: center;
  //opacity: 0.15;
}
</style>