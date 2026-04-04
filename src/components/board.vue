<template>
  <div class="board" :class="{ 'is-fullscreen': isFullScreen, 'has-bg': hasBackground }">
    <!-- 顶部工具栏 -->
    <div class="toolbar">
      <button class="tool-btn" @click="goHome" title="首页">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      </button>
      <span class="toolbar-label">
        当前版型：<a href="#" @click.prevent="openSettings">{{ selectedMode ? selectedMode.name : '点击选择' }}</a>
      </span>
      <div class="toolbar-actions">
        <el-dropdown trigger="click" @command="handleBackgroundCommand">
          <button class="tool-btn" title="背景设置" style="outline: none">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          </button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="upload">上传图片</el-dropdown-item>
              <el-dropdown-item command="starry">游戏背景</el-dropdown-item>
              <el-dropdown-item command="white">纯白背景</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <button class="tool-btn fullscreen-btn" @click="toggleFullScreen" :title="isFullScreen ? '退出全屏' : '全屏模式'">
          <svg v-if="!isFullScreen" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
        </button>
      </div>
    </div>

    <!-- 版型提示条 -->
    <div class="rule-bar" v-if="showRules && modeDesc">
      <div class="rule-content">
        <span class="rule-tag">版型</span>
        <span>{{ modeDesc }}</span>
      </div>
      <button class="rule-close" @click="showRules = false">×</button>
    </div>

    <!-- 内容区 -->
    <div class="board-body">
      <!-- 自记信息 -->
      <div class="section section--notes">
        <div class="section-head">
          <span class="section-label">自记信息</span>
          <div class="section-acts">
            <button class="act-btn" @click="resetRemarks" title="重置">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.5 15.5A9 9 0 1 1 21 7.5L23 10"/></svg>
            </button>
            <button class="act-btn" @click="exportInfo" title="导出">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </button>
          </div>
        </div>
        <el-input v-model="remarks" type="textarea" :rows="notesRows" placeholder="写下你的分析和推理..." @blur="handleBlur(null)"/>
      </div>

      <!-- 发言信息 -->
      <div class="section section--players">
        <div class="section-head">
          <span class="section-label">发言信息</span>
          <div class="section-acts">
            <button class="act-btn" @click="resetTalks" title="重置">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.5 15.5A9 9 0 1 1 21 7.5L23 10"/></svg>
            </button>
            <button class="act-btn" @click="handUp" title="一键上警">
              <el-icon size="13"><LittleHand/></el-icon>
            </button>
          </div>
        </div>
        <div class="players-grid">
          <div class="players-col">
            <PlayerCard
                v-for="i in 6" :key="`p${i}`"
                :player="chatRecords[playerKey(i)]"
                :player-number="pad(i)"
                :options="options" :rows="playerRows" placement="right"
                :compact="isFullScreen"
                @update:role="(r) => updatePlayerRole(playerKey(i), r)"
                @blur="handleBlur(playerKey(i))"
            />
          </div>
          <div class="players-col">
            <PlayerCard
                v-for="i in 6" :key="`p${i+6}`"
                :player="chatRecords[playerKey(i+6)]"
                :player-number="pad(i+6)"
                :options="options" :rows="playerRows" placement="left"
                :compact="isFullScreen"
                @update:role="(r) => updatePlayerRole(playerKey(i+6), r)"
                @blur="handleBlur(playerKey(i+6))"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 对话框 -->
    <el-dialog v-model="showGameSettings" title="版型设置" :close-on-click-modal="false"
               :close-on-press-escape="false" :before-close="handleSettingsClose" width="520px"
               class="settings-dialog">
      <GameSettings ref="gameSettingsRef" @close="showGameSettings = false"/>
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
import {ref, computed, onMounted, onUnmounted} from 'vue'
import {useBoard} from '@/composables/useBoard'
import {useBackground} from '@/composables/useBackground'
import PlayerCard from './PlayerCard.vue'
import GameSettings from './gameSettings.vue'
import LittleHand from '@/assets/little-hand.svg?component'
const emit = defineEmits(['go-home'])
const {uploadBackground, clearBackground, setDefaultStarry, backgroundImage} = useBackground()
const hasBackground = computed(() => !!backgroundImage.value)

const showRules = ref(true)

const handleBackgroundCommand = (cmd) => {
  if (cmd === 'upload') uploadBackground()
  else if (cmd === 'starry') setDefaultStarry()
  else if (cmd === 'white') clearBackground()
}

const {
  selectedMode, remarks, chatRecords, showExportDialog, exportedInfo,
  showGameSettings, gameSettingsRef, options, modeDesc,
  handleBlur, resetRemarks, resetTalks, handUp, exportInfo,
  copyExportedInfo, handleSettingsClose, openSettings, updatePlayerRole
} = useBoard()

// 工具函数
const pad = (n) => String(n).padStart(2, '0')
const playerKey = (n) => `player${pad(n)}`

// 全屏管理
const isFullScreen = ref(false)

