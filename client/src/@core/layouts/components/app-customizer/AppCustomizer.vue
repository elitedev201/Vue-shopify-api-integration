<template>
  <div class="app-customizer">
    <v-btn
      icon
      class="app-customizer-toggler rounded-0"
      :class="$vuetify.rtl ? 'rounded-r-lg' : 'rounded-l-lg'"
      color="white"
      large
      @click="isCustomizerOpen = !isCustomizerOpen"
    >
      <v-icon size="25">
        {{ icons.mdiCog }}
      </v-icon>
    </v-btn>
    <v-navigation-drawer
      v-model="isCustomizerOpen"
      :right="!$vuetify.rtl"
      temporary
      fixed
      width="400"
      class="app-customizer-drawer"
    >
      <!-- Heading -->
      <div class="app-customizer-header customizer-section py-3">
        <h6
          class="font-weight-semibold text-xl text--primary"
        >
          THEME CUSTOMIZER
        </h6>
        <span class="text--secondary">Customize and preview in real time</span>
        <v-btn
          icon
          class="icon-customizer-close"
          @click="isCustomizerOpen = false"
        >
          <v-icon>
            {{ icons.mdiClose }}
          </v-icon>
        </v-btn>
      </div>

      <v-divider></v-divider>

      <perfect-scrollbar
        :options="perfectScrollbarOptions"
        class="ps-customizer"
      >
        <!-- Section: Themeing -->
        <div class="customizer-section">
          <p class="text-xs text--disabled">
            THEMING
          </p>
          <!-- Skin -->
          <span class="text--primary">Skin</span>
          <v-radio-group
            v-model="appSkinVariant"
            class="mt-1"
            hide-details
            row
          >
            <v-radio
              v-for="option in skinOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            ></v-radio>
          </v-radio-group>
          <!-- Mode -->
          <span class="mt-6 d-inline-block mb-2 text--primary">Mode</span>
          <div class="d-flex align-center">
            <span class="text--secondary text-sm">Light</span>
            <v-switch
              v-model="isDark"
              hide-details
              class="mt-0 mx-2"
            ></v-switch>
            <span class="text--secondary text-sm">Dark</span>
          </div>
        </div>

        <v-divider></v-divider>

        <!-- Section: Themeing -->
        <div class="customizer-section">
          <p class="text-xs text--disabled">
            LAYOUT
          </p>

          <!-- Content Width -->
          <span class="text--primary">Content Width</span>
          <v-radio-group
            v-model="appContentWidth"
            class="mt-1"
            hide-details
            row
          >
            <v-radio
              v-for="option in appContentWidthOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            ></v-radio>
          </v-radio-group>

          <!-- AppBar Type -->
          <span class="mt-6 d-inline-block text--primary">AppBar Type</span>
          <v-radio-group
            v-model="appBarType"
            class="mt-1"
            hide-details
            row
          >
            <v-radio
              v-for="option in appBarTypeOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            ></v-radio>
          </v-radio-group>

          <!-- Footer Type -->
          <span class="mt-6 d-inline-block text--primary">Footer Type</span>
          <v-radio-group
            v-model="footerType"
            class="mt-1"
            hide-details
            row
          >
            <v-radio
              v-for="option in footerTypeOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            ></v-radio>
          </v-radio-group>

          <!-- Blur -->
          <div class="d-flex align-center justify-space-between mt-6">
            <span class="text--primary">AppBar Blur</span>
            <v-switch
              v-model="appBarIsBlurred"
              hide-details
              class="mt-0 ms-2"
            ></v-switch>
          </div>
        </div>

        <v-divider></v-divider>

        <!-- Section: Menu -->
        <div class="customizer-section">
          <p class="text-xs text--disabled">
            MENU
          </p>
          <template v-if="$vuetify.breakpoint.lgAndUp">
            <!-- Menu Layout -->
            <span class="text--primary">Menu Layout</span>
            <v-radio-group
              v-model="appContentLayoutNav"
              class="mt-1"
              hide-details
              row
            >
              <v-radio
                v-for="option in appContentLayoutNavOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              ></v-radio>
            </v-radio-group>
          </template>

          <!-- Menu Collapsed -->
          <div
            v-if="appContentLayoutNav === 'vertical'"
            class="d-flex align-center justify-space-between mt-6"
          >
            <span class="text--primary">Menu Collapsed</span>
            <v-switch
              v-model="menuIsVerticalNavMini"
              hide-details
              class="mt-0 ms-2"
            ></v-switch>
          </div>

          <!-- Menu Hidden -->
          <div class="d-flex align-center justify-space-between mt-6">
            <span class="text--primary">Menu Hidden</span>
            <v-switch
              v-model="menuIsMenuHidden"
              hide-details
              class="mt-0 ms-2"
            ></v-switch>
          </div>
        </div>
        <v-divider></v-divider>
        <!-- Section: Misc -->
        <div class="customizer-section">
          <p class="text-xs text--disabled">
            MISC
          </p>
          <!-- RTL -->
          <div class="d-flex align-center justify-space-between mt-6">
            <span class="text--primary">RTL</span>
            <v-switch
              v-model="isRtl"
              hide-details
              class="mt-0 ms-2"
            ></v-switch>
          </div>
          <!-- Router Transition -->
          <v-row class="mt-6 align-center">
            <v-col><span class="text--primary">Router Transition</span></v-col>
            <v-col col="4">
              <v-select
                v-model="appRouteTransition"
                :items="routerTransitionOptions"
                outlined
                hide-details
                dense
                class="select-router-transition"
              ></v-select>
            </v-col>
          </v-row>
        </div>
      </perfect-scrollbar>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { computed, ref } from '@vue/composition-api'
