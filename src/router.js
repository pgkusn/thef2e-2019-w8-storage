import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/folders/:id',
            name: 'folder',
            component: () => import('./views/Folders.vue')
        },
        {
            path: '/',
            name: 'home',
            component: () => import('./views/Files.vue')
        },
    ]
})
