<template>
  <div class="home">
    <div class="content">
      <img src="/logo.svg" alt="logo" class="logo">
      <h1 class="title">在线笔记</h1>
      <p class="subtitle">快速记录 · 智能标记 · 一键导出</p>
      <div class="btn-group">
        <button class="start-btn start-btn--wolf" @click="$emit('start', 'werewolf')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><circle cx="9" cy="10" r="1"/><circle cx="15" cy="10" r="1"/></svg>
          狼人杀
        </button>
        <button class="start-btn start-btn--spy" @click="$emit('start', 'spy')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          谁是卧底
        </button>
      </div>
      <div class="links">
        <a href="https://github.com/syhy0612/lrsNotes" target="_blank">GitHub</a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['start'])
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
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.1));
}

.title {
  font-size: 32px;
  font-weight: 700;
  color: #1d1d1f;
  letter-spacing: 2px;
  margin-bottom: 8px;
  /* Use system font stack for title to avoid font-swap flash */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}

.subtitle {
  font-size: 13px;
  font-weight: 400;
  color: #aeaeb2;
  letter-spacing: 2px;
  text-indent: 2px; /* Fix centering offset caused by letter-spacing */
  margin-top: 0;
  margin-bottom: 24px;
  line-height: 18px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}

.btn-group {
  display: flex;
  gap: 14px;
  justify-content: center;
  margin-top: 32px;
}

.start-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border: none;
  border-radius: 24px;
  color: white;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 1px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  }

  &:active { transform: translateY(0); }

  &--wolf {
    background: #1d1d1f;
    &:hover { background: #333; }
  }

  &--spy {
    background: #5856d6;
    &:hover { background: #6e6ceb; }
  }
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

@media (max-width: 400px) {
  .btn-group {
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
}
</style>