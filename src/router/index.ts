import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: () => import('../views/SignInView.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/user/UserIndex.vue'),
      children: [
        {
          path: '',
          name: 'userInfo',
          component: () => import('../views/user/UserView.vue'),
        },
        {
          path: 'myOrder',
          name: 'myOrder',
          component: () => import('../views/user/MyOrder.vue'),
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      redirect: '/login'
    }
  ]
})

export default router
