<template>
  <div
    class="vertical-nav-menu-container"
    @mouseenter="isMouseHovered = true"
    @mouseleave="isMouseHovered = false"
  >
    <slot name="v-nav-menu-header">
      <vertical-nav-menu-header @close-nav-menu="$emit('close-nav-menu')"></vertical-nav-menu-header>
    </slot>

    <!-- Shadow -->
    <div
      :class="{'d-block': shallShadowBottom}"
      class="shadow-bottom"
    />

    <perfect-scrollbar
      class="ps-nav-menu-items"
      :options="perfectScrollbarOptions"
      @ps-scroll-y="evt => { shallShadowBottom = evt.srcElement.scrollTop > 0 }"
    >
      <v-list
        expand
        shaped
        class="vertical-nav-menu-items"
      >
        <component
          :is="resolveNavItemComponent(item)"
          v-for="item in navMenuItems"
          :key="item.subheader || item.title"
          :item="item"
        />
      </v-list>
    </perfect-scrollbar>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { ref, provide } from '@vue/composition-api'

// SFCs
import VerticalNavMenuHeader from '@core/layouts/components/vertical-nav-menu/components/vertical-nav-menu-header/VerticalNavMenuHeader.vue'
import VerticalNavMenuSectionTitle from '@core/layouts/components/vertical-nav-menu/components/vertical-nav-menu-section-title/VerticalNavMenuSectionTitle.vue'
import VerticalNavMenuGroup from '@core/layouts/components/vertical-nav-menu/components/vertical-nav-menu-group/VerticalNavMenuGroup.vue'
import VerticalNavMenuLink from '@core/layouts/components/vertical-nav-menu/components/vertical-nav-menu-link/VerticalNavMenuLink.vue'

// Composable
import useVerticalNavMenu from '@/@core/layouts/composable/vertical-nav/useVerticalNavMenu'

// 3rd Party
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'

export default {
  components: {
    VerticalNavMenuHeader,
    VerticalNavMenuGroup,
    VerticalNavMenuLink,
    VerticalNavMenuSectionTitle,

    // 3rd Party
    PerfectScrollbar,
  },
  props: {
    navMenuItems: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const { resolveNavItemComponent, isMouseHovered } = useVerticalNavMenu()
    provide('isMouseHovered', isMouseHovered)

    const perfectScrollbarOptions = {
      maxScrollbarLength: 60,
      wheelPropagation: false,
    }

    // Shadow bottom is UI specific and can be removed by user => It's not in `useVerticalNavMenu`
    const shallShadowBottom = ref(false)

    provide('openGroups', ref([]))

    return {
      resolveNavItemComponent,
      perfectScrollbarOptions,
      isMouseHovered,
      shallShadowBottom,
    }
  },
}
</script>

<style lang="scss">
@import '~vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css';
</style>

<style lang="scss">
@import '~vuetify/src/styles/styles.sass';
@import '~@core/preset/preset/mixins.scss';

.app-navigation-menu {
  transition-duration: 0.4s !important;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1), ease !important;
  will-change: box-shadow, transform !important;

  .v-list-item,
  .v-subheader {
    padding: 0 18px 0 22px;
  }

  .v-list-item {
    margin-top: 0.375rem;
  }

  .v-list-group .v-list-group__header .v-list-item__icon.v-list-group__header__append-icon {
    min-width: 24px;
  }

  .v-navigation-drawer__border {
    background-color: transparent !important;
  }

  // &.v-navigation-drawer--open-on-hover.v-navigation-drawer--is-mouseover {
  //   @include elevation(9);
  //   @include elevationTransition();
  // }
}

@include app-elevation('app-navigation-menu.v-navigation-drawer--open-on-hover.v-navigation-drawer--is-mouseover', 9);

// Set Perfect Scrollbar Container Height
.vertical-nav-menu-container {
  height: 100%;
  .ps-nav-menu-items {
    height: calc(100% - 57px) !important;
  }

  // menu scroll shadow
  .shadow-bottom {
    display: none;
    position: absolute;
    z-index: 2;
    height: 50px;
    width: 100%;
    left: -6px;
    pointer-events: none;
    margin-top: -0.7rem;
    filter: blur(5px);
  }
}

@include theme--child(vertical-nav-menu-container) using ($material) {
  .shadow-bottom {
    background: linear-gradient(
      map-deep-get($material, 'background') 40%,
      rgba(map-deep-get($material, 'background'), 0.1) 95%,
      rgba(map-deep-get($material, 'background'), 0.05)
    );
    margin-top: -0.5rem;
    filter: blur(4px);
  }
}

@include theme(vertical-nav-menu-items) using ($material) {
  @include ltr() {
    padding-right: 20px !important;
  }
  @include rtl() {
    padding-left: 20px !important;
  }
  @at-root .app-navigation-menu.v-navigation-drawer--mini-variant:not(.v-navigation-drawer--is-mouseover) {
    .vertical-nav-menu-items {
      @include ltr() {
        padding-right: 5px !important;
      }
      @include rtl() {
        padding-left: 5px !important;
      }
    }
  }

  .v-subheader:not(:first-child) {
    margin-top: 18px;
  }

  .v-list-item__icon {
    &:first-child {
      @include ltr() {
        margin: 0 12px 0 0;
      }
      @include rtl() {
        margin: 0 0 0 12px;
      }
      align-self: center;
    }
    &.v-list-group__header__append-icon {
      @include ltr() {
        margin-left: 4px;
      }
      @include rtl() {
        margin-right: 4px;
      }
    }
  }

  // Center align small icon
  .v-list-group__items .v-list-item__icon {
    margin-top: 0px;
    @include ltr() {
      margin-left: 5px;
    }
    @include rtl() {
      margin-right: 5px;
    }
  }

  .v-list-item {
    @include app-states($material);

    height: 44px;
    min-height: 44px;
    color: map-deep-get($material, 'text', 'primary');
    // ? Reason: In collapsed mode due to modified mini width & flex grow icon change position while collapsing the drawer
    justify-content: flex-start !important;

    &.v-list-item--active {
      &:not(.v-list-group__header) {
        color: white;
        // background-image: linear-gradient(98deg, #c48eff, var(--v-primary-base) 94%);
      }
      &.v-list-group__header {
        background-color: rgba(
          map-deep-get($material, 'text', 'primary'),
          map-deep-get($material, 'states', 'selected')
        );
      }
    }

    &.vertical-nav-menu-link {
      .v-list-item__icon {
        .v-icon {
          transition: none !important;
        }
      }
    }
  }
}
</style>
