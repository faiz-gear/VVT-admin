import { RouteRecordRaw } from 'vue-router'

export type Theme = 'light' | 'dark'

export interface IMainState {
  username: string
  routes: RouteRecordRaw[]
  token: string
  theme: Theme
}

export interface IMainActions {
  registerAsyncRoutes: () => void
  setName: (username: string) => void
  setToken: (token: string) => void
  setTheme: (theme: Theme) => void
}
