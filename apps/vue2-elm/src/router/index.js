import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "login" */ '@/views/login/Login.vue')
    },
    {
        path: '/city/:cityid',
        component: () =>
            import ( /* webpackChunkName: "city" */ '@/views/city/City.vue')
    },
    {
        path: '/msite',
        component: () =>
            import ( /* webpackChunkName: "msite" */ '@/views/msite/Msite.vue'),
        meta: { keepAlive: true }
    },
    {
        path: '/profile',
        component: () =>
            import ( /* webpackChunkName: "profile" */ '@/views/profile/Profile.vue'),
        children: [{
            path: 'info',
            component: () =>
                import ( /* webpackChunkName: "info" */ '@/views/profile/children/Info.vue'),
            children: [{
                path: 'setusername',
                component: () =>
                    import ( /* webpackChunkName: "setusername" */ '@/views/profile/children/children/SetUsername.vue'),
            }, {
                path: 'address',
                component: () =>
                    import ( /* webpackChunkName: "profile-address" */ '@/views/profile/children/children/Address.vue'),
                children: [{
                    path: 'add',
                    component: () =>
                        import ( /* webpackChunkName: "add" */ '@/views/profile/children/children/children/Add.vue'),
                    children: [{
                        path: 'addDetail',
                        component: () =>
                            import ( /* webpackChunkName: "adddetail" */ '@/views/profile/children/children/children/children/AddDetail.vue'),
                    }]
                }]
            }]
        }]
    },
    {
        path: '/forget',
        component: () =>
            import ( /* webpackChunkName: "forget" */ '@/views/forget/Forget.vue')
    }, {
        path: '/balance',
        component: () =>
            import ( /* webpackChunkName: "balance" */ '@/views/balance/Balance.vue'),
        children: [{
            path: 'detail',
            component: () =>
                import ( /* webpackChunkName: "detail" */ '@/views/balance/children/Detail.vue')
        }]
    }, {
        path: '/benefit',
        component: () =>
            import ( /* webpackChunkName: "benefit" */ '@/views/benefit/Benefit.vue'),
        children: [{
            path: 'hbDescription',
            component: () =>
                import ( /* webpackChunkName: "hbDescription" */ '@/views/benefit/children/HbDescription.vue')
        }, {
            path: 'exchange',
            component: () =>
                import ( /* webpackChunkName: "exchange" */ '@/views/benefit/children/Exchange.vue')
        }, {
            path: 'commend',
            component: () =>
                import ( /* webpackChunkName: "commend" */ '@/views/benefit/children/Commend.vue')
        }, {
            path: 'hbHistory',
            component: () =>
                import ( /* webpackChunkName: "hbHistory" */ '@/views/benefit/children/HbHistory.vue')
        }, {
            path: '/download',
            component: () =>
                import ( /* webpackChunkName: "download" */ '@/views/download/Download.vue')
        }]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router