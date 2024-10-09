import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/home.vue';
import Board from '../views/main.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), routes: [{
        path: '/login', name: 'login', component: () => import('../views/login.vue')
    }, {
        path: '/', name: 'board', component: Board
    }, {
        path: '/home', name: 'home', component: HomeView
    }, {
        path: '/test', name: 'test', component: () => import('../components/searchTypes.vue')
    }, {
        path: '/full', name: 'full', component: () => import('../views/full.vue')
    }, {
        path: '/add', name: 'add', component: () => import('../views/testMain.vue')
    }, {
        path: '/old', name: 'old', component: () => import('../views/old.vue')
    }, {
        path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/notFound.vue')
    }]
});

// 在每次导航完成后执行
router.afterEach((to, from) => {
    if (to.path === '/board') {
        // 如果导航到了 /board，立即重定向到根路径
        router.push('/');
    }

    if (to.name === 'NotFound') {
        // 设置3秒后重定向到主页
        setTimeout(() => {
            router.push({name: 'board'});
        }, 3000);
    }
});

export default router;