<template>
  <div class="outBox">
    <div class="note note-top">
      <h2>自记信息
        <el-button
            plain
            type="primary"
            @click="resetRemarks"
            size="small"
            :icon="RefreshRight"
            class="reset-button"/>
        <el-button
            plain
            type="primary"
            @click="exportInfo"
            size="small"
            :icon="Edit"
            class="reset-button"/>
      </h2>
      <el-input
          v-model="remarks"
          type="textarea"
          class="note-textarea"
          :rows="4"
          placeholder="请输入自记信息"
          @blur="handleBlur(null)"
      />
    </div>
    <div class="note">
      <h2>发言信息
        <el-button
            plain
            type="primary"
            @click="resetTalks"
            size="small"
            :icon="RefreshRight"
            class="reset-button"/>
        <el-button
            plain
            type="primary"
            @click="handUp"
            size="small"
            class="reset-button">
          <el-icon>
            <LittleHand/>
          </el-icon>
        </el-button>
      </h2>
      <div class="players-container">
        <div class="players-column">
          <div v-for="i in 6" :key="`player${i}`" class="player-item">
            <div class="messageInfo">
              <div class="messageInfo-left">
                <img
                    :src="getElectionImage(chatRecords[`player${String(i).padStart(2, '0')}`].election)"
                    :alt="getElectionAlt(chatRecords[`player${String(i).padStart(2, '0')}`].election)"
                    :title="getElectionAlt(chatRecords[`player${String(i).padStart(2, '0')}`].election)"
                    @click="toggleElection(chatRecords[`player${String(i).padStart(2, '0')}`])"
                >
                <div class="player-number">{{ String(i).padStart(2, '0') }}</div>
                <RoleSelector
                    :currentRole="chatRecords[`player${String(i).padStart(2, '0')}`].sign"
                    @update:role="(newRole) => updatePlayerRole(`player${String(i).padStart(2, '0')}`, newRole)"
                    placement="right"
                />
              </div>
              <div class="messageInfo-right">
                <el-mention
                    v-model="chatRecords[`player${String(i).padStart(2, '0')}`].message"
                    type="textarea"
                    class="note-textarea"
                    :rows="3"
                    :placeholder="`请输入${i}号玩家发言信息`"
                    :prefix="['A','C']"
                    :options="options"
                    @blur="handleBlur(`player${String(i).padStart(2, '0')}`)"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="players-column">
          <div v-for="i in 6" :key="`player${i+6}`" class="player-item">
            <div class="messageInfo">
              <div class="messageInfo-left">
                <img
                    :src="getElectionImage(chatRecords[`player${String(i+6).padStart(2, '0')}`].election)"
                    :alt="getElectionAlt(chatRecords[`player${String(i+6).padStart(2, '0')}`].election)"
                    :title="getElectionAlt(chatRecords[`player${String(i+6).padStart(2, '0')}`].election)"
                    @click="toggleElection(chatRecords[`player${String(i+6).padStart(2, '0')}`])"
                >
                <div class="player-number">{{ String(i + 6).padStart(2, '0') }}</div>
                <RoleSelector
                    :currentRole="chatRecords[`player${String(i+6).padStart(2, '0')}`].sign"
                    @update:role="(newRole) => updatePlayerRole(`player${String(i+6).padStart(2, '0')}`, newRole)"
                    placement="left"
                />
              </div>
              <div class="messageInfo-right">
                <el-mention
                    v-model="chatRecords[`player${String(i+6).padStart(2, '0')}`].message"
                    type="textarea"
                    class="note-textarea"
                    :rows="3"
                    :placeholder="`请输入${i+6}号玩家发言信息`"
                    :prefix="['A','C']"
                    :options="options"
                    @blur="handleBlur(`player${String(i+6).padStart(2, '0')}`)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
        v-model="showSettings"
        title="版型设置"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :before-close="handleSettingsClose"
        class="settings-dialog"
    >
      <GameSettings ref="gameSettingsRef" @update-config="updateConfig"/>
    </el-dialog>
  </div>
  <el-dialog
      v-model="showExportDialog"
      title="导出信息"
      :close-on-click-modal="false"
      class="export-dialog"
  >
    <el-input
        v-model="exportedInfo"
        type="textarea"
        :rows="24"
        class="export-textarea"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="copyExportedInfo">
          复制到剪贴板
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {ref, computed, watch, onMounted} from 'vue'
import handUpImage from '@/assets/hand-up.svg?url'
import handDownImage from '@/assets/hand-down.svg?url'
import handOffImage from '@/assets/hand-off.svg?url'
import RoleSelector from './RoleSelector.vue'
import GameSettings from './GameSettings.vue'
import {Edit, RefreshRight} from "@element-plus/icons-vue"
import LittleHand from '@/assets/little-hand.svg?component'
import {ElMessage, ElMessageBox} from 'element-plus'
import {useGameModeStore} from '@/stores/gameModeStore'
import {storeToRefs} from 'pinia'

