<template>
  <div>
    <Home v-if="!isStarted" @start="isStarted = true" />
    <Main v-else @go-home="isStarted = false" />
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {useGameModeStore} from '@/stores/gameModeStore'
import Home from '@/views/home.vue'
import Main from '@/views/main.vue'

const store = useGameModeStore()
const isStarted = ref(false)

onMounted(async () => {
  await store.initializeStore()
})

// 欢迎页
console.log(
    "%c两水夹明镜，双桥落彩虹。",
    "font-weight: 600; font-size: 20px; background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet); color: transparent; -webkit-background-clip: text; background-clip: text;"
);
console.log('开源地址：https://github.com/syhy0612/lrsNotes');
</script>

<style lang="scss" scoped>
</style>