<template>
  <div class="container">
    <!-- 头部 -->
    <div id="top">
      <b id="title">在 线 笔 记</b>
      <el-button class="settings-link" @click="showExplainModal" text>
        <el-icon>
          <Setting/>
        </el-icon>
      </el-button>
    </div>

    <!-- 内容 -->
    <div id="bottom">
      <!-- 右内容 -->
      <div class="right">
        <div class="header">
          <div class="timer-container">
            <div class="timer">
              <span id="timer">{{ timerDisplay }}</span>
              <el-button class="timer-link" @click="startOrPauseTimer" :disabled="startStopDisabled">
                <el-icon v-if="!countdownActive">
                  <VideoPlay/>
                </el-icon>
                <el-icon v-else>
                  <VideoPause/>
                </el-icon>
              </el-button>
              <el-button class="timer-link" @click="resetTimer" :disabled="resetDisabled">
                <el-icon>
                  <RefreshRight/>
                </el-icon>
              </el-button>
            </div>
          </div>
          <br class="responsive-break">
          <el-button @click="resetNotes" class="button reset-button" title="重置">
            <el-icon>
              <Delete/>
            </el-icon>
          </el-button>
          <el-button @click="exportNotes" class="button export-button" title="导出">
            <el-icon>
              <Download/>
            </el-icon>
          </el-button>
        </div>

        <!-- 备注信息 -->
        <div class="note">
          <h2>备注信息
            <img :src="remarkLocked ? 'img/locked.png' : 'img/unlocked.png'" alt="" class="locked"
                 @click="toggleRemarkLock">
          </h2>
          <el-input
              v-model="remarks"
              type="textarea"
              :rows="3"
              placeholder="请输入"
              :disabled="remarkLocked"
          ></el-input>
        </div>

        <!-- 发言信息 -->
        <div class="note">
          <h2>发言信息
            <img :src="talkLocked ? 'img/locked.png' : 'img/unlocked.png'" alt="" class="locked"
                 @click="toggleTalkLock">
          </h2>
          <div id="roles">
            <el-row :gutter="20">
              <el-col :span="12" v-for="(role, index) in roles" :key="index">
                <div class="role-entry" :class="{ odd: index % 2 === 0, even: index % 2 !== 0 }">
                  <label>
                    <img
                        :src="role.handOn ? 'svg/hand-up.svg' : 'svg/hand-off.svg'"
                        class="toggle-icon"
                        @click="toggleHand(index)"
                    >
                    {{ role.number }}
                    <div :class="['hexagon', ...role.hexagonClasses]">{{ role.role }}</div>
                  </label>
                  <el-input
                      v-model="role.input"
                      type="textarea"
                      :rows="3"
                      :disabled="talkLocked"
                  ></el-input>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>

    <!-- 导出模态框 -->
    <el-dialog v-model="exportModalVisible" title="笔记预览" width="50%" center>
      <el-input
          v-model="exportText"
          type="textarea"
          :rows="10"
          placeholder="预览内容"
          @keydown.tab.prevent="handleTab"
      ></el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="copyToClipboard">复制</el-button>
          <el-button @click="exportModalVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 说明模态框 -->
    <el-dialog v-model="explainModalVisible" title="设置" width="30%" center>
      <p>
        源码：<a href="https://github.com/syhy0612/lrsNotes" target="_blank" style="color: blue;">点击跳转</a>
        <br><br>
        6月24日重新拾起项目。
      </p>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="explainModalVisible = false">好的</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 复制成功提示 -->
    <el-message
        v-model="copySuccessVisible"
        type="success"
        :duration="2000"
        center
    >复制成功~
    </el-message>
  </div>
</template>

<script>
import {ref, reactive, computed, onMounted, onUnmounted} from 'vue'
import {ElMessage} from 'element-plus'
import {Setting, VideoPlay, VideoPause, RefreshRight, Delete, Download} from '@element-plus/icons-vue'

