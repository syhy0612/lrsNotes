<template>
  <el-container style="padding: 30px;">
    <el-row :gutter="20">
      <el-col :span="8" v-for="index in 12" :key="index">
        <el-form>
          <el-form-item :label="`用户 ${index}：`">
            <el-input v-model="playersNotes[index]" placeholder="输入信息"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-button type="primary" @click="saveNotes">保存</el-button>
  </el-container>
</template>

<script>
import {ref} from 'vue'
import {ElButton, ElCol, ElContainer, ElForm, ElFormItem, ElInput, ElRow} from 'element-plus'

export default {
  name: 'WerewolfNotes',
  components: {
    ElButton,
    ElCol,
    ElContainer,
    ElForm,
    ElFormItem,
    ElInput,
    ElRow
  },
  setup() {
    const playersNotes = ref(Array(13).fill('')); // 创建一个数组存储每个玩家的笔记，使用索引1到12

    const saveNotes = () => {
      console.log(playersNotes.value); // 可以在这里添加将笔记保存到服务器的代码
      alert('笔记已保存！');
    };

    return {playersNotes, saveNotes};
  }
}
</script>

<style scoped>
.el-form-item {
  margin-bottom: 12px;
}
</style>
