<template>
  <div class="vvt-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form ref="elFormRef" :model="formData" v-bind="formProp">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
              :prop="item.field"
            >
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <el-option v-for="option in item.options" :key="option.value" :value="option.value">{{
                    option.label
                  }}</el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker v-bind="item.otherOptions" v-model="formData[`${item.field}`]" style="width: 100%">
                </el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * 功能1: 根据传入的formItems的type属性决定展示input还是select等其他组件，label属性显示标签、placeholder显示占位符
 * 功能2: 根据传入的formItems的otherOptions来配置element表单组件的一些特殊选项
 * 功能3: 根据labelWidth选项配置label的宽度
 * 功能4: 根据itemStyle来配置整体表单组件项的样式
 * 功能5: 根据colLayout配置form表单的栅格化布局
 * 功能6: 通过插槽自定义头部尾部的内容
 */
import { FormInstance, FormItemProp, FormValidateCallback, FormValidationResult } from 'element-plus'
import { Arrayable } from 'element-plus/lib/utils'
import { onMounted, ref, watch } from 'vue'

import { IFormItem, IColLayout, IFormProp } from './form-type'

const props = withDefaults(
  defineProps<{
    modelValue: any
    formProp: IFormProp
    formItems: IFormItem[]
    itemStyle?: any
    colLayout?: IColLayout
  }>(),
  {
    formProp: () => ({
      labelWidth: '120px',
      labelPosition: 'right',
      hideRequiredAsterisk: false,
      size: 'default'
    }),
    itemStyle: () => ({
      padding: '10px 20px'
    }),
    colLayout: () => ({
      xs: 24,
      sm: 24,
      md: 12,
      lg: 8,
      xl: 6
    })
  }
)

const emits = defineEmits<{
  (e: 'update:modelValue', newFormData: any): void
}>()

const elFormRef = ref<FormInstance>()
const validate = ref<(callback?: FormValidateCallback | undefined) => FormValidationResult>()
const resetFields = ref<(props?: Arrayable<FormItemProp>) => void>()

defineExpose({
  validate,
  resetFields
})

const formData = ref<any>({})
watch(
  props.modelValue,
  (newModelValue) => {
    formData.value = { ...newModelValue }
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  formData,
  (newFormData) => {
    emits('update:modelValue', newFormData)
  },
  {
    deep: true
  }
)

onMounted(() => {
  validate.value = elFormRef.value!.validate
  resetFields.value = elFormRef.value!.resetFields
})
</script>

<style scoped lang="scss">
.vvt-form {
  padding-top: 22px;
}
</style>
