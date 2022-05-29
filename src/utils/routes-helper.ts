import { IBreadcrumb } from '@/base-ui/breadcrumbs'
import { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'

export function mapRouteToBreadcrumbs(
  currentRoute: RouteLocationNormalizedLoaded,
  routes: RouteRecordRaw[]
): IBreadcrumb[] {
  const breadcrumbs: IBreadcrumb[] = []

  // 扁平化路由
  const routesMap = new Map()
  const stack = routes.slice()
  while (stack.length) {
    const top = stack[0]
    routesMap.set(top.name, top)
    stack.shift()
    if (top.children && top.children.length > 0) {
      stack.push(...top.children)
    }
  }
  // 当前路由 --> breadcrumbs
  routesMap.forEach((route, key) => {
    if (currentRoute.fullPath.includes(key)) {
      breadcrumbs.push({
        name: route.meta!.title as string,
        path: route.meta!.fullPath as string,
        children: route.children?.map((item: any) => ({
          name: item.meta!.title as string,
          path: item.meta!.fullPath as string
        }))
      })
    }
  })
  return breadcrumbs
}
