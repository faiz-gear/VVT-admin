<template>
  <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" style="height: 100%" :collapse="isCollapse">
    <template v-for="route in routes" :key="route.name">
      <SubMenu v-if="route.children?.length !== 0" :index="route.meta!.title" :route="route"></SubMenu>
      <el-menu-item v-else :index="route.meta!.title" @click="router.push(route.meta!.fullPath as string)">
        <el-icon v-if="route.meta!.icon"><component :is="route.meta!.icon"></component></el-icon>
        <template #title>{{ route.meta!.title }}</template>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import SubMenu from './SubMenu.vue'
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
  defaultActive.value = currentRoute.meta.title as string
})
</script>
<style scoped></style>
