import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression'
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'
import { createHtmlPlugin } from 'vite-plugin-html'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import { GLOB_CONFIG_FILE_NAME } from './script/constant'
import { transformEnvType } from './script/utils'

import pkg from './package.json'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())

  const isBuild = command === 'build'

  const { VITE_GLOB_APP_NAME, VITE_DROP_CONSOLE, VITE_GLOB_API_URL, VITE_GLOB_BASE_URL } = transformEnvType(env)

  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass'
          })
        ]
      }),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      }),
      PkgConfig(),
      OptimizationPersist(),
      createHtmlPlugin({
        minify: isBuild,
        inject: {
          data: {
            title: VITE_GLOB_APP_NAME
          },
          tags: isBuild
            ? [
                {
                  tag: 'script',
                  injectTo: 'body',
                  attrs: {
                    src: `./${GLOB_CONFIG_FILE_NAME}?v=${pkg.version}-${Date.now()}`
                  }
                }
              ]
            : []
        }
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(__dirname, 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]'
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/style/element/index.scss" as *;`
        }
      }
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      open: false,
      https: false,
      proxy: {
        [VITE_GLOB_API_URL]: {
          target: VITE_GLOB_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => {
            return path.replace(new RegExp('^' + VITE_GLOB_API_URL), '')
          }
        }
      }
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
    }
  }
})
