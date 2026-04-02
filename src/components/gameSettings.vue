<template>
  <div class="game-settings">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="选择版型" name="select">
        <SearchTypes @select-mode="$emit('close')"/>
      </el-tab-pane>
      <el-tab-pane v-if="isDev" label="版型配置" name="config">
        <div v-if="selectedMode" class="mode-config">
          <h4>角色配置</h4>
          <div class="role-display">
            <div v-for="role in selectedMode.roles" :key="role.text" class="role-chip"
                 :class="`role-chip--${role.color}`">
              <span v-if="role.count > 1" class="role-count">{{ role.count }}</span>
              {{ role.text }}
            </div>
          </div>
          <h4>快捷短语</h4>
          <div v-for="(phrase, index) in selectedMode.phrases" :key="index" class="phrase-row">
            <el-input v-model="selectedMode.phrases[index].label" placeholder="提示" size="small" @input="markChanged">
              <template #prepend>提示</template>
            </el-input>
            <el-input v-model="selectedMode.phrases[index].value" placeholder="起跳" size="small" @input="markChanged">
              <template #prepend>值</template>
            </el-input>
            <el-button @click="removePhrase(index)" type="danger" :icon="Delete" circle size="small"/>
          </div>
          <el-button @click="addPhrase" type="primary" size="small" style="margin-top:8px">添加短语</el-button>
        </div>
        <div v-else class="empty-tip">请先在「选择版型」中选择一个版型</div>
      </el-tab-pane>
      <el-tab-pane v-if="isDev" label="JSON 视图" name="json">
        <div v-if="selectedMode" class="json-view">
          <el-button :icon="CopyDocument" circle size="small" class="copy-btn" @click="copyConfig"/>
          <pre>{{ JSON.stringify(selectedMode, null, 2) }}</pre>
        </div>
      </el-tab-pane>
    </el-tabs>

    <div class="settings-footer" v-if="activeTab !== 'select'">
      <el-button @click="confirmSave" type="primary" :disabled="!hasChanges" size="small">保存</el-button>
      <el-button @click="confirmReset" type="warning" size="small">重置</el-button>
    </div>
  </div>
</template>

<script setup>
import {ref, watch, computed} from 'vue';
import {ElMessage, ElMessageBox} from 'element-plus';
import {Delete, CopyDocument} from '@element-plus/icons-vue';
import {useGameModeStore} from '@/stores/gameModeStore';
import {storeToRefs} from 'pinia';
import SearchTypes from "@/components/searchTypes.vue";

const emit = defineEmits(['update-config', 'close']);
const isDev = import.meta.env.DEV;
const activeTab = ref('select');

const store = useGameModeStore();
const {gameModes, selectedMode} = storeToRefs(store);

const originalModes = ref(JSON.parse(JSON.stringify(gameModes.value)));
const hasChanges = ref(false);

const markChanged = () => { hasChanges.value = true; };

const addPhrase = () => {
  if (selectedMode.value) {
    selectedMode.value.phrases.push({label: '', value: ''});
    markChanged();
  }
};

const removePhrase = (index) => {
  if (selectedMode.value) {
    selectedMode.value.phrases.splice(index, 1);
    markChanged();
  }
};

const copyConfig = () => {
  if (selectedMode.value) {
    navigator.clipboard.writeText(JSON.stringify(selectedMode.value, null, 2)).then(() => {
      ElMessage({message: '已复制', type: 'success', duration: 500});
    }).catch(() => {
      ElMessage({message: '复制失败', type: 'error', duration: 500});
    });
  }
};

const confirmSave = () => {
  ElMessageBox.confirm('确定要保存当前配置吗？', '保存确认', {
    confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning',
  }).then(() => saveConfig()).catch(() => {});
};

const saveConfig = () => {
  emit('update-config', gameModes.value);
  originalModes.value = JSON.parse(JSON.stringify(gameModes.value));
  hasChanges.value = false;
  ElMessage({type: 'success', message: '配置已保存', duration: 500});
};

const confirmReset = () => {
  ElMessageBox.confirm('确定要重置所有配置吗？', '重置确认', {
    confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning',
  }).then(() => resetConfig()).catch(() => {});
};

const resetConfig = () => {
  store.resetToOriginal();
  gameModes.value = JSON.parse(JSON.stringify(store.gameModes));
  originalModes.value = JSON.parse(JSON.stringify(gameModes.value));
  hasChanges.value = false;
  ElMessage({type: 'warning', message: '配置已重置', duration: 500});
};

const getComparableModes = (modes) => {
  if (!modes) return [];
  return modes.map(({ isFavorite, ...rest }) => rest);
};

watch(gameModes, () => {
  hasChanges.value = JSON.stringify(getComparableModes(gameModes.value)) !== JSON.stringify(getComparableModes(originalModes.value));
}, {deep: true});

const handleClose = (done) => {
  if (hasChanges.value) {
    ElMessageBox.confirm('有未保存的更改，是否保存？', '确认', {
      confirmButtonText: '保存', cancelButtonText: '不保存', type: 'warning', distinguishCancelAndClose: true,
    }).then(() => { saveConfig(); done(true); })
        .catch((action) => { if (action === 'cancel') { hasChanges.value = false; done(true); } else { done(false); } });
  } else {
    done(true);
  }
};

defineExpose({handleClose});
</script>

<style scoped lang="scss">
.game-settings {
  padding: 8px;
  min-height: 380px;
  overflow: visible;
}

.settings-footer {
  margin-top: 16px;
  text-align: center;
  padding-top: 12px;
  border-top: 1px solid var(--border-color);
}

.mode-config h4 {
  color: var(--text-secondary);
  font-size: 13px;
  margin: 12px 0 8px;
}

.role-display {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.role-chip {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  position: relative;

  &--red { background: #770e3a; }
  &--blue { background: #2c779a; }
  &--gold { background: #b89534; }
  &--green { background: #006b42; }
}

.role-count {
  position: absolute;
  top: -8px;
  right: -6px;
  background: #ff3b30;
  color: white;
  font-size: 11px;
  font-weight: bold;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}

.phrase-row {
  display: flex;
  gap: 6px;
  margin-bottom: 6px;
  align-items: center;

  .el-input { flex: 1; }
}

.empty-tip {
  text-align: center;
  color: var(--text-muted);
  padding: 40px 0;
}

.json-view {
  position: relative;

  pre {
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    padding: 12px;
    font-size: 11px;
    color: var(--text-secondary);
    max-height: 400px;
    overflow: auto;
  }
}

.copy-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
}

@media screen and (max-width: 768px) {
  .game-settings { padding: 4px; }
}
</style>