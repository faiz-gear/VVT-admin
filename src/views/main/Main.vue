<template>
  <div class="main">
    <el-container class="main-container">
      <el-aside :width="isCollapse ? '64px' : '200px'" class="main-aside"
        ><Menu :is-collapse="isCollapse"></Menu
      ></el-aside>
      <el-container>
        <el-header><Header v-model:isCollapse="isCollapse"></Header></el-header>
        <el-main class="main-content"
          ><RouterView v-slot="{ Component }">
            <template v-if="Component">
              <Transition mode="out-in" name="slide-right" appear>
                <component :is="Component"></component>
              </Transition>
            </template> </RouterView
        ></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Menu from './layout/Menu.vue'
import Header from './layout/Header.vue'
import { ref } from 'vue'

const isCollapse = ref(false)
</script>

<style scoped lang="scss">
.main {
  height: 100%;
  &-container {
    height: 100%;
  }
  &-aside {
    transition: 0.5s all cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  &-content {
    background-color: #f0f2f5;
  }
}
</style>