import useAppConfig from '@core/@app-config/useAppConfig'

import { mdiCog, mdiClose } from '@mdi/js'

import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import themeVariants from './themeVariants'

// 3rd Party

export default {
  components: {
    PerfectScrollbar,
  },
  setup() {
    const isCustomizerOpen = ref(false)
    // eslint-disable-next-line object-curly-newline
    const {
      appContentLayoutNav,
      appSkinVariant,
      appContentWidth,
      appRouteTransition,
      menuIsVerticalNavMini,
      menuIsMenuHidden,
      appBarType,
      appBarIsBlurred,
      footerType,
      isDark,
      isRtl,
      themes,
    } = useAppConfig()

    const selectedTheme = ref('vuexy')

    const routerTransitionOptions = [
      { text: 'Scroll X', value: 'scroll-x-transition' },
      { text: 'Scroll X Reverse', value: 'scroll-x-reverse-transition' },
      { text: 'Scroll Y', value: 'scroll-y-transition' },
      { text: 'Scroll Y Reverse', value: 'scroll-y-reverse-transition' },
      { text: 'Slide X', value: 'slide-x-transition' },
      { text: 'Slide X Reverse', value: 'slide-x-reverse-transition' },
      { text: 'Slide Y', value: 'slide-y-transition' },
      { text: 'Slide Y Reverse', value: 'slide-y-reverse-transition' },
      { text: 'Fade', value: 'fade-transition' },
    ]

    const skinOptions = computed(() => {
      const options = [
        { label: 'Default', value: 'default' },
        { label: 'Bordered', value: 'bordered' },
        { label: 'Semi Dark', value: 'semi-dark' },
      ]
      if (appContentLayoutNav.value === 'horizontal') options.splice(-1, 1)

      return options
    })

    const appContentWidthOptions = [
      { label: 'Full Width', value: 'full' },
      { label: 'Boxed', value: 'boxed' },
    ]

    const appBarTypeOptions = computed(() => {
      const types = [
        { label: 'Fixed', value: 'fixed' },
        { label: 'Static', value: 'static' },
        { label: 'Hidden', value: 'hidden' },
      ]
      if (appContentLayoutNav.value === 'horizontal') types.splice(-1, 1)

      return types
    })

    const footerTypeOptions = [
      { label: 'Fixed', value: 'fixed' },
      { label: 'Static', value: 'static' },
      { label: 'Hidden', value: 'hidden' },
    ]

    const appContentLayoutNavOptions = [
      { label: 'Vertical', value: 'vertical' },
      { label: 'Horizontal', value: 'horizontal' },
    ]

    const perfectScrollbarOptions = {
      maxScrollbarLength: 60,
      wheelPropagation: false,
    }

    return {
      isCustomizerOpen,
      selectedTheme,
      appRouteTransition,
      themeVariants,

      // App Content Layout Nav
      appContentLayoutNavOptions,
      appContentLayoutNav,

      // Skin
      appSkinVariant,
      skinOptions,

      // App Content Width
      appContentWidth,
      appContentWidthOptions,

      menuIsMenuHidden,
      menuIsVerticalNavMini,

      // AppBar Type
      appBarType,
      appBarIsBlurred,
      appBarTypeOptions,

      // Footer Type
      footerType,
      footerTypeOptions,

      isDark,
      isRtl,
      themes,
      routerTransitionOptions,

      // Perfect scrollbar options
      perfectScrollbarOptions,

      // Icons
      icons: {
        mdiCog,
        mdiClose,
      },
    }
  },
}
</script>

<style lang="scss">
@import '~vuetify/src/styles/styles.sass';

.ps-customizer {
  height: calc(100% - 81px) !important;
}

.app-customizer-toggler {
  position: fixed;
  top: 50%;
  transform: translateX(-50%);
  background: var(--v-primary-base);
  @include ltr() {
    right: -22px;
  }
  @include rtl() {
    left: 20px;
  }
}

@include theme(app-customizer-drawer) using ($material) {
  background-color: map-deep-get($material, 'cards');
}

.app-customizer {
  z-index: 7;

  .v-label {
    font-size: 0.875rem;
  }

  .app-customizer-header {
    position: relative;
    .icon-customizer-close {
      position: absolute;
      @include ltr() {
        right: 20px;
      }
      @include rtl() {
        left: 20px;
      }
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .customizer-section {
    padding: 24px;
  }

  // Fixes Overlay is shown below SystemBar
  @at-root {
    .v-overlay {
      & + .v-application--wrap > .v-system-bar {
        z-index: 6 !important;
      }
    }
  }
}
</style>
