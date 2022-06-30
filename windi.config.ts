import { defineConfig } from 'vite-plugin-windicss'

function range(size, startAt = 1) {
  return Array.from(Array(size).keys()).map((i) => i + startAt)
}

export default defineConfig({
  safelist: [
    range(30).map((i) => `p-${i}`), // p-1 到 p-3
    range(30).map((i) => `mt-${i}`) // mt-1 到 mt-10
  ],
  attributify: {
    prefix: 'vvt:'
  },
  alias: {
    'font-xs': 'text-[12px]',
    'font-sm': 'text-[14px]',
    'font-md': 'text-[16px]',
    'font-lg': 'text-[18px]',
    'font-xl': 'text-[20px]'
  },
  plugins: [
    require('@windicss/plugin-animations')({
      settings: {
        animatedSpeed: 1000,
        heartBeatSpeed: 1000,
        hingeSpeed: 2000,
        bounceInSpeed: 750,
        bounceOutSpeed: 750,
        animationDelaySpeed: 1000
      }
    })
  ]
})
