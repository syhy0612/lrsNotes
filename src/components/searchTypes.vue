<template>
  <div class="search-types">
    <el-input
        v-model="searchTerm"
        placeholder="搜索版型名称或拼音..."
        clearable
        @clear="searchTerm = ''"
    />

    <!-- 直接在输入框下方显示列表，无需 absolute 定位 -->
    <div class="mode-list">
      <!-- 收藏版型 -->
      <template v-if="filteredFavorites.length > 0">
        <div class="group-label">⭐ 收藏版型</div>
        <div
            v-for="item in filteredFavorites" :key="item.id"
            class="mode-item" :class="{ 'is-selected': item.id === store.selectedModeId }"
            @click="selectItem(item)"
        >
          <div class="mode-info">
            <span class="mode-name">{{ item.name }}</span>
            <span class="mode-type">{{ item.type }}</span>
          </div>
          <div class="mode-actions">
            <el-icon class="fav-icon fav-icon--active" @click.stop="toggleFavorite(item)"><StarFilled/></el-icon>
          </div>
        </div>
      </template>

      <!-- 全部版型 -->
      <template v-if="filteredOthers.length > 0">
        <div class="group-label">全部版型</div>
        <div
            v-for="item in filteredOthers" :key="item.id"
            class="mode-item" :class="{ 'is-selected': item.id === store.selectedModeId }"
            @click="selectItem(item)"
        >
          <div class="mode-info">
            <span class="mode-name">{{ item.name }}</span>
            <span class="mode-type">{{ item.type }}</span>
          </div>
          <div class="mode-actions">
            <el-icon class="fav-icon" @click.stop="toggleFavorite(item)"><Star/></el-icon>
          </div>
        </div>
      </template>

      <div v-if="filteredFavorites.length === 0 && filteredOthers.length === 0" class="empty">
        没有匹配的版型
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted, watch} from 'vue';
import {Star, StarFilled} from '@element-plus/icons-vue';
import {useGameModeStore} from '@/stores/gameModeStore';
import {storeToRefs} from 'pinia';

const store = useGameModeStore();
const {gameModes} = storeToRefs(store);
const searchTerm = ref('');
const emit = defineEmits(['select-mode']);

const filteredItems = computed(() => {
  if (!gameModes.value) return [];
  const term = searchTerm.value.toLowerCase().trim();
  if (!term) return gameModes.value;
  return gameModes.value.filter(item =>
      item.name.toLowerCase().includes(term) ||
      item.pinyin.toLowerCase().includes(term) ||
      (item.type && item.type.toLowerCase().includes(term))
  );
});

const filteredFavorites = computed(() => filteredItems.value.filter(i => i.isFavorite));
const filteredOthers = computed(() => filteredItems.value.filter(i => !i.isFavorite));

const selectItem = (item) => {
  store.selectMode(item.id);
  emit('select-mode', item);
};

const toggleFavorite = (item) => store.toggleFavorite(item.id);

onMounted(async () => {
  if (!store.isInitialized) await store.initializeStore();
});
</script>

<style scoped lang="scss">
.search-types { display: flex; flex-direction: column; height: 100%; }

.mode-list {
  margin-top: 10px;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
}

.group-label {
  padding: 8px 12px 4px;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 1px;
  background: var(--bg-input);
  position: sticky;
  top: 0;
  z-index: 1;
}

.mode-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 12px;
  cursor: pointer;
  transition: background 0.15s;
  border-bottom: 1px solid var(--border-color);

  &:last-child { border-bottom: none; }
  &:hover { background: var(--bg-input); }
  &.is-selected {
    background: rgba(0, 122, 255, 0.05);
    .mode-name { color: #007aff; }
  }
}

.mode-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.mode-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
}

.mode-type {
  font-size: 11px;
  color: var(--text-muted);
}

.mode-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.fav-icon {
  font-size: 16px;
  color: #d1d1d6;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { transform: scale(1.15); color: #fdcb6e; }
  &--active { font-size: 19px; color: #fdcb6e; }
}

.empty {
  padding: 24px;
  text-align: center;
  color: var(--text-muted);
  font-size: 13px;
}
</style>