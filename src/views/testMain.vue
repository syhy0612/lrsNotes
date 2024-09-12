<template>
  <div class="bgColor">
    <div class="header">
      <div class="controls">
        <el-button @click="showSettings = true" class="settings-button">
          <el-icon>
            <Setting/>
          </el-icon>
        </el-button>
      </div>
    </div>
    <div class="content">
      <!--<div class="section">
              <SearchTypes class="search-types" @select-mode="handleModeSelect"/>
            </div>
      -->
      <div class="section">
        <Board/>
      </div>
    </div>

    <el-dialog
        v-model="showSettings"
        title="版型设置"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        class="settings-dialog"
    >
      <GameSettings @update-config="updateConfig"/>
    </el-dialog>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {Setting} from '@element-plus/icons-vue';
import {useGameModeStore} from '@/stores/gameModeStore';
import SearchTypes from "@/components/searchTypes.vue";
import Board from '@/components/board.vue';
import GameSettings from '@/components/devGameSettings.vue';

const showSettings = ref(false);
const store = useGameModeStore();

const handleModeSelect = (modeId) => {
  store.selectMode(modeId);
};

const updateConfig = (newConfig) => {
  store.updateGameModes(newConfig);
  store.saveToLocalStorage();
};

onMounted(() => {
  store.loadFromLocalStorage();
});
</script>

<style lang="scss" scoped>
.circle {
  width: 50px; /* 设置宽度 */
  height: 50px; /* 设置高度 */
  border: 2px solid black; /* 设置边框 */
  border-radius: 50%; /* 使元素变为圆形 */
  display: flex; /* 使用 flex 居中内容 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  font-size: 20px; /* 调整文字大小 */
}

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

.settings-button {
  margin-left: 10px;
}

.settings-dialog {
  :deep(.el-dialog__body) {
    max-height: 70vh;
    overflow-y: auto;
  }
}

.search-types {
  border: #770e3a solid 1px;
}

.bgImg {
  height: 100%;
  background-size: cover;
  background-position: center;
}
</style>