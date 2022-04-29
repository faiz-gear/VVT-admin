<template>
  <div class="header">
    <div class="header-left">
      <el-icon :size="20" class="icon" @click="emits('update:is-collapse', !isCollapse)">
        <component :is="isCollapse ? 'expand' : 'fold'"></component>
      </el-icon>
      <VVTBreadCrumbs :breadcrumbs="breadcrumbs" separator="/"></VVTBreadCrumbs>
    </div>
    <div class="header-action">
      <div class="greeting">欢迎您, {{ userName }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import VVTBreadCrumbs, { IBreadcrumb } from '@/components/breadcrumbs'
import useMainStore from '@/store/main'
import { mapRouteToBreadcrumbs } from '@/utils/routes-helper'

const mainStore = useMainStore()
const route = useRoute()

const props = defineProps<{
  isCollapse: boolean
}>()

const emits = defineEmits<{
  (e: 'update:is-collapse', isCollapse: boolean): void
}>()

const userName = mainStore.username || localStorage.getItem('vvtl-username')

const breadcrumbs = ref<IBreadcrumb[]>([])
watchEffect(() => {
  breadcrumbs.value = mapRouteToBreadcrumbs(route, mainStore.routes)
})
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .icon {
    margin-right: 20px;
    cursor: pointer;
  }
  &-left {
    display: flex;
    align-items: center;
  }
}
</style>
