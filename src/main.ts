/*
 * @Author       : 卢瑶
 * @Date         : 2022-03-17 16:25:52
 * @LastEditTime : 2022-06-09 11:24:49
 * @LastEditors  : 卢瑶
 * @Description  :
 * @FilePath     : /vvt-admin/src/main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'normalize.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/style/index.scss'
import { setupMainStore } from './store/main'
import registerApp from './global'

const app = createApp(App).use(createPinia())
setupMainStore()
registerApp(app)
app.use(router).mount('#app')
