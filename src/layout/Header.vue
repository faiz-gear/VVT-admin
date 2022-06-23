<template>
  <div class="header">
    <div class="header-left">
      <el-icon :size="20" class="icon" @click="emits('update:is-collapse', !isCollapse)">
        <component :is="isCollapse ? 'expand' : 'fold'"></component>
      </el-icon>
      <VVTBreadCrumbs :breadcrumbs="breadcrumbs" separator="/"></VVTBreadCrumbs>
    </div>
    <div class="header-action">
      <div class="header-action-item">
        <el-switch
          v-model="isDark"
          style="margin-left: 24px"
          inline-prompt
          :active-icon="'Sunny'"
          :inactive-icon="'Moon'"
        />
      </div>
      <div class="header-action-item">
        <div class="greeting">欢迎您, {{ userName }}</div>
      </div>
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

const mainStore = useMainStore()
const route = useRoute()
const storage = useStorage()

const props = defineProps<{
  isCollapse: boolean
}>()

const emits = defineEmits<{
  (e: 'update:is-collapse', isCollapse: boolean): void
}>()

const userName = mainStore.username || storage.getItem(GLOBAL_VARIABLE_NAME.USERNAME)

const breadcrumbs = ref<IBreadcrumb[]>([])
watchEffect(() => {
  breadcrumbs.value = mapRouteToBreadcrumbs(route, mainStore.routes)
})

const isDark = computed<boolean>({
  get() {
    document.documentElement.setAttribute('class', mainStore.theme)
    return mainStore.theme === 'dark'
  },
  set(newValue) {
    const theme = newValue ? 'dark' : 'light'
    document.documentElement.setAttribute('class', theme)
    mainStore.setTheme(theme)
    storage.setItem(GLOBAL_VARIABLE_NAME.THEME, theme)
  }
})
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  height: 100%;
  color: var(--el-text-color-regular);
  .icon {
    margin-right: 20px;
    cursor: pointer;
  }
  &-left {
    display: flex;
    align-items: center;
  }
  &-action {
    display: flex;
    align-items: center;
    &-item {
      padding: 0 8px;
    }
  }
}
</style>
