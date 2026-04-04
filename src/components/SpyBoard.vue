<template>
  <div class="spy-board" :class="{ 'has-bg': hasBackground }">
    <!-- 顶部工具栏 -->
    <div class="toolbar">
      <button class="tool-btn" @click="$emit('go-home')" title="首页">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      </button>
      <span class="toolbar-label">谁是卧底 · <b>8人场</b></span>
      <div class="toolbar-actions">
        <!-- 切换视图按钮 -->
        <button class="tool-btn" @click="toggleView" :title="viewMode === 'timeline' ? '切换至：宫格(聚合)视角' : '切换至：气泡(编辑)视角'">
          <svg v-if="viewMode === 'timeline'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
        </button>
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
      </div>
    </div>

    <!-- 版型提示条 -->
    <div class="rule-bar" v-if="showRules">
      <div class="rule-content">
        <span class="rule-tag">版型</span>
        <span>2狼人·5平民·1天使</span>
      </div>
      <button class="rule-close" @click="showRules = false">×</button>
    </div>

    <!-- 顶栏：玩家身份标记区 -->
    <div v-show="viewMode === 'timeline'" class="roles-bar section">
      <div class="section-head">
        <span class="section-label">玩家身份标记</span>
        <div class="section-acts">
           <button class="act-btn" @click="resetRoles" title="重置身份">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.5 15.5A9 9 0 1 1 21 7.5L23 10"/></svg>
          </button>
        </div>
      </div>
      <div class="roles-container">
        <div class="role-item" v-for="i in 8" :key="i">
          <div class="role-number">{{ i }}号</div>
          <div class="spy-role" :class="getRoleClass(roles[i-1])" @click="cycleRole(i-1)" title="点击切换身份">
            {{ roles[i-1] || '?' }}
          </div>
        </div>
      </div>
    </div>

    <!-- 自记信息 -->
    <div class="section section--notes">
      <div class="section-head">
        <span class="section-label">自记推理</span>
        <div class="section-acts">
          <button class="act-btn" @click="resetNotes" title="重置">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.5 15.5A9 9 0 1 1 21 7.5L23 10"/></svg>
          </button>
        </div>
      </div>
      <el-input v-model="notes" type="textarea" :rows="2" placeholder="记录你的推理和分析..." @blur="saveAll"/>
    </div>

    <!-- 核心区 -->
    <div class="section section--chat">
      <div class="section-head">
        <span class="section-label">{{ viewMode === 'timeline' ? '发言记录（序列排版）' : '发言记录（网格视图聚合）' }}</span>
        <div class="section-acts">
          <button class="act-btn" @click="exportInfo" title="一键导出笔记">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          </button>
          <button class="act-btn" @click="resetTalks" title="清空所有发言记录">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.5 15.5A9 9 0 1 1 21 7.5L23 10"/></svg>
          </button>
          <button class="act-btn" v-show="viewMode === 'timeline'" @click="addDivider" title="添加新一发(分天)">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>
      </div>
      
      <!-- 气泡视角（支持拖拽编辑） -->
      <template v-if="viewMode === 'timeline'">
        <div class="chat-list" ref="chatListRef">
          <div class="chat-empty" v-if="speeches.length === 0">
            暂无发言。请点击下方号码牌添加。
          </div>
          <div v-for="(speech, index) in speeches" :key="speech.id" :data-uid="speech.id"
               :class="[speech.isDivider ? 'chat-divider' : 'chat-message', { 'is-dragging': draggedIndex === index }]"
               :draggable="dragEnabledIndex === index"
               @dragstart="onDragStart($event, index)"
               @dragenter="onDragEnter($event, index)"
               @dragover.prevent
               @dragend="onDragEnd"
               @drop.prevent>

            <template v-if="speech.isDivider">
              <div class="divider-line"></div>
              <span class="divider-text"
                    @mousedown="dragEnabledIndex = index"
                    @mouseup="dragEnabledIndex = -1"
                    @mouseleave="dragEnabledIndex = -1"
                    @touchstart.prevent="onTouchStart($event, index)"
                    @touchmove.prevent="onTouchMove"
                    @touchend="onTouchEnd"
                    @touchcancel="onTouchEnd"
                    title="按住此处拖拽排序"
                    style="cursor: grab;">{{ speech.text }}</span>
              <div class="divider-line"></div>
              <button class="chat-delete divider-delete" @click="removeSpeech(index)" title="删除此分割线">×</button>
            </template>

            <template v-else>
              <div class="chat-avatar"
                   @mousedown="dragEnabledIndex = index"
                   @mouseup="dragEnabledIndex = -1"
                   @mouseleave="dragEnabledIndex = -1"
                   @touchstart.prevent="onTouchStart($event, index)"
                   @touchmove.prevent="onTouchMove"
                   @touchend="onTouchEnd"
                   @touchcancel="onTouchEnd"
                   title="按住此处拖拽排序"
                   style="cursor: grab;">
                <div class="avatar-num">{{ speech.playerId }}</div>
                <div class="avatar-role" v-if="roles[speech.playerId-1]" :class="getRoleClass(roles[speech.playerId-1])">
                  {{ roles[speech.playerId-1] }}
                </div>
              </div>
              <div class="chat-content">
                <el-input 
                  v-model="speech.text" 
                  type="textarea" 
                  autosize
                  placeholder="发言内容..." 
                  @blur="saveAll"
                  :ref="el => setSpeechRef(el, speech.id)"
                />
              </div>
              <button class="chat-delete" @click="removeSpeech(index)" title="删除此记录">×</button>
            </template>
          </div>
        </div>

        <!-- 快捷发言槽 -->
        <div class="quick-add-bar">
          <button 
            v-for="i in 8" :key="'add'+i" 
            class="quick-add-btn" 
            @click="addSpeech(i)">
            {{ i }}号
          </button>
        </div>
      </template>

      <!-- 宫格视角（聚合信息仅供浏览） -->
      <template v-else>
        <div class="players-grid">
          <div class="spy-card" v-for="i in 8" :key="'grid'+i">
            <div class="spy-card-left">
              <div class="spy-badge">{{ i }}</div>
              <div class="spy-role" :class="getRoleClass(roles[i-1])" @click="cycleRole(i-1)">
                {{ roles[i-1] || '?' }}
              </div>
            </div>
            <div class="spy-card-right">
              <div class="grid-summary-box">
                <div v-if="gridSummary[i-1]" style="white-space: pre-wrap; line-height: 1.4;">{{ gridSummary[i-1] }}</div>
                <div v-else class="summary-empty">暂无发言</div>
              </div>
            </div>
          </div>
        </div>
        <div style="text-align: center; font-size: 11px; color: #aeaeb2; margin-top: 12px;">注：此宫格为只读聚合视图。若要编辑删改，请切回气泡编辑模式。</div>
      </template>

    </div>

    <!-- 导出对话框 -->
    <el-dialog v-model="showExport" title="导出笔记" :close-on-click-modal="false" width="520px">
      <el-input v-model="exportText" type="textarea" :rows="16" readonly/>
      <template #footer>
        <el-button type="primary" @click="copyExport">复制到剪贴板</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {ref, reactive, onMounted, watch, computed, nextTick} from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus'
