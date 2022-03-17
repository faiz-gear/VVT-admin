import { AxiosRequestConfig, AxiosResponse } from 'axios'
export interface LyInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}

// 继承AxiosRequestConfig接口，让LyRequestConfig能够扩展interceptors类型
export interface LyRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: LyInterceptors<T>
}
