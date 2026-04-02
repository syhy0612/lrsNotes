<template>
  <div class="page" :style="bgStyle">
    <div v-if="isWechatBrowser">
      <img src="../assets/wechat_bg.jpg" alt="请点击右上角，选择在浏览器中打开" class="wechat_bg">
    </div>
    <div v-else class="container">
      <Board @go-home="$emit('go-home')"/>
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue'
const emit = defineEmits(['go-home'])
import Board from '../components/board.vue'
import {useDeviceDetect} from '@/composables/useDeviceDetect'
import {useBackground} from '@/composables/useBackground'

const {isWechatBrowser} = useDeviceDetect()
const {backgroundImage} = useBackground()

const bgStyle = computed(() => {
  if (!backgroundImage.value) return {}
  return {
    backgroundImage: `url(${backgroundImage.value})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed'
  }
})
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: var(--bg-primary);
  transition: background 0.3s;
}

.container {
  display: flex;
  justify-content: center;
  padding: 12px 0;
  min-height: 100vh;
}

.wechat_bg {
  width: 100%;
  height: auto;
}
</style>