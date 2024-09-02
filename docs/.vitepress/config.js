import {defineConfig} from 'vitepress'

import gitee from '../public/gitee.js';

export default defineConfig({
    base: '/',
    lang: 'zh-CN',
    title: "狼人杀在线笔记",
    description: "为狼人杀游戏玩家设计的在线笔记工具",
    themeConfig: {
        logo: {
            light: '/logo.svg',
            dark: '/logo-dark.svg'
        },
        nav: [
            {text: '主页', link: '/'},
            {text: '简介', link: '/guide/'},
            {text: '功能介绍', link: '/features/'},
            {text: '待开发功能', link: '/todo/'},
            {text: '关于项目', link: '/about/'},
        ],

        sidebar: [
            {
                text: '简介',
                items: [
                    {text: '前言', link: '/guide/'},
                ]
            },
            {
                text: '功能介绍',
                items: [
                    {text: '自动保存', link: '/features/#💾-添加自动保存笔记信息'},
                    {text: '版型选择', link: '/features/#📜-官狼各游戏版型选择'},
                    {text: '快捷记录', link: '/features/#⚡-快捷记录起跳关键信息'},
                    {text: '导出记录', link: '/features/#⚡-导出游戏记录信息'},
                ]
            },
            {
                text: '关于项目',
                link: '/about/'
            }
        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/syhy0612/lrsNotes'},
            {icon: {svg: gitee}, link: 'https://gitee.com/syhy0612/lrsNotes'}
        ],

        footer: {
            message: `基于 <a href="https://opensource.org/license/MIT" target="_blank">MIT</a> 许可发布`,
            copyright: `版权所有 © 2024 <a href="https://github.com/syhy0612" target="_blank">syhy0612</a> | <a href="https://beian.miit.gov.cn" target="_blank">湘ICP备2024080657号-1</a>`
        },

        docFooter: {
            // prev: '上一页',
            // next: '下一页'
            prev: false,
            next: false
        },

        outline: {
            label: '页面导航'
        },

        langMenuLabel: '多语言',
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式'
    },
    appearance: 'auto',
    head: [
        ['link', {rel: 'icon', type: 'image/svg+xml', href: '/logo.svg'}]
    ],
})