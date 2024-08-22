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
console.log("%c欢迎！", "color: purple; font-weight: 1000; font-size: 24px;");
console.log('https://github.com/syhy0612/lrsNotes');
</script>
<style lang="scss" scoped>
</style>