import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import "@babel/polyfill"
import "./assets/style.css"
import moment from "moment-timezone"

// Import the Auth0 configuration
import { domain, clientId, audience } from "../auth_config.json"

// Import the plugin here
import { Auth0Plugin } from "./auth"

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    )
  },
})

Vue.filter("formatDate", function (value) {
  if (value) {
    return moment(String(value)).format("MM/DD/YYYY hh:mm")
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount("#app")
