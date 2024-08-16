<template>
  <div class="search-container" ref="containerRef">
    <el-input
        v-model="searchTerm"
        placeholder="搜索版型..."
        @input="handleInput"
        @focus="handleFocus"
        @clear="handleClear"
        class="custom-input"
        clearable
    >
      <template #suffix>
        <el-icon class="dropdown-icon" @click="toggleDropdown">
          <ArrowDown :class="{ 'is-reverse': showDropdown }" />
        </el-icon>
      </template>
    </el-input>

    <div v-show="showDropdown" class="dropdown">
      <div v-if="filteredFavorites.length > 0" class="favorites-section">
        <div class="section-title">收藏</div>
        <div
            v-for="item in filteredFavorites"
            :key="item.id"
            class="dropdown-item favorite"
            @click="selectItem(item)"
        >
          <span>{{ item.name }}</span>
          <el-icon
              class="favorite-icon"
              @click.stop="toggleFavorite(item)"
          >
            <StarFilled />
          </el-icon>
        </div>
      </div>

      <div v-if="filteredOthers.length > 0" class="others-section">
        <div class="section-title">其他</div>
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

      <div v-if="filteredFavorites.length === 0 && filteredOthers.length === 0" class="no-results">
        没有匹配结果
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Search, Star, StarFilled, ArrowDown } from '@element-plus/icons-vue';

const searchTerm = ref('');
const showDropdown = ref(false);
const selectedItem = ref(null);
const containerRef = ref(null);

const allItems = ref([
  { id: 1, name: '狼美人骑士', pinyin: 'lmrqs' },
  { id: 2, name: '觉醒之夜', pinyin: 'jxzy' },
  { id: 3, name: '觉醒孤独少女', pinyin: 'jxgdsn' },
  { id: 4, name: '觉醒狼王', pinyin: 'jxlw' },
  { id: 5, name: '迷雾鸦影', pinyin: 'mwyy' },
  { id: 6, name: '咒狐乌鸦', pinyin: 'zhwy' },
  { id: 7, name: '孤独少女', pinyin: 'gdsn' },
  { id: 8, name: '永序之轮', pinyin: 'yxzl' },
  { id: 9, name: '狼王守卫', pinyin: 'lwsw' },
  { id: 10, name: '寻香识命', pinyin: 'xxsm' },
  { id: 11, name: '猎日逐光', pinyin: 'lrzg' },
  { id: 12, name: '时波之乱', pinyin: 'sbzl' },
  { id: 13, name: '纯白夜影', pinyin: 'cbyy' },
  { id: 14, name: '动物梦境', pinyin: 'dwmj' },
  { id: 15, name: '白狼王守卫', pinyin: 'blwsw' },
  { id: 16, name: '狼王摄梦人', pinyin: 'lwsmr' },
  { id: 17, name: '狼王魔术师', pinyin: 'lwmss' },
  { id: 18, name: '恶夜骑士', pinyin: 'eyqs' },
  { id: 19, name: '白狼王骑士', pinyin: 'blwqs' },
  { id: 20, name: '石像鬼守墓人', pinyin: 'sxgsmr' },
  { id: 21, name: '赤月猎魔人', pinyin: 'cylmr' },
  { id: 22, name: '噩梦之影', pinyin: 'emzy' },
  { id: 23, name: '觉醒女巫', pinyin: 'jxnw' },
  { id: 24, name: '标准场', pinyin: 'bzc' },
  { id: 25, name: '奇迹商人', pinyin: 'qjsr' },
  { id: 26, name: '镜隐迷踪', pinyin: 'jymz' },
  { id: 27, name: '丘比特场', pinyin: 'qbtc' }
]);

const favorites = ref([]);

const toggleFavorite = (item) => {
  const index = favorites.value.findIndex(fav => fav.id === item.id);
  if (index > -1) {
    favorites.value.splice(index, 1);
  } else {
    favorites.value.push(item);
  }
};

const handleInput = () => {
  if (searchTerm.value) {
    showDropdown.value = true;
  }
};

const handleFocus = () => {
  showDropdown.value = true;
};

const handleClear = () => {
  searchTerm.value = '';
  selectedItem.value = null;
  // 保持下拉框的当前状态
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const selectItem = (item) => {
  selectedItem.value = item;
  searchTerm.value = item.name;
  showDropdown.value = false;
};

const filteredItems = computed(() => {
  const term = searchTerm.value.toLowerCase();
  return allItems.value.filter(item =>
      item.name.toLowerCase().includes(term) ||
      item.pinyin.includes(term)
  );
});

const filteredFavorites = computed(() => {
  return filteredItems.value.filter(item => favorites.value.some(fav => fav.id === item.id));
});

const filteredOthers = computed(() => {
  return filteredItems.value.filter(item => !favorites.value.some(fav => fav.id === item.id));
});

const handleClickOutside = (event) => {
  if (containerRef.value && !containerRef.value.contains(event.target)) {
    showDropdown.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.search-container {
  position: relative;
  width: 300px;
  font-family: Arial, sans-serif;
}

.custom-input :deep(.el-input__wrapper) {
  padding-right: 30px;
}

.custom-input :deep(.el-input__suffix) {
  right: 5px;
}

.dropdown-icon {
  cursor: pointer;
  transition: transform 0.3s;
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
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
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
  background-color: #ecf5ff;
}

.favorite-icon {
  color: #409eff;
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