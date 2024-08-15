<template>
  <div class="outBox">
    <div class="note note-top">
      <h2>自记信息</h2>
      <el-input
          v-model="remarks"
          type="textarea"
          class="note-textarea-top"
          :rows="4"
          placeholder="请输入"
      />
    </div>
    <div class="note">
      <h2>发言信息</h2>
      <div class="messageLeft">
        <div class="messageInfo">

          <el-mention
              v-model="chatRecords.player01.message"
              type="textarea"
              class="note-textarea-down"
              :rows="3"
              placeholder="请输入01号玩家发言信息"
              prefix="C"
              :options="options"
          />
        </div>
      </div>
    </div>
    <el-button type="primary" @click="debug">调试</el-button>
  </div>
</template>
<script setup>
import {reactive, ref} from 'vue'

//自记信息
const remarks = ref()
//发言信息
const chatRecords = reactive({});
//给12个玩家分别加上属性
for (let i = 1; i <= 12; i++) {
  const playerKey = `player${String(i).padStart(2, '0')}`;
  chatRecords[playerKey] = {
    election: '',//上警信息 0-init,1-警上,2-警下
    flag: true,//是否存在 后续如果加入非12人场预留属性
    message: '',//发言信息
    sign: '',//标记信息 如'狼','民'
    status: 1,//存活状态 1-存活,2-放逐出局,3-其他死亡
  };
}

const options = ref([
  {
    label: '跳-预言家-发金水',
    value: 'C预@0金水/1.2.3/',
  },
  {
    label: '跳-预言家-发查杀',
    value: 'C预@0查杀/1.2.3/',
  },
  {
    label: '跳-魔镜-发平民',
    value: 'C镜@0平民/1.2.3/',
  },
  {
    label: '跳-魔镜-发狼人',
    value: 'C镜@0狼人/1.2.3/',
  },
  {
    label: '跳-女巫-发银水',
    value: 'C女巫@0银水',
  },
  {
    label: '跳-守卫-报盾口',
    value: 'CC守卫/0.1.2/',
  },
  {
    label: '跳-猎人',
    value: 'C猎人',
  },
  {
    label: '跳-商人-发查验',
    value: 'C商@0幸运儿-查验',
  },
  {
    label: '跳-商人-发毒药',
    value: 'C商@0幸运儿-毒药',
  },
  {
    label: '跳-幸运儿-发金水',
    value: 'C幸@0金水',
  },
  {
    label: '跳-幸运儿-发查杀',
    value: 'C幸@0查杀',
  },
])

//调试按钮
function debug() {
  console.log('remarks:', remarks.value)
  console.log('chatRecords:', chatRecords)
}

</script>
<style scoped lang="scss">
$noteWidth: 700px; //提示信息长度

* {
  font-family: "微软雅黑", Arial, sans-serif;
}

//整个大盒子
.outBox {
  margin: 30px auto 0;
  //background-color: lightblue;
  border: #770e3a 2px solid; //暂时加
  box-sizing: border-box; //暂时加
  width: 1000px; //暂时加
  height: auto;
}

.note-top {
  text-align: center;
  height: 170px;
}

.note {
  //height: 150px;
  width: $noteWidth;

  //使文本域禁止拉伸
  :deep(.el-textarea__inner) {
    resize: none !important;
  }

  h2 {
    background-color: #f9f9f9;
    border-left: 6px solid #007bff;
    padding: 8px;
    font-size: 18px;
    text-align: left;
  }

  //自记信息
  .note-textarea-top {
    width: $noteWidth*0.95;
    margin-top: 20px;
  }

  //发言信息
  .note-textarea-down {
    width: 240px;
    height: auto;
  }

  .messageLeft {
    border: #b89534 2px solid;
    width: 50%;

    .messageInfo {

    }
  }
}


</style>