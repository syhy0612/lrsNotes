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
  {text: 'X', color: 'green'},
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
</script>

<style scoped lang="scss">
$hexagon-size: 18px;
$hexagon-height: calc($hexagon-size * 2 / 1.7321);

@mixin hexagon-base {
  width: $hexagon-size;
  height: $hexagon-height;
  //line-height: $hexagon-height; // 设置 line-height 等于高度
  line-height: calc($hexagon-height - 1px);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  font-family: var(--noto-sans-sc), Arial, sans-serif;
  color: white;
  text-align: center;
  cursor: pointer;
  transition: all 0.1s ease;
}

.hexagon {
  @include hexagon-base;
  margin: 0 auto 5px auto;
  background-color: #c8c8c8;

  &.active {
    transform: scale(1.1);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }

  &-one {
    font-size: 11px;
  }

  &-two {
    font-size: 8px;
  }

  // 颜色变体
  @each $color, $bg-color in (
      red: #770e3a,
      blue: #2c779a,
      gold: #b89534,
      green: #006b42,
      gray: #c8c8c8
  ) {
    &-#{$color} {
      background-color: $bg-color;
    }
  }
}

.role-options {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding: 5px;
}

.role-button {
  flex: 0 0 calc(30% - 2.5px);
  margin: 0;
  color: white;
  border: none;
  padding: 5px 0;
  text-align: center;
  font-size: 14px;

  &:hover {
    opacity: 0.7;
  }
}
</style>