<template>
  <div class="game-settings">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="版型配置" name="config">
        <el-select v-model="selectedModeId" placeholder="选择游戏版型">
          <el-option
              v-for="mode in gameModes"
              :key="mode.id"
              :label="mode.name"
              :value="mode.id"
          />
        </el-select>

        <div v-if="selectedMode" class="mode-config">
          <h3>{{ selectedMode.name }} 配置</h3>

          <h4>角色</h4>
          <div class="role-options">
            <div
                v-for="role in selectedMode.roles"
                :key="role.text"
                :class="['hexagon', `hexagon-${role.color}`]"
            >
              {{ role.text }}
            </div>
          </div>

          <h4>快捷短语</h4>
          <div v-for="(phrase, index) in selectedMode.phrases" :key="index" class="phrase-input">
            <el-input v-model="selectedMode.phrases[index].label" placeholder="标签">
              <template #prepend>标签</template>
            </el-input>
            <el-input v-model="selectedMode.phrases[index].value" placeholder="值">
              <template #prepend>值</template>
            </el-input>
            <el-button @click="removePhrase(index)" type="danger" :icon="Delete" circle></el-button>
          </div>

          <el-button @click="addPhrase" type="primary">添加短语</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="查看配置" name="view">
        <el-select v-model="viewModeId" placeholder="选择游戏版型">
          <el-option
              v-for="mode in gameModes"
              :key="mode.id"
              :label="mode.name"
              :value="mode.id"
          />
        </el-select>

        <pre v-if="viewMode" class="config-view">{{ JSON.stringify(viewMode, null, 2) }}</pre>
      </el-tab-pane>
    </el-tabs>

    <div class="actions">
      <el-button @click="saveConfig" type="primary">保存配置</el-button>
      <el-button @click="resetConfig" type="warning">重置配置</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { Delete } from '@element-plus/icons-vue';

const props = defineProps(['gameModes']);
const emit = defineEmits(['update-config']);

const activeTab = ref('config');
const selectedModeId = ref(null);
const viewModeId = ref(null);

const selectedMode = computed(() => {
  return props.gameModes.find(mode => mode.id === selectedModeId.value);
});

const viewMode = computed(() => {
  return props.gameModes.find(mode => mode.id === viewModeId.value);
});

const addPhrase = () => {
  if (selectedMode.value) {
    selectedMode.value.phrases.push({ label: '', value: '' });
  }
};

const removePhrase = (index) => {
  if (selectedMode.value) {
    selectedMode.value.phrases.splice(index, 1);
  }
};

const saveConfig = () => {
  emit('update-config', props.gameModes);
  ElMessage.success('配置已保存');
};

const resetConfig = () => {
  // 这里应该从原始配置重新加载
  ElMessage.warning('配置已重置（实际功能需要实现）');
};
</script>

<style scoped lang="scss">
$hexagon-size: 18px;
$hexagon-height: calc($hexagon-size * 2 / 1.7321);

@mixin hexagon-base {
  width: $hexagon-size;
  height: $hexagon-height;
  line-height: calc($hexagon-height - 1px);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  font-family: var(--noto-sans-sc), Arial, sans-serif;
  color: white;
  text-align: center;
  cursor: pointer;
  transition: all 0.1s ease;
  user-select: none;
}

.game-settings {
  padding: 20px;
}

.mode-config {
  margin-top: 20px;
}

.role-options {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding: 5px;
}

.hexagon {
  @include hexagon-base;
  margin: 0 5px 5px 0;
  font-size: 11px;

  &-red { background-color: #770e3a; }
  &-blue { background-color: #2c779a; }
  &-gold { background-color: #b89534; }
  &-green { background-color: #006b42; }
  &-gray { background-color: #c8c8c8; }
}

.phrase-input {
  display: flex;
  margin-bottom: 10px;

  .el-input {
    margin-right: 10px;
  }
}

.config-view {
  margin-top: 20px;
  background-color: #f5f7fa;
  padding: 10px;
  border-radius: 4px;
}

.actions {
  margin-top: 20px;
  text-align: right;
}

@media screen and (max-width: 768px) {
  .hexagon {
    width: 14px;
    height: calc(14px * 2 / 1.7321);
    line-height: calc(14px * 2 / 1.7321 - 0.5px);
    font-size: 8px;
  }
}
</style>