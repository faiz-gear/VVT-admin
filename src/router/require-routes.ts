import { RouteRecordRaw } from 'vue-router'

export default function requireAllRoutes(): RouteRecordRaw[] {
  const allRoutes: RouteRecordRaw[] = []

  const allRoutesFilePath = import.meta.globEager('./main/**/*.ts')
  Object.values(allRoutesFilePath).forEach((module) => {
    allRoutes.push(module.default)
  })

  return allRoutes
}
