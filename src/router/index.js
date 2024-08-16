import {createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '../views/home.vue'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL), routes: [{
        path: '/', redirect: '/home'
    }, {
        path: '/login', name: 'login', component: () => import('../views/login.vue')
    }, {
        path: '/home', name: 'home', component: HomeView
    }, {
        path: '/board', name: 'board', component: () => import('../views/main.vue')
    }, {
        path: '/test', name: 'test', component: () => import('../components/searchTypes.vue')
    }, {
        path: '/old', name: 'old', component: () => import('../views/old.vue')
    }, {
        path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/notFound.vue')
    }]
})

router.afterEach((to, from) => {
    /*    const userStore = useUserStore()
        if (!userStore.isLoggedIn && to.name !== 'login') {
            // 如果是未登录状态，3秒后跳转到登录页
            setTimeout(() => {
                router.push({name: 'login'})
            }, 3000)
        }*/
    if (to.name === 'NotFound') {
        setTimeout(() => {
            router.push({name: 'home'})
        }, 3000)
    }
})

export default router