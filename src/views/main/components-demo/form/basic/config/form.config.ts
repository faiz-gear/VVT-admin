/*
 * @Author       : 卢瑶
 * @Date         : 2022-04-26 18:59:23
 * @LastEditTime : 2022-06-16 18:27:22
 * @LastEditors  : 卢瑶
 * @Description  :
 * @FilePath     : /vvt-admin/src/views/main/components-demo/form/basic/config/form.config.ts
 */

import { reactive } from 'vue'
import { IForm } from '../../../../../../base-ui/form'

const formConfig = reactive<IForm>({
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名',
      rules: [
        {
          required: true,
          message: '用户名不能为空',
          trigger: 'change'
        }
      ],
      colLayout: {
        xs: 24,
        sm: 24,
        md: 12,
        lg: 6,
        xl: 5
      }
    },
    {
      field: 'password',
      type: 'password',
      label: '密码',
      placeholder: '请输入密码',
      rules: [
        {
          required: true,
          message: '密码不能为空',
          trigger: 'change'
        }
      ],
      colLayout: {
        xs: 24,
        sm: 24,
        md: 12,
        lg: 6,
        xl: 5
      }
    },
    {
      field: 'role',
      type: 'select',
      label: '角色',
      placeholder: '请选择角色信息',
      options: [
        {
          label: '医生',
          value: '医生'
        },
        {
          label: '警察',
          value: '警察'
        },
        {
          label: '程序员',
          value: '程序员'
        }
      ],
      otherOptions: {
        valueKey: 'label'
      },
      colLayout: {
        xs: 24,
        sm: 24,
        md: 12,
        lg: 6,
        xl: 5
      }
    },
    {
      field: 'date',
      type: 'datepicker',
      label: '请选择起止时间',
      otherOptions: {
        type: 'datetime',
        format: 'YYYY/MM/DD HH:mm:ss',
        valueFormat: 'YYYY/MM/DD HH:mm:ss'
      },
      colLayout: {
        xs: 24,
        sm: 24,
        md: 12,
        lg: 6,
        xl: 9
      }
    },
    {
      field: 'text',
      type: 'textarea',
      label: '请输入内容',
      otherOptions: {
        autosize: { minRows: 2, maxRows: 6 }
      }
    },
    {
      field: 'slot',
      type: 'slot',
      slotName: 'slot'
    }
  ],
  formProp: {
    labelWidth: 110,
    labelPosition: 'right',
    hideRequiredAsterisk: false,
    size: 'large'
  }
})

export default formConfig
