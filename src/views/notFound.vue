<template>
  <div class="not-found">
    <div class="icon">🌙</div>
    <h1>页面不存在</h1>
    <p>3秒后自动返回</p>
  </div>
</template>

<style scoped>
.not-found {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fafafa;
}
.icon { font-size: 48px; margin-bottom: 12px; }
h1 { font-size: 20px; color: #1d1d1f; margin-bottom: 6px; }
p { color: #aeaeb2; font-size: 13px; }
</style>