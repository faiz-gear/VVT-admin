<template>
  <el-sub-menu :index="route.meta!.title">
    <template #title>
      <el-icon v-if="route.meta!.icon"><component :is="route.meta!.icon"></component></el-icon>
      <span>{{ route.meta!.title }}</span>
    </template>
    <template v-for="subRoute in route.children" :key="subRoute.name">
      <SubMenu v-if="subRoute.children && subRoute.children.length !== 0" :route="subRoute"></SubMenu>
      <el-menu-item v-else :index="subRoute.meta!.title" @click="router.push(subRoute.meta!.fullPath as string)">
        <el-icon v-if="subRoute.meta!.icon"><component :is="subRoute.meta!.icon"></component></el-icon>
        <template #title>{{ subRoute.meta!.title }}</template>
      </el-menu-item>
    </template>
  </el-sub-menu>
</template>

<script setup lang="ts">
import { RouteRecordRaw, useRouter } from 'vue-router'

const props = defineProps<{
  route: RouteRecordRaw
}>()

const router = useRouter()
</script>

<style scoped></style>
