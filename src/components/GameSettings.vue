<template>
  <div class="game-settings">
    <el-select v-model="selectedModeId" placeholder="选择游戏版型" @change="handleModeChange">
      <el-option
        v-for="mode in gameModes"
        :key="mode.id"
        :label="mode.name"
        :value="mode.id"
      />
    </el-select>

    <el-tabs v-model="activeTab">
      <el-tab-pane label="版型配置" name="config">
        <div v-if="selectedMode" class="mode-config">
          <h3>{{ selectedMode.name }} 配置</h3>

          <h4>角色</h4>
          <div class="role-options">
            <div class="role-group wolves">
              <div
                v-for="role in wolveRoles"
                :key="role.text"
                class="role-container"
              >
                <div v-if="role.count > 1" class="role-count hexagon">
                  {{ role.count }}
                </div>
                <div class="hexagon hexagon-red">
                  {{ role.text }}
                </div>
              </div>
            </div>
            <div class="role-group villagers">
              <div
                v-for="role in villagerRoles"
                :key="role.text"
                class="role-container"
              >
                <div v-if="role.count > 1" class="role-count hexagon">
                  {{ role.count }}
                </div>
                <div class="hexagon hexagon-blue">
                  {{ role.text }}
                </div>
              </div>
            </div>
          </div>

          <h4>快捷短语</h4>
          <div v-for="(phrase, index) in selectedMode.phrases" :key="index" class="phrase-input">
            <el-input v-model="selectedMode.phrases[index].label" placeholder="标签" @input="markAsChanged">
              <template #prepend>提示</template>
            </el-input>
            <el-input v-model="selectedMode.phrases[index].value" placeholder="值" @input="markAsChanged">
              <template #prepend>起跳</template>
            </el-input>
            <el-button @click="removePhrase(index)" type="danger" :icon="Delete" circle></el-button>
          </div>

          <el-button @click="addPhrase" type="primary">添加短语</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="查看配置" name="view">
        <div class="config-view-container">
          <el-button
            class="copy-button"
            :icon="CopyDocument"
            circle
            @click="copyConfig"
          />
          <pre v-if="selectedMode" class="config-view">{{ JSON.stringify(selectedMode, null, 2) }}</pre>
        </div>
      </el-tab-pane>
    </el-tabs>

    <div class="actions">
      <el-button @click="confirmSave" type="primary" :disabled="!hasChanges">保存配置</el-button>
      <el-button @click="confirmReset" type="warning">重置配置</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, CopyDocument } from '@element-plus/icons-vue';
import { useGameModeStore } from '@/stores/gameModeStore';
import { storeToRefs } from 'pinia';

const emit = defineEmits(['update-config']);

const store = useGameModeStore();
const { gameModes } = storeToRefs(store);

const activeTab = ref('config');
const selectedModeId = ref(null);
const originalModes = ref(JSON.parse(JSON.stringify(gameModes.value)));
const hasChanges = ref(false);

const selectedMode = computed(() => {
  return gameModes.value.find(mode => mode.id === selectedModeId.value);
});

const wolveRoles = computed(() => {
  if (!selectedMode.value || !selectedMode.value.roles) return [];
  return selectedMode.value.roles.filter(role => role.color === 'red');
});

const villagerRoles = computed(() => {
  if (!selectedMode.value || !selectedMode.value.roles) return [];
  return selectedMode.value.roles.filter(role => role.color === 'blue');
});

const handleModeChange = (modeId) => {
  store.selectMode(modeId);
};

const markAsChanged = () => {
  hasChanges.value = true;
};

const addPhrase = () => {
  if (selectedMode.value) {
    selectedMode.value.phrases.push({ label: '', value: '' });
    markAsChanged();
  }
};

const removePhrase = (index) => {
  if (selectedMode.value) {
    selectedMode.value.phrases.splice(index, 1);
    markAsChanged();
  }
};

const confirmSave = () => {
  ElMessageBox.confirm(
    '确定要保存当前配置吗？这将覆盖之前的设置。',
    '保存确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    saveConfig();
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消保存',
      duration: 500
    });
  });
};

const saveConfig = () => {
  emit('update-config', gameModes.value);
  originalModes.value = JSON.parse(JSON.stringify(gameModes.value));
  hasChanges.value = false;
  ElMessage({
    type: 'success',
    message: '配置已保存',
    duration: 500
  });
};

const confirmReset = () => {
  ElMessageBox.confirm(
    '确定要重置所有配置吗？这将丢失所有未保存的更改。',
    '重置确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    resetConfig();
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消重置',
      duration: 500
    });
  });
};

const resetConfig = () => {
  store.resetToOriginal();
  gameModes.value = JSON.parse(JSON.stringify(store.gameModes));
  originalModes.value = JSON.parse(JSON.stringify(gameModes.value));
  hasChanges.value = false;
  ElMessage({
    type: 'warning',
    message: '配置已重置',
    duration: 500
  });
};

const copyConfig = () => {
  if (selectedMode.value) {
    const configText = JSON.stringify(selectedMode.value, null, 2);
    navigator.clipboard.writeText(configText).then(() => {
      ElMessage({
        message: '配置已复制到剪贴板',
        type: 'success',
        duration: 500
      });
    }).catch(err => {
      console.error('无法复制文本: ', err);
      ElMessage({
        message: '复制失败，请手动复制',
        type: 'error',
        duration: 500
      });
    });
  }
};

// 监听 gameModes 的变化
watch(gameModes, () => {
  hasChanges.value = JSON.stringify(gameModes.value) !== JSON.stringify(originalModes.value);
}, { deep: true });

// 初始化选中的模式
onMounted(() => {
  selectedModeId.value = store.selectedModeId;
});

// 处理关闭确认
const handleClose = (done) => {
  if (hasChanges.value) {
    ElMessageBox.confirm(
      '有未保存的更改，是否保存？',
      '确认',
      {
        confirmButtonText: '保存',
        cancelButtonText: '不保存',
        type: 'warning',
        distinguishCancelAndClose: true,
      }
    )
      .then(() => {
        saveConfig();
        done(true);
      })
      .catch((action) => {
        if (action === 'cancel') {
          // 用户选择不保存
          hasChanges.value = false;
          done(true);
        } else {
          // 用户关闭对话框，不执行任何操作
          done(false);
        }
      });
  } else {
    done(true);
  }
};

defineExpose({
  handleClose
});
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
  gap: 10px; // 狼人组和好人组之间的间距
  padding: 20px 10px 5px;
}

.role-group {
  display: flex;
  flex-wrap: wrap;
}

.role-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
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
  background-color: #a8abb2;
  font-size: 12px;
  z-index: 1;
}

.wolves .role-container,
.villagers .role-container {
  margin-left: 0;
  margin-right: 0;
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

.copy-button {
  float: right;
  margin-top: 20px;
  margin-right: 20px;
}
</style>