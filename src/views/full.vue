<template>

  <!--背景颜色-->
  <div class="bgColor">
    <div class="outside">
      <div class="board">
        <!--面板-->
        <Board/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue';
import Board from '../components/board-full.vue';

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