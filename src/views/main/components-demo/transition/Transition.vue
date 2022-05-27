<template>
  <div class="transition-demo">
    <div style="margin-bottom: 30px; font-size: 14px">
      <div class="select-wrapper">
        <div class="label">过渡类型:</div>
        <el-select v-model="transitionName" placeholder="Select" size="large">
          <el-option v-for="item in transitionNameOptions" :key="item" :label="item" :value="item" />
        </el-select>
      </div>
      <div class="select-wrapper">
        <div class="label">过渡中心点:</div>
        <el-select v-model="transitionOrigin" placeholder="Select" size="large">
          <el-option v-for="item in transitionOriginOptions" :key="item" :label="item" :value="item" />
        </el-select>
      </div>
      <el-switch v-model="showSquare" style="margin-left: 10px" />
    </div>
    <VVTTransition :name="transitionName" :origin="transitionOrigin">
      <div v-show="showSquare" id="square"></div>
    </VVTTransition>
  </div>
</template>

<script setup lang="ts">
import VVTTransition, { TransitionName, TransitionOrigin } from '@/base-ui/transition'
import { ref } from 'vue'

const showSquare = ref(true)
const transitionName = ref<TransitionName>('slide-right')
const transitionNameOptions = ref<TransitionName[]>([
  'slide-right',
  'slide-left',
  'slide-top',
  'slide-bottom',
  'scale-up',
  'scale-rotate-up'
])
const transitionOrigin = ref<TransitionOrigin>('center')
const transitionOriginOptions = ref<TransitionOrigin[]>([
  'left',
  'left top',
  'left bottom',
  'center',
  'center top',
  'center bottom',
  'right',
  'right top',
  'right bottom'
])
</script>

<style scoped>
#square {
  width: 100px;
  height: 100px;
  background: #002c55;
}
.select-wrapper {
  display: flex;
  align-items: center;
  padding: 20px 0;
}
.label {
  width: 100px;
}
</style>
