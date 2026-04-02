<template>
  <div class="home">
    <div class="content">
      <img src="/logo.svg" alt="logo" class="logo">
      <h1 class="title">狼人杀<span class="thin">在线笔记</span></h1>
      <p class="desc">快速记录 · 智能标记 · 一键导出</p>
      <button class="start-btn" @click="$emit('start')">
        开始游戏
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </button>
      <div class="links">
        <a href="https://github.com/syhy0612/lrsNotes" target="_blank">GitHub</a>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['start'])
</script>

<style lang="scss" scoped>
.home {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafa;
}

.content { text-align: center; }

.logo {
  width: 90px;
  height: auto;
  margin-bottom: 12px;
  /* Add subtle shadow if needed */
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.1));
}

.title {
  font-size: 36px;
  font-weight: 700;
  color: #1d1d1f;
  letter-spacing: 2px;
  margin-bottom: 4px;

  .thin {
    display: block;
    font-size: 18px;
    font-weight: 400;
    color: #6e6e73;
    letter-spacing: 6px;
    margin-top: 4px;
  }
}

.desc {
  color: #aeaeb2;
  font-size: 13px;
  letter-spacing: 2px;
  margin-bottom: 32px;
}

.start-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 32px;
  border: none;
  border-radius: 24px;
  background: #1d1d1f;
  color: white;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 1px;

  &:hover {
    background: #333;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  }

  &:active { transform: translateY(0); }
}

.links {
  margin-top: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #d1d1d6;
  font-size: 12px;

  a {
    color: #aeaeb2;
    text-decoration: none;
    &:hover { color: #6e6e73; }
  }
}
</style>