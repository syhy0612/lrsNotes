# 前言

::: tip 在线使用👉
http://lrsnotes.cc/board
:::

这是一个专为狼人杀玩家设计的工具，方便玩家记录发言信息并导出，提高游戏体验。

## ✨ 特点

<div class="feature-grid">

<div class="feature-card">

### 💾 自动保存

笔记信息自动保存，无需担心数据丢失。

</div>

<div class="feature-card">

### 📜 版型选择

支持官方多种游戏版型，适应不同场景。

</div>

<div class="feature-card">

### ⚡ 快捷记录

一键记录关键起跳信息，操作更便捷。

</div>

<div class="feature-card">

### 📤 导出功能

轻松导出游戏记录，方便赛后复盘。

</div>

</div>

<style>
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-top: 2rem;
}

.feature-card {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px 0 rgba(0,0,0,0.1);
}

.feature-card h3 {
  margin-top: 0;
  margin-bottom: 10px;
  color: var(--vp-c-brand);
}

@media (max-width: 640px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>