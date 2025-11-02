import { createI18n } from 'vue-i18n'
import { pt } from './pt'

export const i18n = createI18n({
  locale: 'pt',
  fallbackLocale: 'en',
  messages: {
    pt,
  },
})
