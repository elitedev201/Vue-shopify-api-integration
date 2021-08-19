<template>
  <v-menu
    v-if="canViewHorizontalNavMenuHeaderGroup(item)"
    ref="refMenu"
    offset-y
    eagers
    :open-on-hover="shallOpenGroupOnHover"
    attach
    class="horizontal-nav-header-group"
    content-class="list-style elevation-0"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        ref="refActivator"
        :color="isActive ? 'primary' : 'transparent'"
        depressed
        large
        rounded
        v-bind="attrs"
        class="text-capitalize text-base font-weight-regular px-6"
        :class="[{'bg-gradient-primary group-activator-active': isActive}, { 'menu-open': isMenuActive }]"
        v-on="on"
      >
        <v-icon
          dark
          left
          size="22"
        >
          {{ item.icon }}
        </v-icon>
        <span>{{ t(item.title) }}</span>
        <v-icon size="20">
          {{ icons.mdiChevronDown }}
        </v-icon>
      </v-btn>
    </template>
    <v-list
      ref="refContent"
      :elevation="$vuetify.theme.dark ? 9 : 8"
    >
      <v-list-item-group
        color="primary"
      >
        <component
          :is="resolveNavComponent(child)"
          v-for="child in item.children"
          :key="child.subheader || child.title"
          :item="child"
        ></component>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { computed, provide, ref, watchEffect } from '@vue/composition-api'
import { mdiChevronDown } from '@mdi/js'
import { useMouseInElement } from '@vueuse/core'

import HorizontalNavMenuGroup from '@core/layouts/components/horizontal-nav-menu/components/horizontal-nav-menu-group/HorizontalNavMenuGroup.vue'
import HorizontalNavMenuLink from '@core/layouts/components/horizontal-nav-menu/components/horizontal-nav-menu-link/HorizontalNavMenuLink.vue'
import { useUtils } from '@core/libs/i18n'
import { useUtils as useAclUtils } from '@core/libs/acl'
import themeConfig from '@themeConfig'
import useHorizontalNavMenuHeaderGroup from './useHorizontalNavMenuHeaderGroup'

export default {
  components: {
    HorizontalNavMenuGroup,
    HorizontalNavMenuLink,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // eslint-disable-next-line object-curly-newline
    const { isActive, updateIsActive, isOpen, updateGroupOpen } = useHorizontalNavMenuHeaderGroup(props.item)

    const resolveNavComponent = item => {
      if (item.children) return 'horizontal-nav-menu-group'

      return 'horizontal-nav-menu-link'
    }

    const refActivator = ref(null)
    const refContent = ref(null)
    const { isOutside: isMouseOutsideOfActivator } = useMouseInElement(refActivator)
    const { isOutside: isMouseOutsideOfContent } = useMouseInElement(refContent)

    const isMenuOpen = computed(() => !(isMouseOutsideOfContent.value && isMouseOutsideOfActivator.value))
    provide('isParentMenuOpen', isMenuOpen)

    // i18n
    const { t } = useUtils()

    // ACL
    const { canViewHorizontalNavMenuHeaderGroup } = useAclUtils()

    // Templare ref & internal value
    const refMenu = ref(null)
    const isMenuActive = ref(false)
    watchEffect(() => {
      isMenuActive.value = refMenu.value ? refMenu.value.isActive : false
    })

    return {
      isOpen,
      isActive,
      updateGroupOpen,
      updateIsActive,

      resolveNavComponent,

      // Open Menu on Hover
      shallOpenGroupOnHover: themeConfig.menu.horizontalNavMenuGroupOpenOnHover,

      // Mouse
      refActivator,
      refContent,
      isMouseOutsideOfActivator,
      isMouseOutsideOfContent,
      isMenuOpen,

      // Template Ref and internal Properties
      refMenu,
      isMenuActive,

      // i18n
      t,

      // CASL
      canViewHorizontalNavMenuHeaderGroup,

      // icons
      icons: {
        mdiChevronDown,
      },
    }
  },
}
</script>

<style lang="scss">
@import '~vuetify/src/styles/styles.sass';
@import '~@core/preset/preset/mixins.scss';

@include theme(horizontal-nav-menu) using ($material) {
  // ! Below style will also affect HorizontalNavGroup
  // ? If you only want this style of this component than use selector `> .menu-open` instead of `.menu-open`
  .menu-open {
    background: rgba(map-deep-get($shades, 'black'), map-deep-get($material, 'states', 'hover'));
  }
}

.horizontal-nav-menu {
  > .group-activator-active {
    box-shadow: 0 5px 10px -4px rgba(94, 86, 105, 0.42);
    @include elevationTransition();
  }
  .v-list-item__icon {
    align-self: center;
  }
  .v-list-item {
    min-height: 42px;
    max-height: 42px;
  }
}

.horizontal-nav-header-group {
  > .v-menu__content {
    padding-top: 13px;
  }

  .v-menu__content {
    // min-width: 260px;
    width: 260px;
    contain: none !important;
    overflow: visible !important;

    > .v-list {
      border-radius: 6px;
      // @include elevation(8);
    }
  }
}

@include app-elevation('horizontal-nav-header-group .v-menu__content > .v-list', 8);
</style>
