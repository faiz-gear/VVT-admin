<template>
  <div class="vvt-breadcrumbs">
    <el-breadcrumb :separator="separator">
      <template v-for="breadcrumb in breadcrumbs" :key="breadcrumb.name">
        <el-breadcrumb-item :to="breadcrumb.path">{{ breadcrumb.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { IBreadcrumb } from './breadcrumbs-type'
const props = withDefaults(
  defineProps<{
    breadcrumbs: IBreadcrumb[]
    separator?: string
  }>(),
  {
    separator: '/'
  }
)
</script>

<style scoped></style>
