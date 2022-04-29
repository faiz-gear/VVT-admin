import * as ElementIcons from '@element-plus/icons-vue'
import { App } from 'vue'

export default function registerIcons(app: App) {
  for (const key in ElementIcons) {
    app.component(key, (ElementIcons as any)[key])
  }
}