const store = useGameModeStore()
const {selectedMode} = storeToRefs(store)

// 自记信息
const remarks = ref('')

// 发言信息
const chatRecords = ref(
    Object.fromEntries(
        Array.from({length: 12}, (_, i) => {
          const playerKey = `player${String(i + 1).padStart(2, '0')}`;
          return [playerKey, {
            election: 3,//上警信息 0-init,1-警上刚手,2-警上放手,3-警下
            flag: true,//是否存在 后续如果加入非12人场预留属性
            message: '',//发言信息
            sign: '',//标记信息 如'狼','民'
            status: 1,//存活状态 1-存活,2-放逐出局,3-其他死亡
          }];
        })
    )
);

// 新增：导出信息相关的响应式变量
const showExportDialog = ref(false)
const exportedInfo = ref('')

const options = computed(() => {
  return selectedMode.value ? selectedMode.value.phrases : []
})

const showSettings = ref(false)
const gameSettingsRef = ref(null)

onMounted(() => {
  // 从 localStorage 加载数据
  const savedRemarks = localStorage.getItem('remarks')
  if (savedRemarks) {
    remarks.value = savedRemarks
  }

  const savedChatRecords = localStorage.getItem('chatRecords')
  if (savedChatRecords) {
    Object.assign(chatRecords.value, JSON.parse(savedChatRecords))
  }
})

// 处理输入框失去焦点时的修剪函数
const handleBlur = (key) => {
  const player = chatRecords.value[key]
  player.message = player.message.trim()
  remarks.value = remarks.value.trim()
}

// 监听数据变化并保存到 localStorage
watch(remarks, (newValue) => {
  localStorage.setItem('remarks', newValue)
}, {deep: true})

watch(chatRecords, (newValue) => {
  localStorage.setItem('chatRecords', JSON.stringify(newValue))
}, {deep: true})

const updatePlayerRole = (playerKey, newRole) => {
  chatRecords.value[playerKey].sign = newRole
}

function getElectionImage(election) {
  switch (election) {
    case 1:
      return handUpImage;
    case 2:
      return handDownImage;
    case 3:
      return handOffImage;
    default:
      return handOffImage;
  }
}

function getElectionAlt(election) {
  switch (election) {
    case 1:
      return '警上刚手';
    case 2:
      return '警上放手';
    case 3:
      return '警下';
    default:
      return '警下';
  }
}

function toggleElection(player) {
  player.election = (player.election % 3) + 1;
}

// 重置自记信息
const resetRemarks = () => {
  ElMessageBox.confirm(
      '确定要重置自记信息吗？',
      '重置自记信息',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      }
  )
      .then(() => {
        remarks.value = ''
        ElMessage({
          type: 'success',
          message: '自记信息已重置',
          duration: 500
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消重置',
          duration: 500
        })
      })
}

// 重置发言信息
const resetTalks = () => {
  ElMessageBox.confirm(
      '确定要重置所有玩家的发言内容吗？',
      '重置发言信息',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      }
  )
      .then(() => {
        Object.keys(chatRecords.value).forEach(key => {
          chatRecords.value[key].message = ''
          chatRecords.value[key].sign = ''
          chatRecords.value[key].election = 3 // 重置为默认状态3
        })
        ElMessage({
          type: 'success',
          message: '所有发言信息已重置',
          duration: 500
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消重置',
          duration: 500
        })
      })
}

// 一键上警
const handUp = () => {
  ElMessageBox.confirm(
      '确定要使所有玩家更新为上警举手状态吗？',
      '一键上警',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      }
  )
      .then(() => {
        Object.keys(chatRecords.value).forEach(key => {
          chatRecords.value[key].election = 1
        })
        ElMessage({
          type: 'success',
          message: '所有玩家已更新为上警状态',
          duration: 500
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消更新',
          duration: 500
        })
      })
}

// 导出完整笔记信息
const exportInfo = () => {
  let info = `版型：${selectedMode.value ? selectedMode.value.name : '未选择'}\n`
  info += `◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆\n`
  info += `自记信息：\n${remarks.value.trim()}\n`
  info += `◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆\n`

  const upPlayers = Object.entries(chatRecords.value)
      .filter(([_, record]) => record.election === 1 || record.election === 2)
      .map(([key, _]) => key.slice(-2))

  const downPlayers = Object.entries(chatRecords.value)
      .filter(([_, record]) => record.election === 3)
      .map(([key, _]) => key.slice(-2))

  if (upPlayers.length > 0) {
    if (upPlayers.length === 12) {
      info += `全员上警\n`
    } else {
      info += `警上：[${upPlayers.join(',')}]\n`
      info += `警下：[${downPlayers.join(',')}]\n`
    }
    info += `◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆\n`
  }

  info += `发言信息：\n`

  const allDown = downPlayers.length === 12

  Object.entries(chatRecords.value).forEach(([key, record]) => {
    const playerNumber = key.slice(-2)
    let electionSymbol = ''
    if (!allDown) {
      electionSymbol = (record.election === 1 || record.election === 2) ? '*' : '_'
    }
    const messageLines = record.message.split('\n')
    if (messageLines.length > 0) {
      info += `[${playerNumber}]${electionSymbol} ${messageLines[0]}\n`
      for (let i = 1; i < messageLines.length; i++) {
        info += `   \t ${messageLines[i]}\n`
      }
    }
  })

  exportedInfo.value = info.trim()
  showExportDialog.value = true
}

