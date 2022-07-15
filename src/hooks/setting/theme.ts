import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import useSettingStore from '@/store/setting'

export function useThemeColor() {
  const settingStore = useSettingStore()
  const { theme } = storeToRefs(settingStore)
  const themeColor = computed(() => (theme.value === 'light' ? '#333' : '#fff'))

  return themeColor
}
