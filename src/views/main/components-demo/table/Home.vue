<template>
  <div class="home">
    <h1>Hello Vite-Vue3-Ts-LY</h1>
    <h2>{{ mainStore.name }}</h2>
    <el-row class="mb-4" justify="center">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
      <el-button>中文</el-button>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import lyRequest from '../../service'
import useMainStore from '../../store/main'

lyRequest.get({
  url: '/static/devices'
})

const mainStore = useMainStore()
</script>

<style scoped>
.home {
  text-align: center;
}
</style>
