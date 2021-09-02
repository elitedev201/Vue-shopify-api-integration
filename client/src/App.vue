<template>
  <v-app>
    <app-header></app-header>
    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <router-view></router-view>
    </v-main>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import AppHeader from "./components/Header.vue"
import AppFooter from "./components/Footer.vue"
export default {
  data: () => ({}),
  components: {
    AppHeader,
    AppFooter,
  },
  setup() {
    return {}
  },
}
</script>

<style></style>
