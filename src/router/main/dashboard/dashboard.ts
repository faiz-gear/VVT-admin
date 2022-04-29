const Dashboard = () => import('@/views/main/dashboard/Dashboard.vue')

export default {
  path: 'dashboard',
  name: 'dashboard',
  component: Dashboard,
  children: [],
  meta: {
    title: '首页',
    fullPath: '/main/dashboard',
    icon: 'house'
  }
}
