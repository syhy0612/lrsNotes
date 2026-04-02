import './assets/main.css';
import {createApp} from 'vue';
import {createPinia} from 'pinia'
import App from './App.vue';

const pinia = createPinia()
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn';

const app = createApp(App);
app.use(ElementPlus, {
    locale: zhCn,
});
app.use(pinia);

app.mount('#app');
