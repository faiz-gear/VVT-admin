<template>
  <div class="main">
    <el-container class="main-container">
      <el-container>
        <el-header class="main-header"><Header v-model:isCollapse="isCollapse"></Header></el-header>
        <el-container>
          <el-aside :width="isCollapse ? '64px' : '200px'" class="main-aside"
            ><Menu :is-collapse="isCollapse" :routes="routes"></Menu
          ></el-aside>
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
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Menu from '@/layout/aside/Menu.vue'
import Header from '@/layout/Header.vue'
import { ref } from 'vue'
import useMainStore from '@/store/main'

const mainStore = useMainStore()

const isCollapse = ref(false)

const routes = ref(mainStore.routes)
const dashboardRouteIndex = routes.value.findIndex((route) => route.name === 'dashboard')
const dashboardRoute = routes.value.splice(dashboardRouteIndex, 1)
routes.value.unshift(dashboardRoute[0])
</script>

<style scoped lang="scss">
.main {
  padding: 10px 15px;
  box-sizing: border-box;
  height: 100%;
  background-color: var(--el-main-bg-color);
  &-container {
    height: 100%;
  }
  &-header {
    border-radius: 5px 5px 0 0;
    background: var(--el-header-dark-bg);
  }
  &-aside {
    transition: 0.5s all cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  &-content {
    // background-color: #f0f2f5;
  }
}
</style>
