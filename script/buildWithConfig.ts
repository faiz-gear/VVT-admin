import { runBuildWithConfig } from './utils'
import colors from 'picocolors'

import pkg from '../package.json'

/**
 * 带全局配置文件的构建
 */
const buildWithConfig = async () => {
  try {
    runBuildWithConfig()

    console.log(`${colors.cyan(pkg.name + '-' + pkg.version)}: build successfully !!!  `)
  } catch (error) {
    console.log(colors.red('vite build error: \n' + error))
    process.exit(1)
  }
}
buildWithConfig()
