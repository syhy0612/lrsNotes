<template>
  <el-container style="padding: 30px;">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form>
          <el-form-item label="用户 1：">
            <el-input v-model="playersNotes[1]" placeholder="输入信息"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form>
          <el-form-item label="用户 2：">
            <el-input v-model="playersNotes[2]" placeholder="输入信息"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form>
          <el-form-item label="用户 3：">
            <el-input v-model="playersNotes[3]" placeholder="输入信息"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form>
          <el-form-item label="用户 4：">
            <el-input v-model="playersNotes[4]" placeholder="输入信息"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form>
          <el-form-item label="用户 5：">
            <el-input v-model="playersNotes[5]" placeholder="输入信息"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form>
          <el-form-item label="用户 6：">
            <el-input v-model="playersNotes[6]" placeholder="输入信息"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form>
          <el-form-item label="用户 7：">
            <el-input v-model="playersNotes[7]" placeholder="输入信息"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form>
          <el-form-item label="用户 8：">
            <el-input v-model="playersNotes[8]" placeholder="输入信息"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form>
          <el-form-item label="用户 9：">
            <el-input v-model="playersNotes[9]" placeholder="输入信息"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form>
          <el-form-item label="用户 10：">
            <el-input v-model="playersNotes[10]" placeholder="输入信息"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form>
          <el-form-item label="用户 11：">
            <el-input v-model="playersNotes[11]" placeholder="输入信息"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form>
          <el-form-item label="用户 12：">
            <el-input v-model="playersNotes[12]" placeholder="输入信息"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-container>
  <div class="button-container">
    <el-button type="primary" @click="saveNotes">保存</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const playersNotes = ref(Array(13).fill('')) // 创建一个数组存储每个玩家的笔记，使用索引1到12

const saveNotes = () => {
  console.log(playersNotes.value) // 可以在这里添加将笔记保存到服务器的代码
  alert('笔记已保存！')
}
</script>

<style scoped>
.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.el-row {
  margin-bottom: 20px;
}
</style>