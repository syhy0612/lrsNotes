<template>
  <el-popover
      placement="right"
      :width="200"
      trigger="click"
      @show="showPopover"
      @hide="hidePopover"
  >
    <template #reference>
      <div
          :class="hexagonClasses"
          @click="togglePopover"
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

const isPopoverVisible = ref(false)

const hexagonClasses = computed(() => {
  const role = roles.find(r => r.text === props.currentRole) || {color: 'gray'}
  return [
    'hexagon',
    `hexagon-${role.color}`,
    props.currentRole?.length === 1 ? 'hexagon-one' : 'hexagon-two',
    {'active': isPopoverVisible.value}
  ]
})

const selectRole = (roleText) => {
  emit('update:role', roleText)
  isPopoverVisible.value = false
}

const togglePopover = () => {
  isPopoverVisible.value = !isPopoverVisible.value
}

const showPopover = () => {
  isPopoverVisible.value = true
}

const hidePopover = () => {
  isPopoverVisible.value = false
}
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
  transition: all 0.3s ease;
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
  gap: 5px;
}

.role-button {
  flex: 1 0 calc(33.333% - 5px);
  color: white;
  border: none;
}

.role-button:hover {
  opacity: 0.8;
}
</style>