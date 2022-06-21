<template>
  <div class="form">
    <VVTForm ref="vvtFormRef" v-bind="formConfig" v-model="formData">
      <template #slot>
        <el-button>插槽</el-button>
      </template>
      <template #footer>
        <el-row justify="end">
          <el-button type="primary" @click="handleQueryClick">查询</el-button>
          <el-button type="success" @click="handleResetClick">重置</el-button>
        </el-row>
      </template>
    </VVTForm>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import VVTForm from '@/base-ui/form/index'
import formConfig from './config/form.config'

const vvtFormRef = ref<InstanceType<typeof VVTForm>>()

const formData = reactive({
  name: '',
  password: '',
  role: ''
})

const handleQueryClick = () => {
  vvtFormRef.value?.validate!((valid) => {
    console.log(valid)
  })
}

const handleResetClick = () => {
  vvtFormRef.value?.resetFields!()
}
</script>

<style scoped></style>
