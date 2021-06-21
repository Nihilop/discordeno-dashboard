import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'
import router from '@/router'

export const SUPPORT_LOCALES = ['fr', 'en']

export function setupI18n(options = { locale: 'fr' }) {
  const i18n = createI18n(options)
  setI18nLanguage(i18n, options.locale)
  return i18n
}

export function setI18nLanguage(i18n, locale) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    i18n.global.locale.value = locale
  }
  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  document.querySelector('html').setAttribute('lang', locale)
}

export async function loadLocaleMessages(i18n, locale) {
  // load locale messages with dynamic import
  const messages = await import(
    /* webpackChunkName: "locale-[request]" */ `../locales/${locale}.json`
  )

  // set locale and locale message
  i18n.global.setLocaleMessage(locale, messages.default)

  return nextTick()
}

// router.beforeEach(async (to, from, next) => {
//   const paramsLocale = to.params.locale

//   // use locale if paramsLocale is not in SUPPORT_LOCALES
//   // if (!SUPPORT_LOCALES.includes(paramsLocale)) {
//   //   return next(`/${locale}`)
//   // }

//   // load locale messages
//   if (!i18n.global.availableLocales.includes(paramsLocale)) {
//     await loadLocaleMessages(i18n, paramsLocale)
//   }

//   // set i18n language
//   setI18nLanguage(i18n, paramsLocale)

//   return next()
// })