const toggleFullScreen = () => {
  if (!isFullScreen.value) {
    const el = document.documentElement
    if (el.requestFullscreen) el.requestFullscreen()
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen()
  } else {
    if (document.exitFullscreen) document.exitFullscreen()
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen()
  }
}

const handleFsChange = () => {
  isFullScreen.value = !!document.fullscreenElement
}

onMounted(() => document.addEventListener('fullscreenchange', handleFsChange))
onUnmounted(() => document.removeEventListener('fullscreenchange', handleFsChange))

// 自适应行数
const notesRows = computed(() => isFullScreen.value ? 28 : 3)
const playerRows = computed(() => isFullScreen.value ? 5 : 3)

const goHome = () => emit('go-home')
</script>

<style scoped lang="scss">
.board {
  width: 100%;
  max-width: 920px;
  margin: 0 auto;
  padding: 16px;
}

/* ---- 工具栏 ---- */
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  padding: 0 2px;
}

.toolbar-label {
  font-size: 13px;
  color: var(--text-secondary);
  a {
    color: var(--text-primary);
    font-weight: 600;
    &:hover { text-decoration: underline; }
  }
}

.toolbar-actions { display: flex; gap: 4px; }

/* ---- 版型提示 ---- */
.rule-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(88, 86, 214, 0.08);
  border: 1px solid rgba(88, 86, 214, 0.15);
  border-radius: 10px;
  padding: 8px 14px;
  margin-bottom: 12px;
  font-size: 12px;
  color: #5856d6;
}

.rule-content {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.rule-tag {
  background: #5856d6;
  color: white;
  padding: 1px 8px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 11px;
  flex-shrink: 0;
}

.rule-close {
  border: none;
  background: none;
  font-size: 18px;
  color: #5856d6;
  cursor: pointer;
  padding: 0 4px;
  opacity: 0.6;
  &:hover { opacity: 1; }
}

.tool-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px; height: 30px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: var(--bg-card);
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--transition);
  &:hover { border-color: var(--border-hover); color: var(--text-primary); box-shadow: var(--shadow-sm); }
  &--danger:hover { color: #e55; border-color: rgba(238,85,85,0.3); }
}

/* ---- 区域卡片 ---- */
.section {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 14px 16px;
  margin-bottom: 12px;
  box-shadow: var(--shadow-sm);
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.section-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
}

.section-acts { display: flex; gap: 4px; }

.act-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px; height: 26px;
  border: none;
  border-radius: 5px;
  background: var(--bg-input);
  color: var(--text-muted);
  cursor: pointer;
  transition: var(--transition);
  &:hover { background: #e8e8ed; color: var(--text-primary); }
}

/* ---- 玩家网格 ---- */
.players-grid { display: flex; gap: 14px; }
.players-col { flex: 1; }

/* ---- 全屏模式 ---- */
.is-fullscreen {
  max-width: 100%;
  padding: 10px;
  height: 100vh !important; /* Force to take full vertical viewport */
  display: flex;
  flex-direction: column;
  background: var(--bg-primary);

  .board-body {
    flex-direction: row;
    gap: 12px;
    flex: 1;
    min-height: 0; /* Enable flex child shrinking */
  }

  .section {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .section--notes {
    order: 2;
    flex: 1;
    margin-bottom: 0;
  }

  .section--players {
    order: 1;
    flex: 2;
  }

  .players-grid {
    flex: 1;
    min-height: 0;
    height: 100%; /* Force height inheritance */
  }

  .players-col {
    display: flex;
    flex-direction: column;
    gap: 8px; /* Use gap so we can remove margin */
    height: 100%; /* Ensure column stretches */
  }

  :deep(.player-card) {
    flex: 1;
    margin-bottom: 0 !important;
  }
  :deep(.player-right) {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  :deep(.player-right .el-mention),
  :deep(.player-right .el-textarea) {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  :deep(.player-right .el-textarea__inner) {
    flex: 1;
  }

  .section--notes :deep(.el-textarea) {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .section--notes :deep(.el-textarea__inner) {
    flex: 1;
    resize: none !important;
  }
}

.board-body {
  display: flex;
  flex-direction: column;
}

:deep(.el-textarea__inner) {
  resize: none !important;
  border-radius: var(--radius-sm);
}

@media (max-width: 768px) {
  .board { padding: 10px; }
  .players-grid { gap: 6px; }
  .section { padding: 10px 12px; }
}

/* ---- 有背景图时的毛玻璃效果 ---- */
.has-bg {
  .toolbar {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: var(--radius-sm);
    padding: 6px 10px;
    margin-bottom: 10px;
    border: 1px solid rgba(255, 255, 255, 0.4);
  }

  .section {
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
  }

  .tool-btn {
    background: rgba(255, 255, 255, 0.6);
    border-color: rgba(255, 255, 255, 0.4);
  }

  .act-btn {
    background: rgba(255, 255, 255, 0.5);
  }

  :deep(.el-textarea__inner) {
    background: rgba(255, 255, 255, 0.5) !important;
    border-color: rgba(255, 255, 255, 0.4) !important;
  }
}

@media (max-width: 600px) {
  .fullscreen-btn {
    display: none !important;
  }
}
</style>