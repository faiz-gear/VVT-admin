import CryptoJS from 'crypto-js'
import { storageConfig } from './storage-config'

interface StorageData {
  value: any
  storageTime: number
  expire: number
}
// 十六位十六进制数作为密钥
const SECRET_KEY = CryptoJS.enc.Utf8.parse('3333e6e143439161')
// 十六位十六进制数作为密钥偏移量
const SECRET_IV = CryptoJS.enc.Utf8.parse('e3bbe7e3ba84431a')
// 加密
const encrypt = (data: any) => {
  if (typeof data === 'object') {
    try {
      data = JSON.stringify(data)
    } catch (error) {
      console.log('encrypt error:', error)
    }
  }
  const dataHex = CryptoJS.enc.Utf8.parse(data)
  const encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.ciphertext.toString()
}

// 解密
const decrypt = (data: any) => {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(data)
  const str = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  const decrypt = CryptoJS.AES.decrypt(str, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}

export default function useStorage() {
  const { type, prefix, storageExpire, isEncrypt } = storageConfig
  const storage = window[type]
  /**
   * @description  : 设置数据
   * @param         {string} key
   * @param         {any} value
   * @param         {number} expire 单个数据过期时间
   * @return        {*}
   */
  const setItem = (key: string, value: any, expire?: number) => {
    const actualExpire = (expire || storageExpire) * 1000

    const data: StorageData = {
      value: isEncrypt ? encrypt(JSON.stringify(value)) : value,
      storageTime: Date.now(),
      expire: actualExpire
    }

    storage.setItem(prefix + key, JSON.stringify(data))
  }

  /**
   * @description  : 获取数据
   * @param         {string} key
   * @return        {*}
   */
  const getItem = (key: string) => {
    const actualKey = prefix + key
    if (!storage.getItem(actualKey) || storage.getItem(actualKey) === 'null') {
      return null
    }
    const { value, storageTime, expire } = JSON.parse(storage.getItem(actualKey)!) as StorageData

    const current = Date.now()
    // 过期删除
    if (expire && current > storageTime + expire) {
      removeItem(actualKey)
      return null
    }
    // 没过期续费
    const actualValue = isEncrypt ? JSON.parse(decrypt(value)) : value
    setItem(key, actualValue, expire / 1000)

    return actualValue
  }

  /**
   * @description  : 移除某个数据
   * @param         {string} key
   * @return        {*}
   */
  const removeItem = (key: string) => {
    storage.removeItem(prefix + key)
  }

  /**
   * @description  : 移除所有数据
   * @return        {*}
   */
  const clearItem = () => {
    storage.clear()
  }

  /**
   * @description  : 获取所有数据
   * @return        {*}
   */
  const getAllItem = () => {
    const allItem: any = {}
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i)!.replace(prefix, '')
      allItem[key] = getItem(key)
    }

    return allItem
  }

  return {
    setItem,
    getItem,
    removeItem,
    clearItem,
    getAllItem
  }
}
