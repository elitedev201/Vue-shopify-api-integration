<template>
  <v-app-bar color="blue" dark>
    <v-app-bar-nav-icon href="/" color="white"></v-app-bar-nav-icon>
    <v-app-bar-title class="custom-title">Tconsign - Portal</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon color="white" v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <v-list-item-title>
            <div v-if="!$auth.loading">
              <!-- show login when not authenticated -->
              <a v-if="!$auth.isAuthenticated" @click="login" class="grey-col">Sign Up</a>
              <!-- show logout when authenticated -->
              <a v-if="$auth.isAuthenticated" class="grey-col">{{ $auth.user.name }}</a>
            </div>
          </v-list-item-title>
        </v-list-item>
        <div v-if="$auth.isAuthenticated">
          <v-list-item href="/products">
            <v-list-item-title><a class="grey-col">Products</a></v-list-item-title>
          </v-list-item>
        </div>
        <div v-if="$auth.isAuthenticated">
          <v-list-item>
            <v-list-item-title><a class="grey-col">Consignors</a></v-list-item-title>
          </v-list-item>
        </div>
        <v-list-item>
          <v-list-item-title>
            <div v-if="!$auth.loading">
              <!-- show login when not authenticated -->
              <a v-if="!$auth.isAuthenticated" @click="login" class="grey-col">Sign in</a>
              <!-- show logout when authenticated -->
              <a v-if="$auth.isAuthenticated" @click="logout" class="grey-col">Log out</a>
            </div>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {}
  },
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect()
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      })
    },
  },
}
</script>

<style scoped></style>
