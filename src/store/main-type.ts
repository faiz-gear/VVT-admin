import { RouteRecordRaw } from 'vue-router'

export interface IMainState {
  username: string
  routes: RouteRecordRaw[]
  token: string
}

export interface IMainActions {
  registerAsyncRoutes: () => void
  setName: (username: string) => void
  setToken: (token: string) => void
}
