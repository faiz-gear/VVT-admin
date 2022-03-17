/*
 * @Author       : 卢瑶
 * @Date         : 2022-03-17 17:34:34
 * @LastEditTime : 2022-03-17 17:37:33
 * @LastEditors  : 卢瑶
 * @Description  : 全局状态管理
 * @FilePath     : /vite-vue3-ts-ly/src/store/main.ts
 */

import { defineStore } from 'pinia'

const useMainStore = defineStore('main', {
  state: () => ({
    name: '超级管理员'
  })
})

export default useMainStore
