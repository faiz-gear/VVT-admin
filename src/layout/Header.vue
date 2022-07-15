<template>
  <div class="flex justify-between h-full text-black">
    <div class="header-left flex items-center">
      <el-icon
        :size="20"
        class="mr-[20px] cursor-pointer"
        :color="themeColor"
        @click="emits('update:is-collapse', !isCollapse)"
      >
        <component :is="isCollapse ? 'expand' : 'fold'"></component>
      </el-icon>
      <VVTBreadCrumbs :breadcrumbs="breadcrumbs" separator="/"></VVTBreadCrumbs>
    </div>
    <div class="flex items-center">
      <div
        class="p-[10px] border border-[#e3e4e3] text-[20px] cursor-pointer m-[4px] rounded-lg"
        vvt:hover="bg-gray-100"
        vvt:dark="hover:bg-[#333]"
        @click="toggle"
      >
        <SvgIcon :name="isFullscreen ? 'minimize' : 'screenfull'" size="16px" :color="themeColor"></SvgIcon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import VVTBreadCrumbs, { IBreadcrumb } from '@/base-ui/breadcrumbs'
import useMainStore from '@/store/main'
import { mapRouteToBreadcrumbs } from '@/utils/routes-helper'
import { storeToRefs } from 'pinia'
import { useThemeColor } from '@/hooks/setting/theme'
import SvgIcon from '@/base-ui/svg-icon'
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, toggle } = useFullscreen()

const mainStore = useMainStore()
const { asyncRoutes } = storeToRefs(mainStore)
const route = useRoute()
const themeColor = useThemeColor()

const props = defineProps<{
  isCollapse: boolean
}>()

const emits = defineEmits<{
  (e: 'update:is-collapse', isCollapse: boolean): void
}>()

const breadcrumbs = ref<IBreadcrumb[]>([])
watchEffect(() => {
  breadcrumbs.value = mapRouteToBreadcrumbs(route, asyncRoutes.value)
})
</script>

<style scoped lang="scss"></style>
