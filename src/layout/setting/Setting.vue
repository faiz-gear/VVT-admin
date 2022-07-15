<template>
  <div class="setting flex justify-center">
    <el-drawer
      :model-value="setting"
      title="项目配置"
      direction="rtl"
      :size="lg ? '20%' : '100%'"
      @update:model-value="emits('update:setting', $event)"
    >
      <el-divider> 主题颜色</el-divider>
      <div class="py-[8px] flex justify-center">
        <el-switch v-model="isDark" inline-prompt :active-icon="'Sunny'" :inactive-icon="'Moon'" />
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useSettingStore from '@/store/setting'
import { storeToRefs } from 'pinia'
import useStorage from '@/hooks/storage'
import { GLOBAL_VARIABLE_NAME } from '@/setting/variable-setting'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const settingStore = useSettingStore()
const { theme } = storeToRefs(settingStore)
const { setTheme } = settingStore
const storage = useStorage()

const props = defineProps<{
  setting: boolean
}>()

const emits = defineEmits<{
  (e: 'update:setting', setting: boolean): void
}>()

const isDark = computed<boolean>({
  get() {
    return theme.value === 'dark'
  },
  set(newValue) {
    const theme = newValue ? 'dark' : 'light'
    document.documentElement.setAttribute('class', theme)
    setTheme(theme)
    storage.setItem(GLOBAL_VARIABLE_NAME.THEME, theme)
  }
})

const breakpoints = useBreakpoints(breakpointsTailwind)
const lg = breakpoints.greater('lg')
</script>

<style scoped></style>
