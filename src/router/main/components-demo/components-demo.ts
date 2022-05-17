const ComponentsDemo = () => import('@/views/main/components-demo/ComponentsDemo.vue')
const Table = () => import('@/views/main/components-demo/table/Table.vue')
const Form = () => import('@/views/main/components-demo/form/Form.vue')
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
      component: Table,
      meta: {
        title: '基础表格组件',
        fullPath: '/main/components-demo/table'
      }
    },
    {
      path: 'form',
      name: 'form',
      component: Form,
      meta: {
        title: '基础表单组件',
        fullPath: '/main/components-demo/form'
      }
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
