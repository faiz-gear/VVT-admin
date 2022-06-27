/*
 * @Author       : 卢瑶
 * @Date         : 2022-03-17 17:34:34
 * @LastEditTime : 2022-06-27 16:42:32
 * @LastEditors  : 卢瑶
 * @Description  : 全局状态管理
 * @FilePath     : /vvt-admin/src/store/main.ts
 */

import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import requireAllRoutes from '../router/require-routes'
import type { Theme } from './main-type'
import router from '../router'
import { GLOBAL_VARIABLE_NAME } from '../setting/variable-setting'
import useStorage from '@/hooks/storage'
import { RouteRecordRaw } from 'vue-router'
const storage = useStorage()

const useMainStore = defineStore('main', () => {
  // state
  const username = ref<string>(storage.getItem(GLOBAL_VARIABLE_NAME.USERNAME)! || '')
  const asyncRoutes = ref<RouteRecordRaw[]>([])
  const token = ref<string>(storage.getItem(GLOBAL_VARIABLE_NAME.TOKEN)! || '')
  const theme = ref<Theme>((storage.getItem(GLOBAL_VARIABLE_NAME.THEME) as Theme) || 'light')

  // actions
  const setAsyncRoutes = (newAsyncRoutes: RouteRecordRaw[]) => {
    asyncRoutes.value = newAsyncRoutes
  }
  const setName = (newUsername: string) => {
    username.value = newUsername
  }
  const setToken = (newToken: string) => {
    token.value = newToken
  }
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
  }

  return {
    username,
    asyncRoutes,
    token,
    theme,

    setAsyncRoutes,
    setName,
    setToken,
    setTheme
  }
})

export function setupMainStore() {
  const mainStore = useMainStore()
  const { asyncRoutes } = storeToRefs(mainStore)
  const { setAsyncRoutes } = mainStore
  setAsyncRoutes(requireAllRoutes())
  asyncRoutes.value.forEach((route) => {
    router.addRoute('main', route)
  })
}

export default useMainStore
