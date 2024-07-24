import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';


const app = createApp(App);
app.use(ElementPlus, {
    locale: zhCn,
});
app.use(router);

app.mount('#app');
