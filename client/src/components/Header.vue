<template>
  <v-app-bar app color="primary" dark>
    <v-icon href="/" color="white" class="px-4">mdi-cloud-upload</v-icon>
    <v-app-bar-title class="custom-title"
      >Tacoma Consignment Portal</v-app-bar-title
    >
    <v-spacer></v-spacer>
    <v-btn class="mx-4" color="primary" href="/consignors">Consignors</v-btn>
    <v-btn class="mx-4" color="primary" href="/products">Catalog</v-btn>
    <span class="mx-4" v-if="$auth.isAuthenticated">
      <v-icon right dark> mdi-cloud-upload </v-icon>{{ $auth.user.name }}</span
    >
    <v-btn @click="login" color="primary" v-if="!$auth.isAuthenticated"
      >Sign in
    </v-btn>
    <v-btn @click="logout" color="primary" v-if="$auth.isAuthenticated"
      >Log out
    </v-btn>
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
