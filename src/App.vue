<template>
  <div>
    <router-view/>
  </div>
</template>

<script setup>
import {onMounted} from 'vue'
import {useGameModeStore} from '@/stores/gameModeStore'

const store = useGameModeStore()

onMounted(async () => {
  await store.initializeStore()
})
//欢迎页
console.log(
    "%c两水夹明镜，双桥落彩虹。",
    "font-weight: 600; font-size: 20px; background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet); color: transparent; -webkit-background-clip: text; background-clip: text;"
);
console.log('开源地址：https://github.com/syhy0612/lrsNotes');
</script>
<style lang="scss" scoped>
</style>