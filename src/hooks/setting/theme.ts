import { computed } from 'vue'
import useMainStore from '@/store/main'
import { storeToRefs } from 'pinia'

export function useThemeColor() {
  const mainStore = useMainStore()
  const { theme } = storeToRefs(mainStore)
  const themeColor = computed(() => (theme.value === 'light' ? '#333' : '#fff'))

  return themeColor
}
