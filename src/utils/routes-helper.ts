import { IBreadcrumb } from '@/base-ui/breadcrumbs'
import { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'

export function mapRouteToBreadcrumbs(
  currentRoute: RouteLocationNormalizedLoaded,
  routes: RouteRecordRaw[]
): IBreadcrumb[] {
  const breadcrumbs: IBreadcrumb[] = []

  const _recurseGetBreadcrumbs = (currentRoute: RouteLocationNormalizedLoaded, routes: RouteRecordRaw[]) => {
    for (const route of routes) {
      if (route.name === currentRoute.name) {
        breadcrumbs.push({
          name: route.meta!.title as string,
          path: route.meta!.fullPath as string
        })
        return true
      }
      _recurseGetBreadcrumbs(currentRoute, route.children ?? []) &&
        breadcrumbs.push({
          name: route.meta!.title as string,
          path: route.meta!.fullPath as string
        })
    }
  }
  _recurseGetBreadcrumbs(currentRoute, routes)

  return breadcrumbs.reverse()
}
