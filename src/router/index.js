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
        path: '/add', name: 'add', component: () => import('../views/testMain.vue')
    }, {
        path: '/old', name: 'old', component: () => import('../views/old.vue')
    }, {
        path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/notFound.vue')
    }]
})

router.afterEach((to, from) => {
    if (to.name === 'NotFound') {
        setTimeout(() => {
            router.push({name: 'home'})
        }, 3000)
    }
})

export default router