<template>
  <el-menu
    :default-active="defaultActive"
    background-color="#606266"
    text-color="#fff"
    active-text-color="#409EFF"
    class="el-menu-vertical-demo"
    style="height: 100%"
    :collapse="isCollapse"
  >
    <template v-for="route in routes" :key="route.name">
      <el-sub-menu v-if="route.children?.length !== 0" :index="route.path">
        <template #title>
          <el-icon v-if="route.meta!.icon"><component :is="route.meta!.icon"></component></el-icon>
          <span>{{ route.meta!.title }}</span>
        </template>
        <el-menu-item
          v-for="subRoute in route.children"
          :key="subRoute.name"
          :index="subRoute.path"
          @click="router.push(subRoute.meta!.fullPath as string)"
        >
          <el-icon v-if="subRoute.meta!.icon"><component :is="subRoute.meta!.icon"></component></el-icon>
          <template #title>{{ subRoute.meta!.title }}</template>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item v-else :index="route.path" @click="router.push(route.meta!.fullPath as string)">
        <el-icon v-if="route.meta!.icon"><component :is="route.meta!.icon"></component></el-icon>
        <template #title>{{ route.meta!.title }}</template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useMainStore from '../../../store/main'

const props = defineProps<{
  isCollapse: boolean
}>()

const mainStore = useMainStore()
const router = useRouter()
const route = useRoute()

const routes = ref(mainStore.routes)
const dashboardRouteIndex = routes.value.findIndex((route) => route.name === 'dashboard')
const dashboardRoute = routes.value.splice(dashboardRouteIndex, 1)
routes.value.unshift(dashboardRoute[0])

const defaultActive = ref('')

watchEffect(() => {
  defaultActive.value = route.name as string
})
</script>

<style scoped></style>
