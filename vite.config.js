import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers';
import postcssPxtorem from 'postcss-pxtorem';
import {fileURLToPath, URL} from 'url';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 8080,
    },
    base: '/board/',
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        svgLoader({
            svgoConfig: {
                multipass: true,
            },
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
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
        include: ['element-plus/es'],
    },
});