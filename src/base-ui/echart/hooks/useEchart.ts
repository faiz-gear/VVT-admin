import * as echarts from 'echarts'

export type EchartRendererType = 'svg' | 'canvas'

export default function (el: HTMLElement, renderer: EchartRendererType = 'svg') {
  const echartInstance = echarts.init(el, undefined, { renderer })

  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }

  const updateSize = () => {
    echartInstance.resize()
  }

  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  return {
    echartInstance,
    setOptions,
    updateSize
  }
}
