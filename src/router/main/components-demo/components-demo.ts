const ComponentsDemo = () => import('@/views/main/components-demo/ComponentsDemo.vue')
const Table = () => import('@/views/main/components-demo/table/Table.vue')
const BasicTable = () => import('@/views/main/components-demo/table/basic/BasicTable.vue')
const Form = () => import('@/views/main/components-demo/form/Form.vue')
const BasicForm = () => import('@/views/main/components-demo/form/basic/BasicForm.vue')
const Transition = () => import('@/views/main/components-demo/transition/Transition.vue')

export default {
  path: 'components-demo',
  name: 'components-demo',
  redirect: '/main/components-demo/table',
  component: ComponentsDemo,
  meta: {
    title: '组件',
    fullPath: '/main/components-demo/table',
    icon: 'grid'
  },
  children: [
    {
      path: 'table',
      name: 'table',
      redirect: '/main/components-demo/table/basic-table',
      component: Table,
      meta: {
        title: '表格',
        fullPath: '/main/components-demo/table/basic-table'
      },
      children: [
        {
          path: 'basic-table',
          name: 'basic-table',
          component: BasicTable,
          meta: {
            title: '基础表格',
            fullPath: '/main/components-demo/table/basic-table'
          }
        }
      ]
    },
    {
      path: 'form',
      name: 'form',
      redirect: '/main/components-demo/form/basic-form',
      component: Form,
      meta: {
        title: '表单',
        fullPath: '/main/components-demo/form/basic-form'
      },
      children: [
        {
          path: 'basic-form',
          name: 'basic-form',
          component: BasicForm,
          meta: {
            title: '基础表单',
            fullPath: '/main/components-demo/form/basic-form'
          }
        }
      ]
    },
    {
      path: 'transition',
      name: 'transition',
      component: Transition,
      meta: {
        title: '过渡组件',
        fullPath: '/main/components-demo/transition'
      }
    }
  ]
}
