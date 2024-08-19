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
                v-for="role in sortedRoles"
                :key="role.text"
                class="role-container"
            >
              <div v-if="role.count > 1" class="role-count hexagon">
                {{ role.count }}
              </div>
              <div :class="['hexagon', `hexagon-${role.color}`]">
                {{ role.text }}
              </div>
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
import {ref, computed} from 'vue';
import {ElMessage} from 'element-plus';
import {Delete} from '@element-plus/icons-vue';

const props = defineProps({
  gameModes: {
    type: Array,
    required: true
  }
});

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

const sortedRoles = computed(() => {
  if (!selectedMode.value) return [];

  // 对角色进行排序
  const redRoles = selectedMode.value.roles.filter(role => role.color === 'red');
  const otherRoles = selectedMode.value.roles.filter(role => role.color !== 'red');

  return [...redRoles, ...otherRoles];
});

const addPhrase = () => {
  if (selectedMode.value) {
    selectedMode.value.phrases.push({label: '', value: ''});
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
$hexagon-size: 36px;
$hexagon-height: calc($hexagon-size * 2 / 1.7321);
$count-hexagon-size: 18px;
$count-hexagon-height: calc($count-hexagon-size * 2 / 1.7321);

@mixin hexagon-base($size, $height) {
  width: $size;
  height: $height;
  line-height: $height;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  font-family: var(--noto-sans-sc), Arial, sans-serif;
  color: white;
  text-align: center;
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
  gap: 10px;
  padding: 20px 10px 5px;
  background-color: rgba(blue,.2);
}

.role-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 5px 15px 0;
}

.hexagon {
  @include hexagon-base($hexagon-size, $hexagon-height);
  font-size: 16px;
  cursor: pointer;
  transition: all 0.1s ease;

  &-red {
    background-color: #770e3a;
  }

  &-blue {
    background-color: #2c779a;
  }

  &-gold {
    background-color: #b89534;
  }

  &-green {
    background-color: #006b42;
  }

  &-gray {
    background-color: #c8c8c8;
  }
}

.role-count {
  @include hexagon-base($count-hexagon-size, $count-hexagon-height);
  position: absolute;
  top: -$count-hexagon-height / 2;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff6e0;
  font-size: 12px;
  z-index: 1;
  color: black;
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
  $hexagon-size: 28px;
  $hexagon-height: calc($hexagon-size * 2 / 1.7321);
  $count-hexagon-size: 14px;
  $count-hexagon-height: calc($count-hexagon-size * 2 / 1.7321);

  .hexagon {
    width: $hexagon-size;
    height: $hexagon-height;
    line-height: $hexagon-height;
    font-size: 12px;
  }

  .role-count {
    width: $count-hexagon-size;
    height: $count-hexagon-height;
    line-height: $count-hexagon-height;
    font-size: 10px;
    top: -$count-hexagon-height / 2;
  }
}
</style>