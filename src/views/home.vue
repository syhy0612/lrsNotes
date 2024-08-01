<template>
  <div class="container">
    <div class="bg">
      <div class="title">这是标题</div>
      <router-link to="/board">
        <el-button type="primary">开始使用</el-button>
      </router-link>

    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.bg {
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #20240427;
  text-align: center;
}

.content {
  text-align: center;
}

.title {
  color: #000000;
  font-size: 32px;
  margin-top: 30vh;
  margin-bottom: 20px;
}
</style>