<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { storeToRefs } from 'pinia'
import useSettingStore from './store/setting'

const settingStore = useSettingStore()
const { theme } = storeToRefs(settingStore)

document.documentElement.setAttribute('class', theme.value)
</script>

<style></style>
