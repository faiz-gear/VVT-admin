/*
 * @Author       : 卢瑶
 * @Date         : 2022-03-17 17:04:29
 * @LastEditTime : 2022-06-11 13:51:42
 * @LastEditors  : 卢瑶
 * @Description  : 项目请求实例
 * @FilePath     : /vvt-admin/src/service/index.ts
 */

import { useGlobSetting } from '@/hooks/setting'
import LyRequest from './request'
const { VITE_GLOB_API_URL, VITE_GLOB_BASE_URL } = useGlobSetting()
const isBuild = process.env.NODE_ENV === 'production'

const TIMEOUT = 20000
const lyRequest = new LyRequest({
  baseURL: isBuild ? VITE_GLOB_BASE_URL + VITE_GLOB_API_URL : VITE_GLOB_API_URL,
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
