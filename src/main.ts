/*
 * @Author       : 卢瑶
 * @Date         : 2022-03-17 16:25:52
 * @LastEditTime : 2022-04-26 16:59:26
 * @LastEditors  : 卢瑶
 * @Description  :
 * @FilePath     : /vite-vue3-ts-ly/src/main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'normalize.css'
import '@/style/index.scss'
import { setupMainStore } from './store/main'
import registerApp from './global'

const app = createApp(App).use(createPinia())
setupMainStore()
registerApp(app)
app.use(router).mount('#app')
