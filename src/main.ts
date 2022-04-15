/*
 * @Author       : 卢瑶
 * @Date         : 2022-03-17 16:25:52
 * @LastEditTime : 2022-04-15 10:16:15
 * @LastEditors  : 卢瑶
 * @Description  :
 * @FilePath     : /vite-vue3-ts-ly/src/main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

createApp(App).use(createPinia()).use(router).mount('#app')
