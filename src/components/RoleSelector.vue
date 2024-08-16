<template>
  <el-popover
      v-model:visible="isPopoverVisible"
      placement="right"
      :width="220"
      trigger="click"
  >
    <template #reference>
      <div
          :class="hexagonClasses"
      >
        {{ currentRole || '未选' }}
      </div>
    </template>
    <div class="role-options">
      <el-button
          v-for="role in roles"
          :key="role.text"
          size="small"
          :class="[`hexagon-${role.color}`, 'role-button']"
          @click="selectRole(role.text)"
      >
        {{ role.text }}
      </el-button>
    </div>
  </el-popover>
</template>

<script setup>
import {ref, computed} from 'vue'
import {ElPopover, ElButton} from 'element-plus'

const props = defineProps({
  currentRole: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:role'])

const isPopoverVisible = ref(false)

const roles = [
  {text: '狼', color: 'red'},
  {text: '觉隐', color: 'red'},
  {text: '民', color: 'blue'},
  {text: '守', color: 'blue'},
  {text: '女', color: 'blue'},
  {text: '猎', color: 'blue'},
  {text: '镜', color: 'blue'},
  {text: '神', color: 'gold'},
  {text: '好人', color: 'gold'},
  {text: '银水', color: 'gold'},
  {text: '金水', color: 'gold'},
  {text: '警1', color: 'green'},
  {text: '警2', color: 'green'},
  {text: '警3', color: 'green'},
]

const hexagonClasses = computed(() => {
  const role = roles.find(r => r.text === props.currentRole) || {color: 'gray'}
  return [
    'hexagon',
    props.currentRole ? `hexagon-${role.color}` : 'hexagon-gray',
    props.currentRole?.length === 1 ? 'hexagon-one' : 'hexagon-two',
    {'active': isPopoverVisible.value}
  ]
})

const selectRole = (roleText) => {
  if (props.currentRole === roleText) {
    // 如果点击的是当前角色，清除选择
    emit('update:role', '')
    isPopoverVisible.value = false
  } else {
    // 如果选择了新角色
    emit('update:role', roleText)
    isPopoverVisible.value = false
  }
}

// 移除 togglePopover 函数，因为我们不再需要它
</script>

<style scoped>
.hexagon {
  margin: 0 auto 5px auto;
  width: 18px;
  height: calc(18px * 2 / 1.7321);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  font-family: 'Noto Sans SC', Arial, sans-serif !important;
  color: white;
  background-color: #c8c8c8;
  text-align: center;
  cursor: pointer;
  transition: all 0.1s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hexagon.active {
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

/* 单双字 */
.hexagon-one {
  font-size: 11px;
}

.hexagon-two {
  font-size: 8px;
}

/* 颜色 */
.hexagon-red {
  background-color: #770e3a;
}

.hexagon-blue {
  background-color: #2c779a;
}

.hexagon-gold {
  background-color: #b89534;
}

.hexagon-green {
  background-color: #006b42;
}

.hexagon-gray {
  background-color: #c8c8c8;
}


.role-options {
  display: flex;
  flex-wrap: wrap;
  gap: 5px; /* 在按钮之间添加均匀的间隔 */
  padding: 5px; /* 给整个容器添加一些内边距 */
}

.role-button {
  flex: 0 0 calc(30% - 2.5px); /* 调整为两列布局 */
  margin: 0;
  color: white;
  border: none;
  padding: 5px 0;
  text-align: center;
  font-size: 14px; /* 调整字体大小以适应按钮 */
}

.role-button:hover {
  opacity: 0.7;
}
</style>