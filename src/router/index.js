import {createRouter, createWebHistory} from 'vue-router';

const routes = [
    {path: '/', name: 'board', component: () => import('../views/main.vue')},
    {path: '/home', name: 'home', component: () => import('../views/home.vue')},
    {path: '/board', redirect: '/'},
    {path: '/full', redirect: '/'},
    {path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/notFound.vue')}
];

if (import.meta.env.DEV) {
    routes.splice(-1, 0,
        {path: '/old', name: 'old', component: () => import('../views/old.vue')}
    );
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

router.afterEach((to) => {
    if (to.name === 'NotFound') {
        setTimeout(() => router.push({name: 'board'}), 3000);
    }
});

export default router;