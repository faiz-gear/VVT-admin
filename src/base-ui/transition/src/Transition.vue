<template>
  <div class="vvt-transition">
    <Transition :name="name" :mode="mode" :appear="appear" @before-enter="beforeEnter" @before-leave="beforeLeave"
      ><slot></slot
    ></Transition>
  </div>
</template>

<script setup lang="ts">
import { TransitionMode, TransitionOrigin } from './transition-type'

const props = withDefaults(
  defineProps<{
    name: string
    mode?: TransitionMode
    origin?: TransitionOrigin
    appear?: boolean
  }>(),
  {
    mode: 'default',
    origin: 'center',
    appear: true
  }
)

const beforeEnter = (el: HTMLElement) => {
  el.style.transformOrigin = props.origin ?? 'center'
}
const beforeLeave = (el: HTMLElement) => {
  el.style.transformOrigin = props.origin ?? 'center'
}
</script>

<style scoped></style>
