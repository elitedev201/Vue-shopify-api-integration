import themeConfig from '@themeConfig'

export default {
  namespaced: true,
  state: {
    app: {
      contentLayoutNav: themeConfig.app.contentLayoutNav,
      routeTransition: themeConfig.app.routeTransition,
      skinVariant: localStorage.getItem('materio-skin-variant')
        ? localStorage.getItem('materio-skin-variant')
        : themeConfig.app.skinVariant,
      contentWidth: themeConfig.app.contentWidth,
    },
    menu: {
      isMenuHidden: themeConfig.menu.isMenuHidden,
      isVerticalNavMini: themeConfig.menu.isVerticalNavMini,
    },
    appBar: {
      type: themeConfig.appBar.type,
      isBlurred: themeConfig.appBar.isBlurred,
    },
    footer: {
      type: themeConfig.footer.type,
    },
    themes: themeConfig.themes,
  },
  mutations: {
    UPDATE_APP_ROUTE_TRANSITION(state, value) {
      state.app.routeTransition = value
    },
    UPDATE_CONTENT_LAYOUT_NAV(state, value) {
      state.app.contentLayoutNav = value
    },
    UPDATE_APP_SKIN_VARIANT(state, value) {
      state.app.skinVariant = value
    },
    UPDATE_APP_CONTENT_WIDTH(state, value) {
      state.app.contentWidth = value
    },
    TOGGLE_MENU_MENU_HIDDEN(state, value) {
      state.menu.isMenuHidden = value
    },
    TOGGLE_MENU_VERTICAL_NAV_MINI(state, value) {
      state.menu.isVerticalNavMini = value
    },
    UPDATE_APP_BAR_TYPE(state, value) {
      state.appBar.type = value
    },
    UPDATE_APP_BAR_IS_BLURRED(state, value) {
      state.appBar.isBlurred = value
    },
    UPDATE_FOOTER_TYPE(state, value) {
      state.footer.type = value
    },
    UPDATE_THEMES(state, value) {
      state.themes = value
    },
  },
}