export default {
  name: 'WerewolfNotes',
  components: {
    Setting,
    VideoPlay,
    VideoPause,
    RefreshRight,
    Delete,
    Download
  },
  setup() {
    const countdownActive = ref(false)
    const endTime = ref(null)
    const intervalId = ref(null)
    const totalTimeMs = 20 * 60 * 1000
    const tips = "有效局"
    const remainingTimeMs = ref(totalTimeMs)

    const timerDisplay = computed(() => formatTime(remainingTimeMs.value))
    const startStopDisabled = computed(() => remainingTimeMs.value <= 0)
    const resetDisabled = computed(() => countdownActive.value || remainingTimeMs.value === totalTimeMs)

    const remarks = ref('')
    const remarkLocked = ref(false)
    const talkLocked = ref(false)

    const roles = reactive([
      {number: '01', role: '狼', hexagonClasses: ['hexagon-red', 'hexagon-one'], handOn: true, input: ''},
      {number: '02', role: 'X', hexagonClasses: ['hexagon-green', 'hexagon-one'], handOn: true, input: ''},
      {number: '03', role: '', hexagonClasses: ['hexagon'], handOn: true, input: ''},
      {number: '04', role: '', hexagonClasses: ['hexagon'], handOn: true, input: ''},
      {number: '05', role: '丘', hexagonClasses: ['hexagon-gold', 'hexagon-one'], handOn: true, input: ''},
      {number: '06', role: '幸', hexagonClasses: ['hexagon-gold', 'hexagon-one'], handOn: true, input: ''},
      {number: '07', role: '子狐', hexagonClasses: ['hexagon-blue', 'hexagon-two'], handOn: true, input: ''},
      {number: '08', role: '', hexagonClasses: ['hexagon'], handOn: true, input: ''},
      {number: '09', role: '', hexagonClasses: ['hexagon'], handOn: true, input: ''},
      {number: '10', role: '警1', hexagonClasses: ['hexagon-green', 'hexagon-two'], handOn: true, input: ''},
      {number: '11', role: '', hexagonClasses: ['hexagon'], handOn: true, input: ''},
      {number: '12', role: '', hexagonClasses: ['hexagon'], handOn: true, input: ''},
    ])

    const exportModalVisible = ref(false)
    const explainModalVisible = ref(false)
    const exportText = ref('')
    const copySuccessVisible = ref(false)

    function formatTime(ms) {
      const totalSeconds = Math.round(ms / 1000)
      const minutes = Math.floor(totalSeconds / 60)
      const seconds = totalSeconds % 60
      return ms <= 0 ? tips : `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }

    function updateTimerDisplay() {
      const currentTime = new Date().getTime()
      const timeLeft = endTime.value - currentTime
      remainingTimeMs.value = timeLeft > 0 ? timeLeft : 0
      if (timeLeft <= 0 && countdownActive.value) {
        clearInterval(intervalId.value)
        countdownActive.value = false
      }
    }

    function startOrPauseTimer() {
      if (!countdownActive.value && remainingTimeMs.value > 0) {
        countdownActive.value = true
        endTime.value = new Date().getTime() + remainingTimeMs.value
        intervalId.value = setInterval(updateTimerDisplay, 100)
      } else if (countdownActive.value) {
        clearInterval(intervalId.value)
        countdownActive.value = false
      }
    }

    function resetTimer() {
      if (!countdownActive.value && remainingTimeMs.value !== totalTimeMs) {
        clearInterval(intervalId.value)
        countdownActive.value = false
        endTime.value = null
        remainingTimeMs.value = totalTimeMs
      }
    }

    function resetNotes() {
      if (confirm('确定重置吗？')) {
        remarks.value = ''
        roles.forEach(role => {
          role.input = ''
          role.handOn = true
        })
      }
    }

    function exportNotes() {
      exportText.value = prepareExportData()
      exportModalVisible.value = true
    }

    function prepareExportData() {
      const datetime = topTextTime(new Date())
      let data = `${datetime}\n***************************************\n${remarks.value}\n***************************************\n发言信息：\n`
      roles.forEach((role, index) => {
        const contentWithTabs = role.input.replace(/\n/g, '\n\t')
        data += `[${role.number}] \t${contentWithTabs}\n`
        if (index === 5) data += '***************************************\n'
      })
      return data
    }

    function topTextTime(date) {
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      const seconds = date.getSeconds().toString().padStart(2, '0')
      return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`
    }

    function copyToClipboard() {
      navigator.clipboard.writeText(exportText.value).then(() => {
        copySuccessVisible.value = true
        setTimeout(() => {
          copySuccessVisible.value = false
        }, 2000)
      }).catch(err => {
        console.error('无法复制内容: ', err)
      })
    }

    function handleTab(e) {
      e.preventDefault()
      const start = e.target.selectionStart
      const end = e.target.selectionEnd
      exportText.value = exportText.value.substring(0, start) + "\t" + exportText.value.substring(end)
      e.target.selectionStart = e.target.selectionEnd = start + 1
    }

    function toggleRemarkLock() {
      remarkLocked.value = !remarkLocked.value
    }

    function toggleTalkLock() {
      talkLocked.value = !talkLocked.value
    }

    function toggleHand(index) {
      roles[index].handOn = !roles[index].handOn
    }

    function showExplainModal() {
      explainModalVisible.value = true
    }

    onMounted(() => {
      // 可以在这里添加任何需要在组件挂载后执行的逻辑
    })

    onUnmounted(() => {
      if (intervalId.value) {
        clearInterval(intervalId.value)
      }
    })

    return {
      timerDisplay,
      countdownActive,
      startStopDisabled,
      resetDisabled,
      remarks,
      remarkLocked,
      talkLocked,
      roles,
      exportModalVisible,
      explainModalVisible,
      exportText,
      copySuccessVisible,
      startOrPauseTimer,
      resetTimer,
      resetNotes,
      exportNotes,
      copyToClipboard,
      handleTab,
      toggleRemarkLock,
      toggleTalkLock,
      toggleHand,
      showExplainModal
    }
  }
}
</script>

