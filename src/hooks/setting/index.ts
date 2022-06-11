import { getConfigFileName } from '../../../script/getConfigFileName'

// 全局设置
export interface globEnv {
  VITE_GLOB_APP_NAME: string
  VITE_GLOB_API_URL: string
  VITE_GLOB_BASE_URL: string
  VITE_GLOB_UPLOAD_URL: string
}

export function useGlobSetting(): globEnv {
  const ENV = import.meta.env.DEV ? import.meta.env : window[getConfigFileName(import.meta.env) as any]
  const { VITE_GLOB_APP_NAME, VITE_GLOB_API_URL, VITE_GLOB_BASE_URL, VITE_GLOB_UPLOAD_URL } = ENV as unknown as globEnv

  // TODO 增加url/ip/version等设置
  return {
    VITE_GLOB_APP_NAME,
    VITE_GLOB_API_URL,
    VITE_GLOB_BASE_URL,
    VITE_GLOB_UPLOAD_URL
  }
}
