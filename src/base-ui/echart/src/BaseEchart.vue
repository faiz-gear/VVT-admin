<template>
  <div
    class="base-echart"
    :style="{
      width: width,
      height: height
    }"
  >
    <div ref="echartDivRef" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watchEffect } from 'vue'
import useEchart, { EchartRendererType } from '../hooks/useEchart'
// 定义props
const props = withDefaults(
  defineProps<{
    options: any
    width?: string
    height?: string
    renderer?: EchartRendererType
  }>(),
  {
    width: '100%',
    height: '100%',
    renderer: 'svg'
  }
)

const echartDivRef = ref<HTMLElement>()
defineExpose({
  echartDivRef
})

onMounted(() => {
  const { setOptions } = useEchart(echartDivRef.value!, props.renderer) // eslint-disable-line
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style scoped></style>
