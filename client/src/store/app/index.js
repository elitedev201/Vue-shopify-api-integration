export default {
  namespaced: true,
  state: {
    shallContentShowOverlay: false,
  },
  getters: {},
  mutations: {
    TOGGLE_CONTENT_OVERLAY(state, value) {
      state.shallContentShowOverlay = value !== undefined ? value : !state.shallContentShowOverlay
    },
  },
  actions: {},
}
