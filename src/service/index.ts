/*
 * @Author       : 卢瑶
 * @Date         : 2022-03-17 17:04:29
 * @LastEditTime : 2022-03-17 17:11:01
 * @LastEditors  : 卢瑶
 * @Description  : 项目请求实例
 * @FilePath     : /vite-vue3-ts-ly/src/service/index.ts
 */

import LyRequest from './request'
import { BASE_URL, TIMEOUT } from './request/config'

const lyRequest = new LyRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  interceptors: {
    requestInterceptor(config) {
      return config
    },
    requestInterceptorCatch(err) {
      return err
    },
    responseInterceptor(res) {
      return res.data
    },
    responseInterceptorCatch(err) {
      return err
    }
  }
})

export default lyRequest
