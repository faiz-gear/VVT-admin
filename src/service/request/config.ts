/*
 * @Author       : 卢瑶
 * @Date         : 2022-02-09 17:20:38
 * @LastEditTime : 2022-03-17 17:12:12
 * @LastEditors  : 卢瑶
 * @Description  : 网络请求配置
 * @FilePath     : /vite-vue3-ts-ly/src/service/request/config.ts
 */
let BASE_URL = ''
let BASE_HOST_PORT = ''
const TIMEOUT = 20000
if (process.env.NODE_ENV === 'development') {
  BASE_HOST_PORT = '192.168.148.164:8080'
  BASE_URL = `http://${BASE_HOST_PORT}/api/v1`
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = `http://${BASE_HOST_PORT}/api/v1`
}

export { BASE_URL, BASE_HOST_PORT, TIMEOUT }
