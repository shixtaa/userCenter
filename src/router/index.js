import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/login.vue')
    },
    {
        path: '/regist',
        name: 'regist',
        component: () =>
            import ('../views/regist.vue')
    },
    {
        path: '/user',
        name: 'user',
        redirect: '/user/tabuser',
        component: () =>
            import ('../views/user.vue'),
        children: [{
                path: 'tabmail',
                name: 'tabmail',
                component: () =>
                    import ('../components/mail.vue'),
            }, {
                path: 'tabuser',
                name: 'tabuser',
                component: () =>
                    import ('../components/user.vue'),
                children: [{
                        path: 'userinfo',
                        name: 'userinfo',
                        component: () =>
                            import ('../components/userInfo.vue'),
                    },
                    {
                        path: 'changerecord',
                        name: 'changerecord',
                        component: () =>
                            import ('../components/changeRecord.vue'),
                    }
                ]
            }

        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
        return originalPush.call(this, location).catch(err => err)
    }
    /* 路由守卫*/
router.beforeEach((to, from, next) => {
    if (to.name !== 'login' && to.name !== 'regist') {
        let result = localStorage.getItem('userInfo') || ''
        if (!result) {
            next({
                name: 'login'
            })
        } else {
            next()
        }
    } else {
        next()
    }
})
export default router