import {useBackground} from '@/composables/useBackground'

defineEmits(['go-home'])

// 卧底模式独有背景（默认为纯白）
const {uploadBackground, clearBackground, setDefaultStarry, backgroundImage} = useBackground('spy')
const hasBackground = computed(() => !!backgroundImage.value)

const handleBackgroundCommand = (cmd) => {
  if (cmd === 'upload') uploadBackground()
  else if (cmd === 'starry') setDefaultStarry() 
  else if (cmd === 'white') clearBackground()
}

const showRules = ref(true)
const notes = ref('')
const showExport = ref(false)
const exportText = ref('')

const viewMode = ref('timeline') // 'timeline' 或 'grid'
const toggleView = () => {
  viewMode.value = viewMode.value === 'timeline' ? 'grid' : 'timeline'
}

const ROLE_CYCLE = ['', '民', '狼', '天', '你', 'X']

// 玩家身份列表：索引 0-7 对应 1-8 号
const roles = reactive(Array(8).fill(''))
// 发言列表：[{id: 唯一的标识, playerId: 玩家号1-8, text: 内容, isDivider: boolean}]
const speeches = reactive([])

// 获取DOM引用以实现自动聚焦
const speechInputRefs = ref({})
const setSpeechRef = (el, id) => {
  if (el) speechInputRefs.value[id] = el
}
const chatListRef = ref(null)

/* --- 拖拽重排逻辑 --- */
const dragEnabledIndex = ref(-1)
const draggedIndex = ref(-1)

const onDragStart = (event, index) => {
  draggedIndex.value = index
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('text/plain', index) // Firefox 兼容
}

const onDragEnter = (event, index) => {
  if (draggedIndex.value !== -1 && draggedIndex.value !== index) {
    const item = speeches[draggedIndex.value]
    speeches.splice(draggedIndex.value, 1)
    speeches.splice(index, 0, item)
    draggedIndex.value = index
  }
}

