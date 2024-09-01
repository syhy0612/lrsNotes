<template>
  <div class="bgColor">
    <div class="content">
      <div class="title">在线笔记</div>
      <div class="button-container">
        <el-button color="#6633cc" class="btnOld" @click="navigateTo('/board')">开始使用</el-button>
        <el-button color="#6633cc" class="btnOld" @click="navigateTo('/test')">开发环境</el-button>
        <el-button color="#6633cc" class="btnOld" @click="navigateTo('/add')">测试环境</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router';

const router = useRouter();

const navigateTo = (path) => {
  router.push(path);
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30vh;
  user-select: none;
}

.title {
  color: #000000;
  font-family: 'Microsoft YaHei', serif;
  font-weight: bold;
  font-size: 32px;
  margin-bottom: 20px;
  letter-spacing: 6px;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px;
}

.btnOld {
  margin-top: 20px; // 恢复原有的按钮间距
}

.btnOld:nth-child(1) {
  margin-left: 10px;
}

.bgColor {
  text-align: center;
  height: 100vh;
  width: 100vw;
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