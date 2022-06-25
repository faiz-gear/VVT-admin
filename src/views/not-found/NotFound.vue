<template>
  <div class="flex flex-col justify-center items-center h-[100vh] box-border bg-light-900">
    <img src="@/assets/404.png" class="not-found-image h-[auto] w-[50vw] animate-animated animate-jackInTheBox" />
    <div class="text-gray-500 font-mono text-[1vw] animate-animated animate-lightSpeedInLeft">
      抱歉, 您访问的页面不存在
    </div>
    <el-button class="mt-[12px]" @click="router.push('/main')">返回首页</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped lang="scss"></style>
