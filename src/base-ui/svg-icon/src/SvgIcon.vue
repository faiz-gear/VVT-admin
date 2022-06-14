<template>
  <svg aria-hidden="true" :width="size" :height="size">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    name: string
    color?: string
    prefix?: string
    size?: string
  }>(),
  {
    prefix: 'icon',
    color: '#333',
    size: '2em'
  }
)

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>
