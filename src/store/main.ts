/*
 * @Author       : 卢瑶
 * @Date         : 2022-03-17 17:34:34
 * @LastEditTime : 2022-06-11 10:56:05
 * @LastEditors  : 卢瑶
 * @Description  : 全局状态管理
 * @FilePath     : /vvt-admin/src/store/main.ts
 */

import { defineStore } from 'pinia'
import requireAllRoutes from '../router/require-routes'
import type { IMainActions, IMainState, Theme } from './main-type'
import router from '../router'
import { GLOBAL_VARIABLE_NAME } from '../setting/variable-setting'

const useMainStore = defineStore<string, IMainState, {}, IMainActions>('main', {
  state: () => ({
    username: localStorage.getItem(GLOBAL_VARIABLE_NAME.USERNAME)! || '',
    routes: [],
    token: localStorage.getItem(GLOBAL_VARIABLE_NAME.TOKEN)! || '',
    theme: (localStorage.getItem(GLOBAL_VARIABLE_NAME.THEME) as Theme) || 'light'
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
    },
    setTheme(theme: Theme) {
      this.theme = theme
    }
  }
})

export function setupMainStore() {
  const mainStore = useMainStore()
  mainStore.registerAsyncRoutes()
}

export default useMainStore
