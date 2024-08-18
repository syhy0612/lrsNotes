<template>
  <div class="bgColor">
    <div class="header">
      <div class="controls">
        <!--这里可以添加计时器和按钮-->
      </div>
    </div>
    <div class="content">
      <div class="section">
        <SearchTypes class="search-types"/>
      </div>
      <div class="section">
        <Board/>
      </div>
    </div>
  </div>
</template>

<script setup>
import SearchTypes from "@/components/searchTypes.vue";
import Board from '@/components/board.vue'
</script>

<style lang="scss" scoped>

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 50px;
}

.content {
  margin-left: 50px;
  display: flex;
  flex-direction: column;
}

.section {
  margin-bottom: 20px;
}

.search-types {
  // 保留原有的边框样式
  border: #770e3a solid 1px;
}

// 保留原有的背景样式
.bgImg {
  height: 100%;
  background-size: cover;
  background-position: center;
}
</style>