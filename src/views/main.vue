<template>

  <!--背景颜色-->
  <div class="bgColor">
    <!--    <div v-if="isWechatBrowser" class="wechat-tip">-->
    <!--      请点击右上角，选择"在浏览器打开"-->
    <!--    </div>-->
    <div v-if="isWechatBrowser">
      <!--抄的quark-->
      <img src="../assets/wechat_bg.jpg" alt="图片意思是：请点击右上角，选择在浏览器中打开" class="wechat_bg">
    </div>
    <div v-else class="outside">
      <div class="board" :class="position">
        <!--面板-->
        <Board/>
      </div>
      <!--按钮组-->
      <el-radio-group v-if="isPc" v-model="position" size="large" class="layout-controls">
        <el-radio-button value="left">靠左</el-radio-button>
        <el-radio-button value="center">居中</el-radio-button>
        <el-radio-button value="right">靠右</el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue';
import Board from '../components/board.vue';
import {ElRadioGroup, ElRadioButton} from 'element-plus';

const position = ref('center');
const isPc = ref(true); // 默认为 true

const checkIsPc = () => {
  isPc.value = window.innerWidth > 768; // 根据需要调整这个阈值
};

const isWechatBrowser = ref(false)

const checkWechatBrowser = () => {
  const ua = navigator.userAgent.toLowerCase()
  return /micromessenger/.test(ua) && /mobile/.test(ua)
}

onMounted(() => {
  isWechatBrowser.value = checkWechatBrowser()
  checkIsPc(); // 初始检查
  window.addEventListener('resize', checkIsPc); // 添加 resize 事件监听器
});

onUnmounted(() => {
  window.removeEventListener('resize', checkIsPc); // 清理事件监听器
});
</script>


<style lang="scss" scoped>
.outside {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  height: 100vh; //使用视口高度
  overflow: hidden; //防止出现滚动条
}

// 闲置方案
.wechat-tip {
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  border-radius: 5px;
  z-index: 9999;
}

.wechat_bg {
  width: 100%; // 图片宽度占满容器
  height: auto; // 高度自动调整以保持宽高比
  position: absolute; // 绝对定位
  top: 0;
  left: 0;
  object-fit: cover; // 确保图片覆盖整个区域，可能会裁剪部分内容
}

.board {
  //border: 1px red solid; //todo
  display: flex;
  width: 100%;
  margin-bottom: 20px;
  flex-grow: 1; //让 Board 占据剩余空间
}

.board.left {
  justify-content: flex-start;
}

.board.center {
  justify-content: center;
}

.board.right {
  justify-content: flex-end;
}

.layout-controls {
  margin-top: auto; //将按钮组推到底部
}
</style>