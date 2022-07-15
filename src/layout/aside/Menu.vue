<template>
  <div class="flex justify-center h-full">
    <div class="flex flex-col w-[160px] h-full">
      <!-- logo和系统名 -->
      <div class="flex items-center justify-center h-[52px] pb-[20px] box-border">
        <SvgIcon name="logo" :color="themeColor"></SvgIcon>
        <a v-show="!isCollapse" class="ml-[12px] font-mono font-bold text-xl text-center" href="/">VVT-admin</a>
      </div>
      <!-- 菜单栏 -->
      <el-menu
        class="h-[634px] overflow-y-scroll"
        :default-active="defaultActive"
        style="border-right: none"
        :collapse="isCollapse"
        unique-opened
      >
        <template v-for="route in routes" :key="route.name">
          <SubMenu v-if="route.children?.length !== 0" :index="route.meta!.title" :route="route"></SubMenu>
          <el-menu-item v-else :index="route.meta!.title" @click="router.push(route.meta!.fullPath as string)">
            <el-icon v-if="route.meta!.icon"><component :is="route.meta!.icon"></component></el-icon>
            <template #title>{{ route.meta!.title }}</template>
          </el-menu-item>
        </template>
      </el-menu>
      <div class="flex flex-col items-center h-[160px] mt-[20px]">
        <div v-show="!isCollapse" :class="!isCollapse && 'animate-animated animate-bounceIn'">
          <!-- 用户头像 -->
          <el-image v-if="avatar" class="rounded-1/2 w-20 h-20" :src="avatar"> </el-image>
          <span
            v-else
            class="block p-[20px] w-20 h-20 rounded-1/2 text-white text-center font-mono font-bold text-[48px]"
            :style="{ background: textAvatarBackgroundColor }"
            >{{ username[0].toUpperCase() }}</span
          >
          <!-- 用户名称 -->
          <div class="font-mono font-bold text-xl text-center py-[8px]">{{ username }}</div>
        </div>
        <!-- 系统设置 -->
        <!-- TODO 设置主题\修改全局配置等 -->
        <div class="flex justify-center" :style="{ flexDirection: !isCollapse ? 'row' : 'column' }">
          <div
            ref="settingRef"
            class="p-[10px] border border-[#e3e4e3] text-[20px] cursor-pointer m-[4px] rounded-lg"
            vvt:hover="bg-gray-100"
            vvt:dark="hover:bg-[#333]"
            @mouseenter="handleIconMouseEvent('setting', 'enter')"
            @mouseleave="handleIconMouseEvent('setting', 'leave')"
            @click="emits('setting-icon-click')"
          >
            <SvgIcon name="setting" size="16px" :color="themeColor"></SvgIcon>
          </div>
          <el-tooltip
            v-model:visible="settingTooltipVisible"
            content="设置"
            placement="right"
            effect="dark"
            virtual-triggering
            :virtual-ref="settingRef"
          />
          <!-- 退出登录  -->
          <!-- TODO 退出登录 清除缓存数据 -->
          <div
            ref="exitRef"
            class="p-[10px] border border-[#e3e4e3] text-[20px] cursor-pointer m-[4px] rounded-lg"
            vvt:hover="bg-gray-100"
            vvt:dark="hover:bg-[#333]"
            @mouseenter="handleIconMouseEvent('exit', 'enter')"
            @mouseleave="handleIconMouseEvent('exit', 'leave')"
            @click="logout"
          >
            <SvgIcon name="exit" size="16px" :color="themeColor"></SvgIcon>
          </div>
          <el-tooltip
            v-model:visible="exitTooltipVisible"
            content="退出"
            placement="right"
            effect="dark"
            virtual-triggering
            :virtual-ref="exitRef"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import SubMenu from './SubMenu.vue'
import SvgIcon from '@/base-ui/svg-icon'
import { useRoute, useRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import useMainStore from '@/store/main'
import { storeToRefs } from 'pinia'
import { getRandomHex } from '@/utils/random-color'
import useStorage from '@/hooks/storage'
import { GLOBAL_VARIABLE_NAME } from '@/setting/variable-setting'
import { useThemeColor } from '@/hooks/setting/theme'

const props = defineProps<{
  isCollapse?: boolean
  routes: RouteRecordRaw[]
}>()

const emits = defineEmits<{
  (e: 'setting-icon-click'): void
}>()

const router = useRouter()
const currentRoute = useRoute()
const mainStore = useMainStore()
const { username, avatar } = storeToRefs(mainStore)
const storage = useStorage()
const themeColor = useThemeColor()

const defaultActive = ref('')
watchEffect(() => {
  defaultActive.value = currentRoute.meta.title as string
})

const settingTooltipVisible = ref(false)
const exitTooltipVisible = ref(false)

const settingRef = ref<HTMLElement>()
const exitRef = ref<HTMLElement>()

const handleIconMouseEvent = (iconName: 'setting' | 'exit', event: 'enter' | 'leave') => {
  if (!props.isCollapse) {
    return
  }
  const status = event === 'enter'
  if (iconName === 'setting') {
    settingTooltipVisible.value = status
  } else if (iconName === 'exit') {
    exitTooltipVisible.value = status
  }
}

const textAvatarBackgroundColor = ref(storage.getItem(GLOBAL_VARIABLE_NAME.TEXT_AVATAR_BACKGROUND_COLOR))
!textAvatarBackgroundColor.value &&
  storage.setItem(GLOBAL_VARIABLE_NAME.TEXT_AVATAR_BACKGROUND_COLOR, (textAvatarBackgroundColor.value = getRandomHex()))

const logout = () => {
  router.push('/login')
}
</script>
<style scoped lang="scss">
:deep(.el-sub-menu),
:deep(.el-menu-item) {
  min-width: auto;
}
</style>
