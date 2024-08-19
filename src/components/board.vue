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
      </h2>
      <el-input
          v-model="remarks"
          type="textarea"
          class="note-textarea"
          :rows="4"
          placeholder="请输入自记信息"
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
      </h2>
      <div class="players-container">
        <div class="players-column">
          <div v-for="i in 6" :key="`player${i}`" class="player-item">
            <div class="messageInfo">
              <div class="messageInfo-left">
                <img
                    :src="chatRecords[`player${String(i).padStart(2, '0')}`].election === 1 ? handOnImage : handOffImage"
                    :alt="chatRecords[`player${String(i).padStart(2, '0')}`].election === 1 ? '警上' : '警下'"
                    :title="chatRecords[`player${String(i).padStart(2, '0')}`].election === 1 ? '警上' : '警下'"
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
                    prefix="C"
                    :options="options"
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
                    :src="chatRecords[`player${String(i+6).padStart(2, '0')}`].election === 1 ? handOnImage : handOffImage"
                    :alt="chatRecords[`player${String(i+6).padStart(2, '0')}`].election === 1 ? '警上' : '警下'"
                    :title="chatRecords[`player${String(i+6).padStart(2, '0')}`].election === 1 ? '警上' : '警下'"
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
                    prefix="C"
                    :options="options"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--    <el-button type="primary" @click="debug">调试</el-button>-->
  </div>
</template>

<script setup>
import {reactive, ref, toRaw, onMounted, watch} from 'vue'
import handOnImage from '@/assets/hand-on.svg'
import handOffImage from '@/assets/hand-off.svg'
import RoleSelector from './RoleSelector.vue'
import {RefreshRight} from "@element-plus/icons-vue";
import {ElMessage, ElMessageBox} from 'element-plus'

// 自记信息
const remarks = ref('')

// 发言信息
const chatRecords = reactive(
    Object.fromEntries(
        Array.from({length: 12}, (_, i) => {
          const playerKey = `player${String(i + 1).padStart(2, '0')}`;
          return [playerKey, {
            election: 2,//上警信息 0-init,1-警上,2-警下
            flag: true,//是否存在 后续如果加入非12人场预留属性
            message: '',//发言信息
            sign: '',//标记信息 如'狼','民'
            status: 1,//存活状态 1-存活,2-放逐出局,3-其他死亡
          }];
        })
    )
);

const options = ref([
  {label: '跳-预言家-发金水', value: 'C预@0金水/1.2.3/'},
  {label: '跳-预言家-发查杀', value: 'C预@0查杀/1.2.3/'},
  {label: '跳-魔镜-发平民', value: 'C镜@0平民/1.2.3/'},
  {label: '跳-魔镜-发狼人', value: 'C镜@0狼人/1.2.3/'},
  {label: '跳-女巫-发银水', value: 'C女巫@0银水'},
  {label: '跳-守卫-报盾口', value: 'C守卫/0.1.2/'},
  {label: '跳-猎人', value: 'C猎人'},
  {label: '跳-愚者', value: 'C愚者'},
  {label: '跳-商人-发查验', value: 'C商@0幸运儿-查验'},
  {label: '跳-商人-发毒药', value: 'C商@0幸运儿-毒药'},
  {label: '跳-幸运儿-发金水', value: 'C幸@0金水'},
  {label: '跳-幸运儿-发查杀', value: 'C幸@0查杀'},
])

// 从 localStorage 加载数据
onMounted(() => {
  const savedRemarks = localStorage.getItem('remarks')
  if (savedRemarks) {
    remarks.value = savedRemarks
  }

  const savedChatRecords = localStorage.getItem('chatRecords')
  if (savedChatRecords) {
    Object.assign(chatRecords, JSON.parse(savedChatRecords))
  }
})

// 监听数据变化并保存到 localStorage
watch(remarks, (newValue) => {
  localStorage.setItem('remarks', newValue)
}, {deep: true})

watch(chatRecords, (newValue) => {
  localStorage.setItem('chatRecords', JSON.stringify(toRaw(newValue)))
}, {deep: true})

const updatePlayerRole = (playerKey, newRole) => {
  chatRecords[playerKey].sign = newRole
}

function debug() {
  console.log('remarks:', remarks.value)
  console.log('chatRecords:', toRaw(chatRecords))
}

function toggleElection(player) {
  player.election = player.election === 1 ? 2 : 1
}


const resetRemarks = () => {
  ElMessageBox.confirm(
      '确定要重置自记信息吗？',
      '警告',
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

const resetTalks = () => {
  ElMessageBox.confirm(
      '确定要重置所有玩家的发言内容吗？',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      }
  )
      .then(() => {
        Object.keys(chatRecords).forEach(key => {
          chatRecords[key].message = ''
          chatRecords[key].sign = ''
          chatRecords[key].election = 2
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