<template>
  <div class="vvt-transition">
    <Transition :name="name" :mode="mode" @before-enter="beforeEnter" @before-leave="beforeLeave"
      ><slot></slot
    ></Transition>
  </div>
</template>

<script setup lang="ts">
import { TransitionMode, TransitionOrigin } from './transition-type'

const props = defineProps<{
  name: string
  mode?: TransitionMode
  origin?: TransitionOrigin
}>()

const beforeEnter = (el: HTMLElement) => {
  el.style.transformOrigin = props.origin ?? 'center'
}
const beforeLeave = (el: HTMLElement) => {
  el.style.transformOrigin = props.origin ?? 'center'
}
</script>

<style scoped></style>
