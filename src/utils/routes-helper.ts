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
  routesMap.forEach(({ meta, children, path }, key) => {
    if (currentRoute.fullPath.includes(key)) {
      breadcrumbs.push({
        name: meta && meta.title,
        path: path as string,
        children: children?.map(({ meta: subMeta, path: subPath }: any) => ({
          name: subMeta && subMeta.title,
          path: subPath
        }))
      })
    }
  })
  return breadcrumbs
}