const onDragEnd = () => {
  draggedIndex.value = -1
  dragEnabledIndex.value = -1
  saveAll()
}

/* --- 移动端触屏拖拽重排逻辑 --- */
const onTouchStart = (event, index) => {
  draggedIndex.value = index
  dragEnabledIndex.value = index
  document.body.style.overflow = 'hidden' // 防止拖拽时屏幕跟着滑
}

const onTouchMove = (event) => {
  if (draggedIndex.value === -1) return
  const touch = event.touches[0]
  const target = document.elementFromPoint(touch.clientX, touch.clientY)
  if (!target) return
  
  const dropElement = target.closest('[data-uid]')
  if (dropElement) {
    const uid = parseInt(dropElement.getAttribute('data-uid'), 10)
    const hoverIndex = speeches.findIndex(s => s.id === uid)
    if (hoverIndex !== -1 && hoverIndex !== draggedIndex.value) {
      const item = speeches[draggedIndex.value]
      speeches.splice(draggedIndex.value, 1)
      speeches.splice(hoverIndex, 0, item)
      draggedIndex.value = hoverIndex
    }
  }
}

const onTouchEnd = () => {
  draggedIndex.value = -1
  dragEnabledIndex.value = -1
  document.body.style.overflow = ''
  saveAll()
}

/* --- 宫格模式数据聚合逻辑 --- */
const gridSummary = computed(() => {
  const result = Array(8).fill('')
  let roundIdx = 1
  speeches.forEach(s => {
    if (s.isDivider) {
      roundIdx++
    } else if (s.text && s.text.trim() !== '') {
      const idx = s.playerId - 1
      if(result[idx]) result[idx] += '\n'
      result[idx] += `D${roundIdx}: ${s.text.trim()}`
    }
  })
  return result
})

// 持久化改版
const STORAGE_KEY = 'spyBoardData_v2'
const OLD_STORAGE_KEY = 'spyBoardData' 

const saveAll = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    notes: notes.value,
    roles: Array.from(roles),
    speeches: Array.from(speeches)
  }))
}

onMounted(() => {
  localStorage.removeItem(OLD_STORAGE_KEY)
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw) {
    try {
      const data = JSON.parse(raw)
      notes.value = data.notes || ''
      if (data.roles) {
        data.roles.forEach((r, i) => roles[i] = r)
      }
      if (data.speeches) {
        speeches.length = 0
        speeches.push(...data.speeches)
      }
    } catch (e) { /* ignore */ }
  }
})

watch([notes, roles, speeches], saveAll, {deep: true})

const cycleRole = (idx) => {
  const cur = roles[idx]
  const ci = ROLE_CYCLE.indexOf(cur)
  roles[idx] = ROLE_CYCLE[(ci + 1) % ROLE_CYCLE.length]
}

const getRoleClass = (role) => {
  if (role === '狼') return 'role--wolf'
  if (role === '天') return 'role--angel'
  if (role === '民') return 'role--civil'
  if (role === '你') return 'role--you'
  if (role === 'X') return 'role--dead'
  return ''
}

const addDivider = async () => {
  const id = Date.now()
  speeches.push({ id, isDivider: true, text: '下一轮发言' })
  await nextTick()
  if (chatListRef.value) {
    chatListRef.value.scrollTop = chatListRef.value.scrollHeight
  }
}

const addSpeech = async (playerId) => {
  const id = Date.now()
  speeches.push({ id, playerId, text: '' })
  
  await nextTick()
  if (chatListRef.value) {
    chatListRef.value.scrollTop = chatListRef.value.scrollHeight
  }
  const inputEl = speechInputRefs.value[id]
  if (inputEl) {
    inputEl.focus()
  }
}

const removeSpeech = (index) => {
  speeches.splice(index, 1)
}

const resetRoles = () => {
  ElMessageBox.confirm('确定要重置所有玩家身份标记吗？', '重置确认', {
    confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', center: true,
  }).then(() => {
    for (let i = 0; i < 8; i++) roles[i] = ''
    ElMessage({type: 'success', message: '身份已重置', duration: 500})
  }).catch(() => {})
}

const resetNotes = () => {
  ElMessageBox.confirm('确定要重置自记信息吗？', '重置确认', {
    confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', center: true,
  }).then(() => {
    notes.value = ''
    ElMessage({type: 'success', message: '已重置', duration: 500})
  }).catch(() => {})
}

const resetTalks = () => {
  ElMessageBox.confirm('确定要清空所有发言记录吗？', '清空确认', {
    confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', center: true,
  }).then(() => {
    speeches.length = 0
    ElMessage({type: 'success', message: '发言已清空', duration: 500})
  }).catch(() => {})
}

