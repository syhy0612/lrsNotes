<template>
  <div class="container">
    <div class="bgColor">
      <div class="title">这是标题</div>
      <router-link to="/board">
        <el-button color="#6633cc">开始使用</el-button>
      </router-link>
      <router-link to="/old">
        <el-button color="#12345600" class="btnOld"></el-button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>

.title {
  color: #000000;
  font-family: 'Microsoft YaHei', serif;
  font-weight: bold;
  font-size: 32px;
  margin-top: 30vh;
  margin-bottom: 20px;
  letter-spacing: 6px;
}

.btnOld {
  margin-top: 20px;
}
</style>

<style>
.bgColor {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #20240427;
  text-align: center;
}
</style>