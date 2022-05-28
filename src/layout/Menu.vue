<template>
  <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" style="height: 100%" :collapse="isCollapse">
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
import type { RouteRecordRaw } from 'vue-router'

const props = defineProps<{
  isCollapse?: boolean
  routes: RouteRecordRaw[]
}>()

const router = useRouter()
const currentRoute = useRoute()

const defaultActive = ref('')
watchEffect(() => {
  defaultActive.value = currentRoute.name as string
})
</script>
<style scoped></style>
