<template>
  <div class="bgColor">
    <div class="title">在线笔记</div>
    <router-link to="/board">
      <el-button color="#6633cc">开始使用</el-button>
    </router-link>
    <router-link to="/test">
      <el-button color="#6633cc" class="btnOld">beta1</el-button>
    </router-link>
    <router-link to="/add">
      <el-button color="#6633cc" class="btnOld">beta2</el-button>
    </router-link>
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

.bgColor {
  text-align: center;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #20240427;
}
</style>

<style lang="scss">
.bgColor {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #20240427;
  overflow-y: auto;
}
</style>