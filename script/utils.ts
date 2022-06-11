import path from 'path'
import fs, { writeFileSync } from 'fs-extra'
import dotenv from 'dotenv'
import { GLOB_CONFIG_FILE_NAME, OUTPUT_DIR } from './constant'
import colors from 'picocolors'

import pkg from '../package.json'
import { getConfigFileName } from './getConfigFileName'

/**
 * 获取根路径
 * @param dir 文件路径字符串
 */
export const getRootPath = (...dir: string[]) => {
  return path.resolve(process.cwd(), ...dir)
}

/**
 * @description  : 创建配置文件
 * @param         {CreateConfigParams} params
 */
interface CreateConfigParams {
  configName: string
  config: any
  configFileName?: string
}
export const createConfig = async (params: CreateConfigParams) => {
  const { configName, config, configFileName } = params
  try {
    const windowConf = `window.${configName}` // 全局变量
    // 确保全局变量不被修改
    const configStr = `${windowConf}=${JSON.stringify(config)};
          Object.freeze(${windowConf});
        `.replace(/\s/g, '') // 写入配置文件的内容
    fs.mkdirp(getRootPath(OUTPUT_DIR)) // 创建文件
    await writeFileSync(getRootPath(`${OUTPUT_DIR}/${configFileName}`), configStr) // 写入内容

    console.log(
      colors.cyan(`✨ [${pkg.name}]`) +
        ` - configuration file is build successfully: ` +
        colors.gray(OUTPUT_DIR + '/' + colors.green(configFileName))
    )
  } catch (error) {
    console.log(colors.red('configuration file configuration file failed to package:\n' + error))
  }
}

export const runBuildWithConfig = () => {
  const config = getEnvConfig() // 获取环境变量
  const configFileName = getConfigFileName(config) // 获取全局变量名
  createConfig({ config, configName: configFileName, configFileName: GLOB_CONFIG_FILE_NAME }) // 开始创建全局配置文件
}

/**
 * 获取当前环境下生效的配置文件名
 */
export const getConfFiles = () => {
  const script = process.env.npm_lifecycle_script
  const reg = new RegExp('--mode ([a-z_\\d]+)')
  const result = reg.exec(script as string) as any
  if (result) {
    const mode = result[1] as string
    return ['.env', `.env.${mode}`]
  }
  return ['.env', '.env.production']
}

/**
 * 获取符合match前缀开头的环境变量对象
 * @param match prefix // 匹配变量开头的字符
 * @param confFiles ext // 当前环境文件名
 */
export const getEnvConfig = (match = 'VITE_GLOB_', confFiles = getConfFiles()) => {
  let envConfig = {}
  confFiles.forEach((item) => {
    try {
      // 读取文件并且获取对应的环境变量
      const env = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), item)))
      envConfig = { ...envConfig, ...env }
    } catch (e) {
      console.error(`Error in parsing ${item}`, e)
    }
  })
  const reg = new RegExp(`^(${match})`)
  // 筛选符合match开头的变量
  Object.keys(envConfig).forEach((key) => {
    if (!reg.test(key)) {
      Reflect.deleteProperty(envConfig, key)
    }
  })
  return envConfig
}

/**
 * @description  : 转换环境变量boolean类型
 * @param         {Record} env
 */
export const transformEnvType = (env: Record<string, any>) => {
  const resultEnv: any = {}
  Object.keys(env).forEach((key) => {
    resultEnv[key] = env[key] === 'true' ? true : env[key] === 'false' ? false : env[key]
  })

  return resultEnv
}
