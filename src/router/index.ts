/*
 * @Author       : 卢瑶
 * @Date         : 2022-03-17 16:52:34
 * @LastEditTime : 2022-04-27 18:33:01
 * @LastEditors  : 卢瑶
 * @Description  : 路由出口文件
 * @FilePath     : /vite-vue3-ts-ly/src/router/index.ts
 */

import { GLOBAL_VARIABLE_NAME } from '@/setting/app'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/main',
    redirect: '/main/dashboard',
    name: 'main',
    component: () => import(/* webpackChunkName: "Main" */ '@/views/main/Main.vue'),
    children: []
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/login/Login.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import(/* webpackChunkName: "Not-Found" */ '@/views/not-found/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  if (!localStorage.getItem(GLOBAL_VARIABLE_NAME.TOKEN) && to.name !== 'login') {
    return '/login'
  }
})

export default router
