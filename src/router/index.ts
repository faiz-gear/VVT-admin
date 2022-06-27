/*
 * @Author       : 卢瑶
 * @Date         : 2022-03-17 16:52:34
 * @LastEditTime : 2022-06-27 16:32:12
 * @LastEditors  : 卢瑶
 * @Description  : 路由出口文件
 * @FilePath     : /vvt-admin/src/router/index.ts
 */

import useStorage from '@/hooks/storage'
import { GLOBAL_VARIABLE_NAME } from '@/setting/variable-setting'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const storage = useStorage()

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
  if (!storage.getItem(GLOBAL_VARIABLE_NAME.TOKEN) && to.name !== 'login') {
    return '/login'
  }
})

export function resetRouter(asyncRoutes: RouteRecordRaw[]) {
  asyncRoutes.forEach((route) => {
    router.removeRoute(route.name!)
  })
}

export default router
