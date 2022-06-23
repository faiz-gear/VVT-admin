import pkg from '../../../package.json'

export interface StorageConfig {
  type: 'localStorage' | 'sessionStorage' // 存储类型
  prefix: string // 存储名称前缀
  storageExpire: number // 所有数据过期时间, 单位秒
  isEncrypt: boolean // 是否加密
}

export const storageConfig: StorageConfig = {
  type: 'localStorage',
  prefix: pkg.name + '-' + pkg.version + '-',
  storageExpire: 0,
  isEncrypt: import.meta.env.PROD
}