<style scoped lang="scss">

/* 全局样式 */
body {
  font-family: "微软雅黑", Arial, sans-serif;
  background-color: #f0f0f0;
  margin: 0;
  padding-top: 5px;
  overflow-y: scroll;
}

.container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 90%;
  max-height: 90%;
  margin: 0 auto;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

#bottom {
  width: 100%;
}

.right {
  width: 80%;
  margin: 0 auto;
}

/* 头部样式 */
#top {
  position: relative;
  text-align: center;
  margin: 0 auto;
  width: 90%;
}

#title {
  font-size: 28px;
}

.settings-link {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: black;
}

/* 计时器样式 */
.timer-container {
  display: flex;
  align-items: center;
  width: 120px;
  height: 24px;
  background-color: #000;
  border: 4px solid #D2B48C;
  border-radius: 5px;
  color: white;
  display: inline-block;
}

#timer {
  flex-grow: 1;
  text-align: center;
  min-width: 30px;
  line-height: 24px;
}

.timer-link {
  color: red;
}

/* 按钮样式 */
.button {
  padding: 5px 10px;
  margin-top: 10px;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
}

.reset-button {
  background-color: red;
  color: white;
}

.export-button {
  background-color: blue;
  color: white;
}

/* 笔记样式 */
.note {
  margin-bottom: 20px;
}

.note h2 {
  background-color: #f9f9f9;
  border-left: 6px solid #007bff;
  padding: 8px;
  font-size: 18px;
  text-align: left;
}

.note h2 img.locked {
  height: 18px;
  width: auto;
  margin-left: 5px;
  margin-right: 5px;
  vertical-align: bottom;
}

/* 角色样式 */
#roles {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
  min-height: 200px;
  width: 100%;
  padding: 0;
}

.role-entry {
  width: 48%;
  margin-bottom: 15px;
}

.role-entry.even {
  margin-left: auto;
}

.role-entry label {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
  font-size: 14px;
}

.toggle-icon {
  cursor: pointer;
  display: block;
  margin: auto;
  width: 20px;
  height: 20px;
  margin-bottom: 5px;
  object-fit: contain;
}

.role-entry textarea {
  width: 100%;
  padding: 6px;
  margin-bottom: 2%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  font-family: "微软雅黑", Arial, sans-serif;
  resize: none;
}

/* 六边形样式 */
.hexagon {
  margin: 0 auto 5px auto;
  width: 18px;
  height: calc(18px * 2 / 1.7321);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  font-family: 'Noto Sans SC', Arial, sans-serif !important;
  color: white;
  background-color: #c8c8c8;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hexagon-one {
  font-size: 11px;
  line-height: 20px;
}

.hexagon-two {
  font-size: 8px;
  line-height: 20px;
}

.hexagon-red {
  background-color: #770e3a;
}

.hexagon-green {
  background-color: #006b42;
}

.hexagon-blue {
  background-color: #2c779a;
}

.hexagon-gold {
  background-color: #b89534;
}

/* 模态框样式 */
.el-dialog {
  text-align: center;
}

.el-dialog__body {
  padding: 20px;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .right {
    width: 90%;
  }

  .responsive-break {
    display: block;
  }

  .note h2, .button {
    margin-top: 5px;
  }

  .role-entry {
    width: 100%;
  }
}

/* 提示信息样式 */
.el-message {
  min-width: 250px;
  margin-left: -125px;
  background-color: #878787;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 1000;
  left: 50%;
  bottom: 30px;
  font-size: 17px;
}
</style>