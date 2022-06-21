import type { FormItemRule } from 'element-plus'

type FormItemType = 'input' | 'password' | 'select' | 'datepicker' | 'textarea' | 'slot'

// 下拉框选项的类型
export interface ISelectOption {
  label: string
  value: string | number
}

// 栅格化布局配置类型
export interface IColLayout {
  span?: number
  offset?: number
  xs?: number // < 768
  sm?: number // >= 768
  md?: number // >= 992
  lg?: number // >=1200
  xl?: number // >= 1920
}

// formItem 属性
export interface IFormItem {
  field: string
  type: FormItemType
  label?: string
  rules?: FormItemRule[]
  placeholder?: any
  // 针对select
  options?: ISelectOption[]
  // 针对特殊的属性
  otherOptions?: any
  // 当前表单是否隐藏
  isHidden?: boolean
  // 单个表单元素的栅格布局配置
  colLayout?: IColLayout
  // 插槽
  slotName?: string
}

// form 属性
export interface IFormProp {
  labelWidth?: string | number
  labelPosition?: 'left' | 'top' | 'right'
  hideRequiredAsterisk?: boolean
  size?: 'large' | 'default' | 'small'
}

export interface IForm {
  formItems: IFormItem[]
  formProp: IFormProp
  colLayout?: IColLayout
  itemStyle?: any
}
