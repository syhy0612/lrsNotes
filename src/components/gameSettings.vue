<template>
  <div class="game-settings">
    <div class="game-settings-search">
      <SearchTypes/>
    </div>

    <div class="actions">
      <el-button @click="confirmSave" type="primary" :disabled="!hasChanges">保存</el-button>
      <el-button @click="confirmReset" type="warning">重置</el-button>
    </div>
  </div>
</template>

<script setup>
import {ref, watch, onMounted} from 'vue';
import {ElMessage, ElMessageBox} from 'element-plus';
import {useGameModeStore} from '@/stores/gameModeStore';
import {storeToRefs} from 'pinia';
import SearchTypes from "@/components/searchTypes.vue";

const emit = defineEmits(['update-config']);

const store = useGameModeStore();
const {gameModes} = storeToRefs(store);

const originalModes = ref(JSON.parse(JSON.stringify(gameModes.value)));
const hasChanges = ref(false);

const confirmSave = () => {
  ElMessageBox.confirm(
      '确定要保存当前配置吗？这将覆盖之前的配置。',
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

watch(gameModes, () => {
  hasChanges.value = JSON.stringify(gameModes.value) !== JSON.stringify(originalModes.value);
}, {deep: true});

onMounted(() => {
  // 初始化逻辑
});

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
.game-settings {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.game-settings-search {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.actions {
  margin-top: 20px;
  text-align: center;
  width: 100%;
}

@media screen and (max-width: 768px) {
  .game-settings {
    padding: 10px;
  }
}
</style>