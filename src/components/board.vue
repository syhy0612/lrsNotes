<template>
  <div class="outBox">
    <div class="note"><h2>备注信息</h2>
      <el-input
          v-model="remarks"
          type="textarea"
          class="note-textarea"
          :autosize="{ minRows: 3, maxRows: 4 }"
          placeholder="请输入"
      />
    </div>
    <div class="note"><h2>发言信息</h2>

    </div>
  </div>
</template>
<script setup>
import {ref} from 'vue'

const remarks = ref()
</script>
<style scoped lang="scss">
$noteWidth: 700px; //提示信息长度

* {
  font-family: "微软雅黑", Arial, sans-serif;
}

.outBox {
  margin: 100px auto 0;
  //background-color: lightblue;
  border: #770e3a 2px solid;//暂时加
  box-sizing: border-box;//暂时加
  width: 1000px;//暂时加
  height: auto;
}

.note {
  height: 150px;
  width: $noteWidth;
  text-align: center;

  h2 {
    background-color: #f9f9f9;
    border-left: 6px solid #007bff;
    padding: 8px;
    font-size: 18px;
    text-align: left;
  }

  .note-textarea {
    width: $noteWidth*0.95;
    margin-top: 20px;
  }
}


</style>