import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: "狼人杀在线笔记",
  description: "为狼人杀游戏玩家设计的在线笔记工具",
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '使用指南', link: '/guide/' },
      { text: '功能介绍', link: '/features/' },
      { text: '待开发功能', link: '/todo/' },
      { text: '关于项目', link: '/about/' },
    ],

    sidebar: [
      {
        text: '使用指南',
        items: [
          { text: '快速开始', link: '/guide/' },
        ]
      },
      {
        text: '功能介绍',
        items: [
          { text: '自动保存', link: '/features/#自动保存笔记信息' },
          { text: '版型选择', link: '/features/#官狼各游戏版型选择' },
          { text: '快捷记录', link: '/features/#快捷记录起跳关键信息' },
        ]
      },
      {
        text: '待开发功能',
        link: '/todo/'
      },
      {
        text: '关于项目',
        link: '/about/'
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/syhy0612/lrsNotes' }
    ],

    footer: {
      message: '基于 MIT 许可发布',
      copyright: `Copyright © 2024-present <a href="https://github.com/syhy0612" target="_blank">syhy0612</a> | <a href="https://beian.miit.gov.cn" target="_blank">湘ICP备2024080657号-1</a>`
    }
  }
})