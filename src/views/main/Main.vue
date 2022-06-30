<template>
  <div
    class="main px-[2rem] py-[2rem] box-border h-full bg-gradient-to-r from-slate-200 to-slate-300"
    vvt:dark="from-dark-200 to-dark-600"
  >
    <el-container class="pr-[48px] h-full rounded-3xl bg-white overflow-hidden" vvt:dark="bg-black">
      <el-aside v-if="lg" :width="isCollapse && lg ? '64px' : '260px'" class="main-aside py-[36px]">
        <Menu :is-collapse="isCollapse" :routes="routes"></Menu>
      </el-aside>
      <el-drawer
        v-else
        :model-value="!isCollapse"
        direction="ltr"
        :size="lg ? '30%' : '40%'"
        @update:model-value="isCollapse = !$event"
        ><Menu :is-collapse="false" :routes="routes"></Menu
      ></el-drawer>
      <el-container class="py-[2.5rem]">
        <el-header class="bg-white" vvt:dark="bg-black"><Header v-model:isCollapse="isCollapse"></Header></el-header>
        <el-main class="main-content"
          ><RouterView v-slot="{ Component }">
            <template v-if="Component">
              <Transition mode="out-in" name="slide-right" appear>
                <component :is="Component"></component>
              </Transition>
            </template> </RouterView
        ></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Menu from '@/layout/aside/Menu.vue'
import Header from '@/layout/Header.vue'
import { ref } from 'vue'
import useMainStore from '@/store/main'
import { storeToRefs } from 'pinia'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const mainStore = useMainStore()
const { asyncRoutes } = storeToRefs(mainStore)

const isCollapse = ref(false)

const routes = ref(asyncRoutes.value)
const dashboardRouteIndex = routes.value.findIndex((route) => route.name === 'dashboard')
const dashboardRoute = routes.value.splice(dashboardRouteIndex, 1)
routes.value.unshift(dashboardRoute[0])

const breakpoints = useBreakpoints(breakpointsTailwind)
const lg = breakpoints.greater('lg')
</script>

<style scoped lang="scss">
.main {
  &-aside {
    transition: 0.5s all cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  &-content {
    overflow-x: hidden;
  }
}
</style>