const copyExportedInfo = () => {
  navigator.clipboard.writeText(exportedInfo.value).then(() => {
    ElMessage({
      message: '信息已复制到剪贴板',
      type: 'success',
      duration: 2000
    })
    showExportDialog.value = false
  }).catch(() => {
    ElMessage({
      message: '复制失败，请手动复制',
      type: 'error',
      duration: 2000
    })
  })
}

const handleSettingsClose = (done) => {
  if (gameSettingsRef.value) {
    gameSettingsRef.value.handleClose((shouldClose) => {
      if (shouldClose) {
        showSettings.value = false
        done()
      } else {
        // 用户取消关闭，不执行任何操作
      }
    })
  } else {
    done()
  }
}

const updateConfig = (newConfig) => {
  // 处理配置更新
  store.updateGameModes(newConfig)
}
</script>

<style scoped lang="scss">
$noteWidth: 700px;

* {
  font-family: "微软雅黑", Arial, sans-serif;
}

.outBox {
  //margin: 30px auto 0;
  //border: #770e3a 2px solid;
  box-sizing: border-box;
  width: 1000px;
  height: auto;
  padding: 20px;
}

.note {
  width: $noteWidth;
  margin: 0 auto 20px;
  user-select: none;

  h2 {
    background-color: #f9f9f9;
    border-left: 6px solid #007bff;
    padding: 8px;
    font-size: 18px;
    margin-bottom: 15px;
  }

  .note-textarea {
    width: 100%;
  }

  :deep(.el-textarea__inner) {
    resize: none !important;
  }
}

.note-top .note-textarea {
  width: 95%;
  margin: 0 auto; // 使文本域居中
  display: block; // 确保 margin: 0 auto 生效
}


.players-container {
  display: flex;
  justify-content: space-between;
}

.players-column {
  width: 48%;
}

.player-item {
  margin-bottom: 15px;
}


.messageInfo {
  display: flex;
  align-items: flex-start;

  &-left {
    margin-top: 2px;
    margin-right: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40px; // 设置固定宽度

    img {
      cursor: pointer;
      width: 20px;
      height: 20px;
      margin-bottom: 4px;
    }

    .player-number {
      font-size: 14px;
      margin: 4px 0;
    }
  }

  &-right {
    flex-grow: 1;
  }
}

.reset-button {
  margin-left: 4px;
  height: 16px;
  width: 16px;
}

@media screen and (max-width: 768px) {
  .outBox {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }

  .note {
    width: 100%;
    margin: 0 auto 20px;
  }

  .players-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .players-column {
    width: 49%; /* 略微小于50%以确保两列之间有一点间隔 */
  }

  .player-item {
    margin-bottom: 10px;
  }

  .messageInfo {
    display: flex;
    align-items: flex-start;
  }

  .messageInfo-left {
    width: 40px; /* 保持固定宽度以确保一致性 */
    margin-right: 5px;
  }

  .messageInfo-left img {
    width: 20px;
    height: 20px;
  }

  .player-number {
    font-size: 12px;
  }

  .messageInfo-right {
    flex-grow: 1;
    width: calc(100% - 45px); /* 减去左侧宽度和间距 */
  }

  .note h2 {
    font-size: 16px;
    padding: 8px;
    margin-bottom: 10px;
  }

  .note-textarea {
    width: 100%;
  }

  :deep(.el-textarea__inner) {
    width: 100%;
    box-sizing: border-box;
    font-size: 10px;
    padding: 5px;
  }

  /* 确保 RoleSelector 组件在移动设备上也能正确显示 */
  .messageInfo-left .el-select {
    width: 100%;
  }

  .messageInfo-left .el-select .el-input__inner {
    padding: 0 5px;
    font-size: 12px;
  }

  .messageInfo-left {
    width: 30px; // 稍微减小宽度

    img {
      width: 16px; // 减小图片大小
      height: 16px;
    }

    .player-number {
      font-size: 10px; // 减小玩家编号字体大小
    }
  }

  .messageInfo-right {
    width: calc(100% - 35px); // 相应调整右侧宽度
  }
}


</style>