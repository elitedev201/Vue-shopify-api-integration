<template>
  <div>
    <v-app-bar absolute light scroll-threshold="500" class="tc-appbar">
      <a href="/" class="icon-space">
        <v-img src="@/assets/images/tc-logo.png" class="icon-width"></v-img>
      </a>
      <v-spacer></v-spacer>
      <v-menu
        offset-y
        left
        nudge-bottom="14"
        min-width="230"
        content-class="user-profile-menu-content"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-badge
            bottom
            color="success"
            overlap
            offset-x="12"
            offset-y="12"
            class="ms-4"
            dot
          >
            <v-avatar
              size="40px"
              v-bind="attrs"
              color="primary"
              class="v-avatar-light-bg primary--text"
              v-on="on"
            >
              <v-img :src="require('@/assets/images/avatars/1.png')"></v-img>
            </v-avatar>
          </v-badge>
        </template>
        <v-list>
          <div v-if="$auth.isAuthenticated">
            <div class="pb-3 pt-2">
              <v-badge
                bottom
                color="success"
                overlap
                offset-x="12"
                offset-y="12"
                class="ms-4"
                dot
              >
                <v-avatar
                  size="40px"
                  color="primary"
                  class="v-avatar-light-bg primary--text"
                >
                  <v-img
                    :src="require('@/assets/images/avatars/1.png')"
                  ></v-img>
                </v-avatar>
              </v-badge>
              <div
                class="d-inline-flex flex-column justify-center ms-3"
                style="vertical-align:middle"
              >
                <span class="text--primary font-weight-semibold mb-n1">
                  {{ $auth.user.name }}
                </span>
                <small class="text--disabled text-capitalize">Admin</small>
              </div>
            </div>

            <v-divider></v-divider>
          </div>
          <v-list-item>
            <v-list-item-icon class="me-2">
              <v-icon size="22">
                {{ icons.mdiLogoutVariant }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                <div v-if="!$auth.loading">
                  <!-- show login when not authenticated -->
                  <a v-if="!$auth.isAuthenticated" @click="login">Sign in</a>
                  <!-- show logout when authenticated -->
                  <a v-if="$auth.isAuthenticated" @click="logout">Log out</a>
                </div>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon class="me-2">
              <v-icon size="22">
                {{ icons.mdiAccountOutline }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title @click="login"><a>Sign Up</a></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-card class="mb-12 tc-ds-layout">
      <v-img src="@/assets/images/yellow-pillow-bedside-table_1920x.jpg">
        <v-card-title class="tc-title">
          Tacoma Consignment Portal
        </v-card-title>
      </v-img>
    </v-card>
    <div class="d-flex justify-space-between tc-footer-layout">
      <span
        >COPYRIGHT &copy; {{ new Date().getFullYear() }}
        <a
          href="https://tacoma-consignment.myshopify.com/"
          class="text-decoration-none"
          >Tacoma Consignment Portal</a
        ><span class="d-none d-md-inline">, All rights Reserved</span></span
      >
      <div class="align-center d-none d-md-flex">
        <span>Hand-crafted &amp; Made with Smith Mori</span>
        <v-icon color="error" class="ms-2"> </v-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { mdiLogoutVariant, mdiAccountOutline } from "@mdi/js"

export default {
  setup() {
    return {
      icons: {
        mdiAccountOutline,
        mdiLogoutVariant,
      },
    }
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

<style lang="scss">
.user-profile-menu-content {
  .v-list-item {
    min-height: 2.5rem !important;
  }
}
</style>