const exportInfo = () => {
  let info = `【谁是卧底 · 8人场笔记】\n`
  info += `─────────────\n`
  info += `自记推理：\n${notes.value.trim() || '（无）'}\n`
  info += `─────────────\n`
  info += `全局身份：\n`
  
  const roleMap = {'民': '平民', '狼': '狼人', '天': '天使', '你': '自己', 'X': '出局', '': '未知'}
  let roleStr = ''
  for (let i = 0; i < 8; i++) {
    roleStr += `[${i+1}号: ${roleMap[roles[i]]}] `
  }
  info += roleStr + `\n`
  
  info += `─────────────\n`
  info += `发言流水：\n`
  if (speeches.length === 0) {
    info += `（暂无记录）\n`
  } else {
    speeches.forEach((s) => {
      if (s.isDivider) {
        info += `\n--- ${s.text} ---\n`
      } else {
        let roleTag = roles[s.playerId-1] ? `(${roleMap[roles[s.playerId-1]]})` : ''
        info += `${s.playerId}号${roleTag}说：${s.text.trim()}\n`
      }
    })
  }

  exportText.value = info.trim()
  showExport.value = true
}

const copyExport = () => {
  navigator.clipboard.writeText(exportText.value).then(() => {
    ElMessage({message: '已复制到剪贴板', type: 'success', duration: 2000})
    showExport.value = false
  }).catch(() => {
    ElMessage({message: '复制失败，请手动复制', type: 'error', duration: 2000})
  })
}
</script>

<style scoped lang="scss">
.spy-board {
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* ---- 工具栏 ---- */
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px;
}

.toolbar-label {
  font-size: 14px;
  color: var(--text-secondary);
  b { color: var(--text-primary); font-weight: 600; }
}

.toolbar-actions { display: flex; gap: 6px; }

