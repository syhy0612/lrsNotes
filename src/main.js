import './assets/main.css';
import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn';
// import AV from './api/leancloud.js'
// flexible.js v0.3.2 - 适配解决方案
import './utils/flexibleModify.js'


const app = createApp(App);
app.use(ElementPlus, {
    locale: zhCn,
});
app.use(router);
// 将 LeanCloud 实例挂载到 Vue 实例中
// app.config.globalProperties.$AV = AV;

app.mount('#syhy');
