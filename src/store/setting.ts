import { ref } from 'vue'

import { defineStore } from 'pinia'
import type { Theme } from './setting-type'
import useStorage from '@/hooks/storage'
import { GLOBAL_VARIABLE_NAME } from '@/setting/variable-setting'

const storage = useStorage()

const useSettingStore = defineStore('setting', () => {
  const theme = ref<Theme>((storage.getItem(GLOBAL_VARIABLE_NAME.THEME) as Theme) || 'light')

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
  }

  return {
    theme,

    setTheme
  }
})

export default useSettingStore
