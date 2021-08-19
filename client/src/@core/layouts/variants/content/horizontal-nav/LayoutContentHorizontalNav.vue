<template>
  <v-app
    class="content-layout horizontal-nav"
    :class="{'content-full': appContentWidth === 'full'}"
  >
    <!-- Navbar -->
    <v-system-bar
      app
      height="64"
      :absolute="appBarType === 'static'"
      :class="[{'app-system-bar-boxed': appContentWidth === 'boxed'}, { 'bg-blur': appBarIsBlurred }]"
      class="app-system-bar"
    >
      <slot name="navbar"></slot>
    </v-system-bar>

    <!-- Horizontal Nav Menu -->
    <v-app-bar
      v-if="!menuIsMenuHidden"
      class="navigation-menu"
      :class="{ 'bg-blur': appBarIsBlurred }"
      app
      height="64"
      :absolute="appBarType === 'static'"
      :elevation="$vuetify.theme.isDark ? 4 : 3"
    >
      <horizontal-nav-menu
        :nav-menu-items="navMenuItems"
        :class="{'horizontal-nav-menu-boxed mx-auto': appContentWidth === 'boxed'}"
      ></horizontal-nav-menu>
    </v-app-bar>

    <slot name="v-app-content"></slot>

    <v-main>
      <app-content-container>
        <slot></slot>
      </app-content-container>
    </v-main>
    <v-overlay
      :value="$store.state.app.shallContentShowOverlay"
      z-index="6"
      absolute
      class="content-overlay"
    ></v-overlay>

    <v-footer
      v-if="footerType !== 'hidden'"
      app
      inset
      :absolute="footerType === 'static'"
      padless
      :color="footerType === 'static' ? 'transparent' : null"
    >
      <v-col cols="12">
        <slot name="footer"></slot>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import AppContentContainer from '@core/layouts/components/app-content-container/AppContentContainer.vue'
import useAppConfig from '@core/@app-config/useAppConfig'
import HorizontalNavMenu from '@/@core/layouts/components/horizontal-nav-menu/HorizontalNavMenu.vue'

export default {
  components: {
    AppContentContainer,
    HorizontalNavMenu,
  },
  props: {
    navMenuItems: {
      type: Array,
      required: true,
    },
  },
  setup() {
    // eslint-disable-next-line object-curly-newline
    const { menuIsMenuHidden, appBarType, appBarIsBlurred, footerType, appContentWidth } = useAppConfig()

    return {
      menuIsMenuHidden,
      appBarType,
      appBarIsBlurred,
      footerType,
      appContentWidth,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~@core/layouts/styles/_variables';

.app-content-container {
  padding: $content-padding-horizontal-navigation-menu;
  &.app-content-container-boxed {
    padding: $boxed-content-padding-horizontal-navigation-menu;
  }
}

@include theme(v-application) using ($material) {
  .app-system-bar {
    box-shadow: 0 1px 0 0 map-deep-get($material, 'dividers');
  }
  .v-app-bar.navigation-menu {
    border-bottom: thin solid map-deep-get($material, 'dividers');
  }
}

.v-application {
  // System bar
  .app-system-bar {
    padding: 0 !important;
    // border-bottom: thin solid rgba(94, 86, 105, 0.14);
    // box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.09);

    &.app-system-bar-boxed {
      ::v-deep > div:first-child {
        padding: $boxed-content-padding-horizontal-navigation-menu !important;
        padding-top: 0 !important;
        padding-bottom: 0 !important;
        max-width: 1440px;
        margin-left: auto;
        margin-right: auto;
      }
    }
    ::v-deep > div:first-child {
      padding-left: $content-padding-vertical-navigation-menu !important;
      padding-right: $content-padding-vertical-navigation-menu !important;
    }
  }

  // App Bar
  .v-app-bar {
    ::v-deep .v-toolbar__content {
      padding: 0;
    }

    .horizontal-nav-menu {
      padding-left: $content-padding-vertical-navigation-menu !important;
      padding-right: $content-padding-vertical-navigation-menu !important;

      &.horizontal-nav-menu-boxed {
        width: 1440px;
        padding: $boxed-content-padding-horizontal-navigation-menu !important;
      }
    }
  }

  // @media screen and (max-width: 1711px) {
  //   margin-left: 1.5rem !important;
  //   margin-right: 1.5rem !important;
  // }

  // Footer
  .v-footer > div {
    max-width: 1440px;
    margin-left: auto;
    margin-right: auto;
    // Padding value is from `$boxed-content-padding-horizontal-navigation-menu`
    // We will keep top and buttom padding value of footer as it is
    padding-left: 3rem;
    padding-right: 3rem;

    @at-root .content-layout.content-full {
      .v-footer > div {
        max-width: unset;
        padding-left: $content-padding-vertical-navigation-menu !important;
        padding-right: $content-padding-vertical-navigation-menu !important;
      }
    }
  }
}
</style>
