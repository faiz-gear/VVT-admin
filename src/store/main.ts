/*
 * @Author       : 卢瑶
 * @Date         : 2022-03-17 17:34:34
 * @LastEditTime : 2022-04-27 17:47:48
 * @LastEditors  : 卢瑶
 * @Description  : 全局状态管理
 * @FilePath     : /vite-vue3-ts-ly/src/store/main.ts
 */

import { defineStore } from 'pinia'
import requireAllRoutes from '../router/require-routes'
import { IMainActions, IMainState } from './main-type'
import router from '../router'
import { GLOBAL_VARIABLE_NAME } from '../setting/app'

const useMainStore = defineStore<string, IMainState, {}, IMainActions>('main', {
  state: () => ({
    username: '' || localStorage.getItem(GLOBAL_VARIABLE_NAME.USERNAME)!,
    routes: [],
    token: '' || localStorage.getItem(GLOBAL_VARIABLE_NAME.TOKEN)!
  }),
  actions: {
    registerAsyncRoutes() {
      const routes = requireAllRoutes()
      this.routes = routes
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    },
    setName(username: string) {
      this.username = username
    },
    setToken(token: string) {
      this.token = token
    }
  }
})

export function setupMainStore() {
  const mainStore = useMainStore()
  mainStore.registerAsyncRoutes()
}

export default useMainStore
