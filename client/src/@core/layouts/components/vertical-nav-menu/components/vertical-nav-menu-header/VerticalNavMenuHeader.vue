<template>
  <div class="vertical-nav-header d-flex align-center justify-space-between ps-6 pe-5 pt-5 pb-2">
    <router-link
      to="/"
      class="d-flex align-center text-decoration-none"
    >
      <v-img
        :src="appLogo"
        max-height="30px"
        max-width="30px"
        alt="logo"
        contain
        eager
        class="app-logo me-3"
      ></v-img>
      <v-slide-x-transition>
        <h2
          v-show="!(menuIsVerticalNavMini && !isMouseHovered)"
          class="app-title text--primary"
        >
          {{ appName }}
        </h2>
      </v-slide-x-transition>
    </router-link>

    <v-slide-x-transition>
      <div
        v-show="!(menuIsVerticalNavMini && !isMouseHovered)"
        v-if="$vuetify.breakpoint.lgAndUp"
        class="d-flex align-center ms-1"
        @click.stop="menuIsVerticalNavMini = !menuIsVerticalNavMini"
      >
        <v-icon
          v-show="!menuIsVerticalNavMini"
          size="20"
          class="cursor-pointer"
        >
          {{ icons.mdiRecordCircleOutline }}
        </v-icon>
        <v-icon
          v-show="menuIsVerticalNavMini"
          size="20"
          class="cursor-pointer"
        >
          {{ icons.mdiRadioboxBlank }}
        </v-icon>
      </div>
      <v-icon
        v-else
        size="20"
        class="d-inline-block"
        @click.stop="$emit('close-nav-menu')"
      >
        {{ icons.mdiClose }}
      </v-icon>
    </v-slide-x-transition>
  </div>
</template>

<script>
import { mdiRadioboxBlank, mdiRecordCircleOutline, mdiClose } from '@mdi/js'
import useAppConfig from '@core/@app-config/useAppConfig'
import themeConfig from '@themeConfig'
import { inject } from '@vue/composition-api'

export default {
  setup() {
    const { menuIsVerticalNavMini } = useAppConfig()
    const isMouseHovered = inject('isMouseHovered')

    return {
      menuIsVerticalNavMini,
      isMouseHovered,
      appName: themeConfig.app.name,
      appLogo: themeConfig.app.logo,

      // Icons
      icons: {
        mdiClose,
        mdiRadioboxBlank,
        mdiRecordCircleOutline,
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.app-title {
  font-size: 1.25rem;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.3px;
}

// ? Adjust this `translateX` value to keep logo in center when vertical nav menu is collapsed (Value depends on your logo)
.app-logo {
  transition: all 0.18s ease-in-out;
  .v-navigation-drawer--mini-variant & {
    transform: translateX(-4px);
  }
}
</style>
