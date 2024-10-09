<template>
  <el-popover
      v-model:visible="isPopoverVisible"
      :placement="popoverPlacement"
      :width="160"
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
import {useGameModeStore} from '@/stores/gameModeStore'
import {storeToRefs} from 'pinia'

const props = defineProps({
  currentRole: {
    type: String,
    default: ''
  },
  placement: {
    type: String,
    default: 'right'
  }
})

const popoverPlacement = computed(() => props.placement)

const emit = defineEmits(['update:role'])

const isPopoverVisible = ref(false)

const store = useGameModeStore()
const {selectedMode} = storeToRefs(store)

const roles = computed(() => {
  const modeRoles = selectedMode.value?.roles || []
  return [
    ...modeRoles,
    {text: '神', color: 'gold'},
    {text: '好人', color: 'gold'},
    {text: '金水', color: 'gold'},
    {text: '银水', color: 'gold'},
    {text: '警1', color: 'green'},
    {text: '警2', color: 'green'},
    {text: '警3', color: 'green'},
    {text: 'X', color: 'green'},
    {text: '你', color: 'purple'}
  ]
})

const hexagonClasses = computed(() => {
  const role = roles.value.find(r => r.text === props.currentRole) || {color: 'gray'}
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
$hexagon-height: calc(#{$hexagon-size} * 2 / 1.7321);

@mixin hexagon-base {
  width: $hexagon-size;
  height: $hexagon-height;
  //line-height: calc($hexagon-height - 1px);
  line-height: $hexagon-height;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  font-family: var(--noto-sans-sc), Arial, sans-serif;
  color: white;
  text-align: center;
  cursor: pointer;
  transition: all 0.1s ease;
  user-select: none;
}

.hexagon {
  @include hexagon-base;
  margin: 0 auto 5px auto;
  background-color: #c8c8c8;
  white-space: nowrap; // 禁止换行

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
      purple: #c616c5,
      gray: #c8c8c8
  ) {
    &-#{"#{$color}"} {
      background-color: $bg-color;
    }
  }
}

.role-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 每行3个按钮
  gap: 5px; // 按钮之间的间距
  padding: 5px;
}

.role-button {
  color: white;
  border: none;
  padding: 5px 0;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  box-sizing: border-box;
  width: 100%; // 确保按钮宽度一致
  white-space: nowrap; // 防止文字换行
  overflow: hidden; // 防止内容溢出
  text-overflow: ellipsis; // 溢出显示省略号
  margin-left: 0 !important; // 确保布局正常


  &:hover {
    opacity: 0.7;
  }
}

@media screen and (max-width: 768px) {
  .hexagon {
    width: 14px;
    height: calc(14px * 2 / 1.7321);
    line-height: calc(14px * 2 / 1.7321 - 0.5px);

    &-one {
      font-size: 8px;
    }

    &-two {
      font-size: 6px;
    }
  }

  .role-options {
    gap: 5px;
    padding: 2px;
  }

  .role-button {
    font-size: 12px;
    padding: 3px 0;
  }
}
</style>