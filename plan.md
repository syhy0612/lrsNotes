# 计划结构及步骤

## 结构

### 布局

```lua
src -- 源码目录
├── api -- 网络请求定义
│   └── leanCloud.js -- LeanCloud 请求定义
├── assets -- 静态图片资源文件
├── components -- 通用组件封装
│   └── GamePanel.vue -- 游戏面板组件
├── router -- vue-router路由配置
│   └── index.js -- 路由入口文件
├── store -- vuex的状态管理
│   ├── auth.js -- 认证状态
│   └── game.js -- 游戏状态
├── styles -- 全局css样式
│   └── global.css -- 全局样式
├── utils -- 工具类
│   └── leanCloud.js -- LeanCloud 工具函数
└── views -- 前端页面
    ├── Home.vue -- 首页
    ├── Login.vue -- 登录页
    └── Game.vue -- 游戏面板页
```

## 步骤

### 1. 创建项目

此处省略

### 2. 添加数据库存储用户登录及笔记信息

该项目使用 LeanCloud 作为数据库存储平台实现用户登录及笔记信息存储。

登录密匙存储在本地`.env`里，在`.gitignore`里忽略