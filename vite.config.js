import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import components from 'unplugin-vue-components/vite';
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers';
import postcssPxtorem from 'postcss-pxtorem';
import {fileURLToPath, URL} from 'url';

export default defineConfig({
    server: {
        port: 8080,
    }, base: './', plugins: [vue(), components({
        resolvers: [ElementPlusResolver()],
    }),], resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    }, css: {
        postcss: {
            plugins: [postcssPxtorem({
                rootValue: 192, // 设计稿宽度的一半 / 10
                propList: ['*'], // 需要转换的属性列表
            })],
        },
    }, build: {
        outDir: 'dist',
    },
});
