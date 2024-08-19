<template>
  <div class="search-container" ref="containerRef">
    <!-- 使用Element Plus的el-input组件作为搜索输入框 -->
    <el-input
        v-model="searchTerm"
        placeholder="搜索版型..."
        @input="handleInput"
        @focus="handleFocus"
        @clear="handleClear"
        class="custom-input"
        :prefix-icon="Search"
        clearable
    >
      <template #suffix>
        <el-icon class="dropdown-icon" @click="toggleDropdown">
          <ArrowDown :class="{ 'is-reverse': showDropdown }"/>
        </el-icon>
      </template>
    </el-input>

    <!-- 下拉框，使用v-show控制显示/隐藏 -->
    <div v-show="showDropdown" class="dropdown">
      <!-- 收藏部分 -->
      <div v-if="filteredFavorites.length > 0" class="favorites-section">
        <div class="section-title">收藏</div>
        <!-- 遍历显示收藏的项目 -->
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

      <!-- 其他项目部分 -->
      <div v-if="filteredOthers.length > 0" class="others-section">
        <div class="section-title">其他</div>
        <!-- 遍历显示非收藏的项目 -->
        <div
            v-for="item in filteredOthers"
            :key="item.id"
            class="dropdown-item"
            @click="selectItem(item)"
        >
          <span>{{ item.name }}</span>
          <!-- 收藏图标，点击可添加到收藏 -->
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
        没有匹配结果
      </div>
    </div>
  </div>
</template>

<script setup>
// 导入Vue 3的组合式API
import { ref, computed, onMounted, onUnmounted } from 'vue';
// 导入Element Plus的图标组件
import { Search, Star, StarFilled, ArrowDown } from '@element-plus/icons-vue';

// 定义响应式变量
const searchTerm = ref(''); // 搜索输入
const showDropdown = ref(false); // 控制下拉框显示
const selectedItem = ref(null); // 当前选中的项目
const containerRef = ref(null); // 容器的DOM引用

// 定义所有可选项
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

// 收藏列表
const favorites = ref([]);

// 切换收藏状态的函数
const toggleFavorite = (item) => {
  const index = favorites.value.findIndex(fav => fav.id === item.id);
  if (index > -1) {
    favorites.value.splice(index, 1);
  } else {
    favorites.value.push(item);
  }
};

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
  selectedItem.value = null;
};

// 切换下拉框显示状态
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

// 选择项目的函数
const selectItem = (item) => {
  selectedItem.value = item;
  searchTerm.value = item.name;
  // 不自动关闭下拉框，让用户自己决定何时关闭
};

// 计算属性：过滤后的项目列表
const filteredItems = computed(() => {
  const term = searchTerm.value.toLowerCase();
  return allItems.value.filter(item =>
      item.name.toLowerCase().includes(term) ||
      item.pinyin.includes(term)
  );
});

// 计算属性：过滤后的收藏项目
const filteredFavorites = computed(() => {
  return filteredItems.value.filter(item => favorites.value.some(fav => fav.id === item.id));
});

// 计算属性：过滤后的非收藏项目
const filteredOthers = computed(() => {
  return filteredItems.value.filter(item => !favorites.value.some(fav => fav.id === item.id));
});

// 处理外部点击事件，关闭下拉框
const handleClickOutside = (event) => {
  if (containerRef.value && !containerRef.value.contains(event.target)) {
    showDropdown.value = false;
  }
};

// 组件挂载时添加点击事件监听器
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

// 组件卸载时移除点击事件监听器
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