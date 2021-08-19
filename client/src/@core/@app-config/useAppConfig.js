import store from '@/store'
import { getVuetify } from '@core/utils'
import { computed } from '@vue/composition-api'

export default function useAppConfig() {
  const $vuetify = getVuetify()

  const appContentLayoutNav = computed({
    get: () => store.state.appConfig.app.contentLayoutNav,
    set: value => {
      store.commit('appConfig/UPDATE_CONTENT_LAYOUT_NAV', value)
    },
  })

  const appRouteTransition = computed({
    get: () => store.state.appConfig.app.routeTransition,
    set: value => {
      store.commit('appConfig/UPDATE_APP_ROUTE_TRANSITION', value)
    },
  })

  const appSkinVariant = computed({
    get: () => store.state.appConfig.app.skinVariant,
    set: value => {
      store.commit('appConfig/UPDATE_APP_SKIN_VARIANT', value)
      localStorage.setItem('materio-skin-variant', value)
    },
  })

  const appContentWidth = computed({
    get: () => store.state.appConfig.app.contentWidth,
    set: value => {
      store.commit('appConfig/UPDATE_APP_CONTENT_WIDTH', value)
    },
  })

  const menuIsMenuHidden = computed({
    get: () => store.state.appConfig.menu.isMenuHidden,
    set: value => {
      store.commit('appConfig/TOGGLE_MENU_MENU_HIDDEN', value)
    },
  })

  const menuIsVerticalNavMini = computed({
    get: () => store.state.appConfig.menu.isVerticalNavMini,
    set: value => {
      store.commit('appConfig/TOGGLE_MENU_VERTICAL_NAV_MINI', value)
    },
  })

  const appBarType = computed({
    get: () => store.state.appConfig.appBar.type,
    set: value => {
      store.commit('appConfig/UPDATE_APP_BAR_TYPE', value)
    },
  })

  const appBarIsBlurred = computed({
    get: () => store.state.appConfig.appBar.isBlurred,
    set: value => {
      store.commit('appConfig/UPDATE_APP_BAR_IS_BLURRED', value)
    },
  })

  const footerType = computed({
    get: () => store.state.appConfig.footer.type,
    set: value => {
      store.commit('appConfig/UPDATE_FOOTER_TYPE', value)
    },
  })

  const isDark = computed({
    get: () => $vuetify.theme.dark,
    set: value => {
      $vuetify.theme.dark = value
      localStorage.setItem('materio-active-theme', value ? 'dark' : 'light')
    },
  })

  const isRtl = computed({
    get: () => $vuetify.rtl,
    set: value => {
      $vuetify.rtl = value
    },
  })

  const themes = computed({
    get: () => $vuetify.theme.themes,
    set: value => {
      store.commit('appConfig/UPDATE_THEMES', value)

      // ? We have to assign light and dark individually to make it reflect changes in UI
      // ! `$vuetify.theme.themes = value` isn't reactive
      $vuetify.theme.themes.light = value.light
      $vuetify.theme.themes.dark = value.dark
    },
  })

  return {
    appContentLayoutNav,
    appRouteTransition,
    appSkinVariant,
    appContentWidth,
    menuIsMenuHidden,
    menuIsVerticalNavMini,
    appBarType,
    appBarIsBlurred,
    footerType,
    isDark,
    isRtl,
    themes,
  }
}
