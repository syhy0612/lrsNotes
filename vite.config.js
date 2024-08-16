import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import postcssPxtorem from 'postcss-pxtorem';
import { fileURLToPath, URL } from 'url';

export default defineConfig({
    server: {
        port: 8080,
    },
    base: './',
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            'element-plus': 'element-plus',
        },
    },
    css: {
        postcss: {
            plugins: [
                postcssPxtorem({
                    rootValue: 192,
                    propList: ['*'],
                }),
            ],
        },
    },
    build: {
        outDir: 'dist',
    },
    optimizeDeps: {
        include: ['element-plus/es']
    }
});