.tool-btn {
  width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  border: none; border-radius: 8px;
  background: var(--bg-input);
  color: var(--text-muted);
  cursor: pointer;
  transition: var(--transition);
  &:hover { background: #e8e8ed; color: var(--text-primary); }
}

/* ---- 规则提示 ---- */
.rule-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(88, 86, 214, 0.08);
  border: 1px solid rgba(88, 86, 214, 0.15);
  border-radius: 10px;
  padding: 8px 14px;
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

/* ---- 内容卡片通用 ---- */
.section {
  background: rgba(255,255,255,0.72);
  backdrop-filter: blur(16px);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 14px;
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.section-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.section-acts { display: flex; gap: 6px; }

.act-btn {
  width: 26px; height: 26px;
  display: flex; align-items: center; justify-content: center;
  border: none; border-radius: 6px;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  transition: var(--transition);
  &:hover { background: #e8e8ed; color: var(--text-primary); }
}

/* ---- 身份区 ---- */
.roles-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
}

.role-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex: 1;
  min-width: 40px;
}

.role-number {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
}

.spy-role {
  width: 32px; height: 32px;
  line-height: 32px;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  color: white;
  background: #c8c8c8;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  user-select: none;

  &:hover { transform: scale(1.05); }

  &.role--wolf { background: #770e3a; }
  &.role--civil { background: #2c779a; }
  &.role--angel { background: #b89534; }
  &.role--you { background: #9c27b0; }
  &.role--dead { background: #555; }
}


/* ---- 聊天流区 (气泡样式) ---- */
.section--chat {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.chat-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 48vh;
  overflow-y: auto;
  padding: 4px 4px 16px 4px;

  /* 自定义滚动条 */
  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-thumb { background: #d0d0d5; border-radius: 3px; }
  &::-webkit-scrollbar-track { background: transparent; }
}

.chat-empty {
  text-align: center;
  color: var(--text-muted);
  font-size: 13px;
  padding: 24px 0;
}

.chat-message {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  animation: fadeIn 0.2s ease-out;
  transition: opacity 0.2s;
  &.is-dragging {
    opacity: 0.3;
  }
}

.chat-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 12px 0 8px 0;
  gap: 12px;
  animation: fadeIn 0.2s ease-out;
  position: relative;
  transition: opacity 0.2s;
  &.is-dragging {
    opacity: 0.3;
  }
}

.divider-line {
  flex-grow: 1;
  height: 1px;
  background: var(--border-color);
  opacity: 0.6;
}

.divider-text {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
  background: rgba(255,255,255,0.4);
  padding: 2px 10px;
  border-radius: 10px;
  /* 允许在按下时防止文字被选中 */
  user-select: none;
}

.divider-delete {
  position: absolute;
  right: 0;
  opacity: 0;
}
.chat-divider:hover .divider-delete {
  opacity: 1;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

.chat-avatar {
  position: relative;
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  /* 防止拖动把头像当图片选中 */
  user-select: none; 
}

.avatar-num {
  width: 100%; height: 100%;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; color: var(--text-primary);
  font-size: 16px;
}

.avatar-role {
  position: absolute;
  left: 50%; bottom: -8px; transform: translateX(-50%);
  padding: 0 4px; height: 16px; min-width: 28px;
  line-height: 14px; text-align: center;
  font-size: 10px; font-weight: 500; color: white;
  border-radius: 8px;
  background: #c8c8c8;
  border: 1px solid var(--bg-primary);
  white-space: nowrap;
  letter-spacing: 1px;
  text-indent: 1px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  
  &.role--wolf { background: #770e3a; }
  &.role--civil { background: #2c779a; }
  &.role--angel { background: #b89534; }
  &.role--you { background: #9c27b0; }
  &.role--dead { background: #555; }
}

.has-bg .avatar-role {
  border-color: #f2f2f5; 
}

.chat-content {
  flex-grow: 1;
  background: var(--bg-primary);
  border-radius: 12px;
  border-top-left-radius: 2px; /* 气泡的尾巴视觉效果 */
  position: relative;
  border: 1px solid rgba(0,0,0,0.04);
  box-shadow: 0 1px 3px rgba(0,0,0,0.02);

  :deep(.el-textarea__inner) {
    background: transparent;
    border: none;
    box-shadow: none;
    padding: 10px 12px;
    font-size: 14px;
    resize: none !important;
    &:focus { outline: none; }
  }
}

.chat-delete {
  padding: 4px;
  background: transparent; border: none;
  font-size: 18px; color: #d1d1d6;
  cursor: pointer;
  align-self: center;
  transition: 0.2s;
  &:hover { color: #ff3b30; }
}

/* ---- 快速加言条 ---- */
.quick-add-bar {
  margin-top: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding-top: 12px;
  border-top: 1px dashed var(--border-color);
}

.quick-add-btn {
  background: #5856d6;
  color: white;
  border: none;
  border-radius: 16px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  &:hover { background: #6e6ceb; transform: translateY(-1px); }
  &:active { transform: translateY(0); }
}

/* ---- 玩家网格 (宫格式预览) ---- */
.players-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, auto);
  grid-auto-flow: column;
  gap: 10px 14px;
  margin-top: 10px;
}

.spy-card {
  display: flex;
  height: 100%;
}

.spy-card-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 34px;
  margin-right: 8px;
  flex-shrink: 0;
}

.spy-badge {
  font-size: 11px;
  font-weight: 600;
  margin: 0 0 4px;
  width: 22px; height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  background: var(--bg-input);
  border: 1px solid var(--border-color);
}

.spy-card-right {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.grid-summary-box {
  flex-grow: 1;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: 8px 10px;
  min-height: 60px;
  font-size: 13px;
  color: var(--text-primary);
  box-sizing: border-box;
}

.summary-empty {
  color: var(--text-muted);
  font-style: italic;
  font-size: 13px;
  text-align: center;
  margin-top: 8px;
}

/* ---- 背景图时的特殊样式 ---- */
.has-bg {
  .section {
    background: rgba(255, 255, 255, 0.45);
    border-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(20px);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  }
  
  .chat-content,
  .grid-summary-box {
    background: rgba(255, 255, 255, 0.45);
    border-color: rgba(255, 255, 255, 0.3);
  }

  :deep(.el-textarea__inner) {
    color: var(--text-primary);
  }
}

/* ---- 手机端适配 ---- */
@media (max-width: 768px) {
  .spy-board { padding: 10px; }
  
  .roles-container { gap: 4px; flex-wrap: nowrap; overflow-x: auto; padding-bottom: 2px; }
  .role-item { min-width: 0; flex-shrink: 0; }
  .spy-role { width: 28px; height: 28px; line-height: 28px; font-size: 12px; }
  
  .chat-avatar { width: 32px; height: 32px; }
  .avatar-num { font-size: 14px; }
  .spy-card-left { width: 28px; margin-right: 5px; }
  .spy-badge { font-size: 9px; width: 18px; height: 18px; }
  
  .quick-add-bar { flex-wrap: nowrap; overflow-x: auto; gap: 6px; padding-bottom: 4px; }
  .quick-add-btn { flex-shrink: 0; padding: 6px 10px; font-size: 12px; }
}
</style>
