<template>
  <div class="search-container" ref="containerRef">
    <el-input
      v-model="searchTerm"
      placeholder="搜索版型..."
      @input="handleInput"
      @focus="handleFocus"
      class="custom-input"
      :prefix-icon="Search"
      @clear="handleClear"
    >
      <template #suffix>
        <div class="suffix-container">
          <el-icon
            v-if="searchTerm"
            class="clear-icon el-input__clear"
            @click="handleClear"
          >
            <CircleClose />
          </el-icon>
          <el-icon
            class="dropdown-icon"
            @mousedown.prevent="handleIconClick"
            :class="{ 'is-reverse': showDropdown }"
          >
            <ArrowDown />
          </el-icon>
        </div>
      </template>
    </el-input>

    <div v-if="store.isInitialized" v-show="showDropdown" class="dropdown">
      <!-- 收藏部分 -->
      <div v-if="filteredFavorites.length > 0" class="favorites-section">
        <div class="section-title">收藏版型</div>
        <div
          v-for="item in filteredFavorites"
          :key="item.id"
          class="dropdown-item favorite"
          @click="selectItem(item)"
        >
          <span>{{ item.name }}</span>
          <!-- 收藏图标，点击可切换收藏状态 -->
          <el-icon
            class="favorite-icon"
            @click.stop="toggleFavorite(item)"
          >
            <StarFilled />
          </el-icon>
        </div>
      </div>

      <div v-if="filteredOthers.length > 0" class="others-section">
        <div class="section-title">全部版型</div>
        <div
          v-for="item in filteredOthers"
          :key="item.id"
          class="dropdown-item"
          @click="selectItem(item)"
        >
          <span>{{ item.name }}</span>
          <el-icon
            class="favorite-icon"
            @click.stop="toggleFavorite(item)"
          >
            <Star />
          </el-icon>
        </div>
      </div>

      <!-- 没有搜索结果时显示的信息 -->
      <div v-if="filteredFavorites.length === 0 && filteredOthers.length === 0" class="no-results">
        没有匹配版型
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch} from 'vue';
import {Search, Star, StarFilled, ArrowDown, CircleClose} from '@element-plus/icons-vue';
import {useGameModeStore} from '@/stores/gameModeStore';
import {storeToRefs} from 'pinia';

const store = useGameModeStore();
const {gameModes, isInitialized} = storeToRefs(store);

// 定义响应式变量
const searchTerm = ref('');
const showDropdown = ref(false);
const containerRef = ref(null);

// 过滤后的项目列表
const filteredItems = computed(() => {
  if (!gameModes.value) return [];
  const term = searchTerm.value.toLowerCase();
  return gameModes.value.filter(item =>
      item.name.toLowerCase().includes(term) ||
      item.pinyin.includes(term)
  );
});

// 过滤后的收藏项目
const filteredFavorites = computed(() => filteredItems.value.filter(item => item.isFavorite));

// 过滤后的非收藏项目
const filteredOthers = computed(() => filteredItems.value.filter(item => !item.isFavorite));

// 处理输入事件
const handleInput = () => {
  if (searchTerm.value) {
    showDropdown.value = true;
  }
};

// 处理聚焦事件
const handleFocus = () => {
  showDropdown.value = true;
};

// 处理清除事件
const handleClear = () => {
  searchTerm.value = '';
  showDropdown.value = false;
};

const handleIconClick = () => {
  showDropdown.value = !showDropdown.value;
};

// 选择项目的函数
const selectItem = (item) => {
  store.selectMode(item.id);
  searchTerm.value = item.name;
  showDropdown.value = false;
};

// 切换收藏状态的函数
const toggleFavorite = (item) => {
  store.toggleFavorite(item.id);
};

// 处理外部点击事件，关闭下拉框
const handleClickOutside = (event) => {
  if (containerRef.value && !containerRef.value.contains(event.target)) {
    showDropdown.value = false;
  }
};

// 组件挂载时添加点击事件监听器
onMounted(async () => {
  document.addEventListener('click', handleClickOutside);
  if (!store.isInitialized) {
    await store.initializeStore();
  }
  if (store.selectedMode) {
    searchTerm.value = store.selectedMode.name;
  }
});

// 组件卸载时移除点击事件监听器
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

// 监听 gameModes 的变化
watch(gameModes, (newGameModes) => {
  if (newGameModes && newGameModes.length > 0 && store.selectedMode) {
    searchTerm.value = store.selectedMode.name;
  }
});

</script>

<style scoped>
.search-container {
  position: relative;
  width: 200px;
  font-family: Arial, sans-serif;
}

.custom-input :deep(.el-input__wrapper) {
  padding-right: 12px;
}

.custom-input :deep(.el-input__suffix) {
  right: 5px;
}

.suffix-container {
  display: flex;
  align-items: center;
}

.clear-icon {
  margin-right: 8px;
  font-size: 14px;
  color: #c0c4cc;
  cursor: pointer;
}

.dropdown-icon {
  cursor: pointer;
  transition: transform 0.3s;
  font-size: 14px;
  color: #c0c4cc;
}

.dropdown-icon.is-reverse {
  transform: rotate(180deg);
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.section-title {
  padding: 8px 12px;
  font-weight: bold;
  background-color: #f5f7fa;
  color: #606266;
}

.dropdown-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.dropdown-item:hover {
  background-color: #f5f7fa;
}

.favorite {
  background-color: #fff6e0;
}

.favorite-icon {
  color: #ffcc00;
  font-size: 18px;
  transition: all 0.3s;
}

.favorite-icon:hover {
  transform: scale(1.2);
}

.no-results {
  padding: 8px 12px;
  color: #909399;
  text-align: center;
}
</style>