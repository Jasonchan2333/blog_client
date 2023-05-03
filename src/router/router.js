import { createRouter, createWebHistory } from "vue-router"

const routes = [{
        path: '/home',
        component: () =>
            import ('../views/HomeView.vue')
    },
    {
        path: "/login",
        component: () =>
            import ('../views/LoginView.vue')
    },
    {
        path: "/dashboard",
        component: () =>
            import ('../views/dashBoard/DashBoardView.vue'),
        children: [
            { path: "/dashboard/category", component: () =>
                    import ("../views/dashBoard/Category.vue") },
            { path: "/dashboard/article", component: () =>
                    import ("../views/dashBoard/Article.vue") }
        ]

    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 创建router实例对象并暴露
export default router