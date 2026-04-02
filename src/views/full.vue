<template>
  <div class="full-view">
    <Board/>
  </div>
</template>

<script setup>
import Board from '../components/board-full.vue'
</script>

<style lang="scss" scoped>
.full-view {
  background: var(--bg-primary);
  min-height: 100vh;
}
</style>