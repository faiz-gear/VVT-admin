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
      <div class="py-[8px]">
        <el-switch
          v-model="isDark"
          style="margin-left: 24px"
          inline-prompt
          :active-icon="'Sunny'"
          :inactive-icon="'Moon'"
        />
      </div>
      <!-- <div>
        <div class="font-bold">欢迎您, {{ userName }}</div>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import VVTBreadCrumbs, { IBreadcrumb } from '@/base-ui/breadcrumbs'
import useMainStore from '@/store/main'
import { mapRouteToBreadcrumbs } from '@/utils/routes-helper'
import { GLOBAL_VARIABLE_NAME } from '@/setting/variable-setting'
import useStorage from '@/hooks/storage'
import { storeToRefs } from 'pinia'
import { useThemeColor } from '@/hooks/setting/theme'

const mainStore = useMainStore()
const { username, asyncRoutes, theme } = storeToRefs(mainStore)
const { setTheme } = mainStore
const route = useRoute()
const storage = useStorage()
const themeColor = useThemeColor()

const props = defineProps<{
  isCollapse: boolean
}>()

const emits = defineEmits<{
  (e: 'update:is-collapse', isCollapse: boolean): void
}>()

const userName = username || storage.getItem(GLOBAL_VARIABLE_NAME.USERNAME)

const breadcrumbs = ref<IBreadcrumb[]>([])
watchEffect(() => {
  breadcrumbs.value = mapRouteToBreadcrumbs(route, asyncRoutes.value)
})

const isDark = computed<boolean>({
  get() {
    document.documentElement.setAttribute('class', theme.value)
    return theme.value === 'dark'
  },
  set(newValue) {
    const theme = newValue ? 'dark' : 'light'
    document.documentElement.setAttribute('class', theme)
    setTheme(theme)
    storage.setItem(GLOBAL_VARIABLE_NAME.THEME, theme)
  }
})
</script>

<style scoped lang="scss"></style>
