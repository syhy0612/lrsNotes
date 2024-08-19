<template>

  <!--背景颜色-->
  <div class="bgColor">
    <div class="outside">
      <div class="board" :class="position">
        <!--面板-->
        <Board/>
      </div>
      <!--按钮组-->
      <el-radio-group v-model="position" size="large" class="layout-controls">
        <el-radio-button label="left">左对齐</el-radio-button>
        <el-radio-button label="center">居中</el-radio-button>
        <el-radio-button label="right">右对齐</el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import Board from '../components/board.vue';
import {ElRadioGroup, ElRadioButton} from 'element-plus';

const position = ref('center');
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