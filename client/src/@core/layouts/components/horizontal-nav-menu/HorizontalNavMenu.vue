<template>
  <div
    class="horizontal-nav-menu"
    :class="rootThemeClasses"
  >
    <component
      :is="resolveNavHeaderComponent(item)"
      v-for="item in navMenuItems"
      :key="item.header || item.title"
      :item="item"
    />
  </div>
</template>

<script>
import HorizontalNavMenuHeaderLink from '@core/layouts/components/horizontal-nav-menu/components/horizontal-nav-menu-header-link/HorizontalNavMenuHeaderLink.vue'
import HorizontalNavMenuHeaderGroup from '@core/layouts/components/horizontal-nav-menu/components/horizontal-nav-menu-header-group/HorizontalNavMenuHeaderGroup.vue'

import useVuetify from '@core/utils/vuetify'

export default {
  components: {
    HorizontalNavMenuHeaderLink,
    HorizontalNavMenuHeaderGroup,
  },
  props: {
    navMenuItems: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const { rootThemeClasses } = useVuetify()
    const resolveNavHeaderComponent = item => {
      if (item.children) return 'horizontal-nav-menu-header-group'

      return 'horizontal-nav-menu-header-link'
    }

    return {
      resolveNavHeaderComponent,
      rootThemeClasses,
    }
  },
}
</script>

<style lang="scss">
@import '~vuetify/src/styles/styles.sass';

.horizontal-nav-menu {
  // ? As v-menu is sibling of button activator we also have to exclude it
  > *:not(:last-child):not(.v-menu) {
    @include ltr() {
      margin-right: 8px;
    }
    @include rtl() {
      margin-left: 8px;
    }
  }
  > .v-btn {
    .v-icon {
      transition: none !important;
    }
  }

  // Fixes: Items drop on second row
  @media screen and (max-width: 1400px) {
    .v-application .v-app-bar.v-toolbar.navigation-menu .v-toolbar__content & {
      padding: 0 !important;
      display: flex;
      justify-content: center;

      > .v-btn {
        @include ltr() {
          margin-right: 0 !important;
        }
        @include rtl() {
          margin-left: 0 !important;
        }
      }
    }
  }
}

.v-application.horizontal-nav {
  .v-system-bar {
    .app-bar-autocomplete-box {
      left: 3rem !important;
    }
  }
}
</style>
