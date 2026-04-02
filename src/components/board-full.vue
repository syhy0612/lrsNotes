<template>
  <div class="board-full">
    <div class="board-header">
      <div class="mode-label">
        当前版型：<a href="#" @click.prevent="openSettings">{{ selectedMode ? selectedMode.name : '点击选择' }}</a>
      </div>
      <button class="icon-btn" @click="toggleFullScreen" title="全屏切换">⛶</button>
    </div>

    <div class="full-layout">
      <!-- 发言区 -->
      <div class="section section--players">
        <div class="section-header">
          <span class="section-title">💬 发言信息</span>
          <div class="section-actions">
            <el-button plain size="small" :icon="RefreshRight" @click="resetTalks" class="tiny-btn"/>
            <el-button plain size="small" @click="handUp" class="tiny-btn">
              <el-icon><LittleHand/></el-icon>
            </el-button>
          </div>
        </div>
        <div class="players-grid">
          <div class="players-col">
            <PlayerCard
                v-for="i in 6" :key="`p${i}`"
                :player="chatRecords[`player${String(i).padStart(2, '0')}`]"
                :player-number="String(i).padStart(2, '0')"
                :options="options" :rows="5" placement="right" compact
                @update:role="(r) => updatePlayerRole(`player${String(i).padStart(2, '0')}`, r)"
                @blur="handleBlur(`player${String(i).padStart(2, '0')}`)"
            />
          </div>
          <div class="players-col">
            <PlayerCard
                v-for="i in 6" :key="`p${i+6}`"
                :player="chatRecords[`player${String(i+6).padStart(2, '0')}`]"
                :player-number="String(i+6).padStart(2, '0')"
                :options="options" :rows="5" placement="left" compact
                @update:role="(r) => updatePlayerRole(`player${String(i+6).padStart(2, '0')}`, r)"
                @blur="handleBlur(`player${String(i+6).padStart(2, '0')}`)"
            />
          </div>
        </div>
      </div>

      <!-- 自记区 -->
      <div class="section section--notes">
        <div class="section-header">
          <span class="section-title">📋 自记信息</span>
          <div class="section-actions">
            <el-button plain size="small" :icon="RefreshRight" @click="resetRemarks" class="tiny-btn"/>
            <el-button plain size="small" :icon="Edit" @click="exportInfo" class="tiny-btn"/>
          </div>
        </div>
        <el-input v-model="remarks" type="textarea" :rows="28" placeholder="写下你的分析和推理..." @blur="handleBlur(null)"/>
      </div>
    </div>

    <el-dialog v-model="showGameSettings" title="版型设置" :close-on-click-modal="false"
               :close-on-press-escape="false" :before-close="handleSettingsClose" width="520px">
      <GameSettings ref="gameSettingsRef"/>
    </el-dialog>

    <el-dialog v-model="showExportDialog" title="导出笔记" :close-on-click-modal="false" width="520px">
      <el-input v-model="exportedInfo" type="textarea" :rows="20"/>
      <template #footer>
        <el-button type="primary" @click="copyExportedInfo">复制到剪贴板</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useBoard} from '@/composables/useBoard'
import PlayerCard from './PlayerCard.vue'
import GameSettings from './gameSettings.vue'
import {Edit, RefreshRight} from "@element-plus/icons-vue"
import LittleHand from '@/assets/little-hand.svg?component'

const {
  selectedMode, remarks, chatRecords, showExportDialog, exportedInfo,
  showGameSettings, gameSettingsRef, options,
  handleBlur, resetRemarks, resetTalks, handUp, exportInfo,
  copyExportedInfo, handleSettingsClose, openSettings, updatePlayerRole
} = useBoard()

const isFullScreen = ref(false)
const toggleFullScreen = () => {
  const el = document.documentElement
  if (!isFullScreen.value) {
    (el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen).call(el)
  } else {
    (document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen).call(document)
  }
  isFullScreen.value = !isFullScreen.value
}
</script>

<style scoped lang="scss">
.board-full {
  width: 100vw;
  min-height: 100vh;
  padding: 12px;
  background: var(--bg-primary);
}

.board-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 12px;
}

.icon-btn {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  width: 32px; height: 32px;
  font-size: 16px;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    border-color: var(--accent);
    color: var(--accent-light);
  }
}

.mode-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);

  a {
    color: var(--accent-light);
    font-weight: 600;
    &:hover { color: var(--accent); }
  }
}

.full-layout {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.section {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 14px;

  &--players { flex: 2; }
  &--notes { flex: 1; }
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.section-actions { display: flex; gap: 4px; }

.tiny-btn {
  height: 24px !important;
  width: 24px !important;
  padding: 0 !important;
}

.players-grid {
  display: flex;
  gap: 12px;
}

.players-col { flex: 1; }

:deep(.el-textarea__inner) {
  resize: none !important;
}

.section--notes :deep(.el-textarea__inner) {
  resize: vertical !important;
}
</style>