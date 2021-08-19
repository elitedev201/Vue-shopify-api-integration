<template>
  <v-list-group
    v-if="canViewVerticalNavMenuGroup(item)"
    ref="refVListGroup"
    class="vertical-nav-menu-group"
    :class="[{'vertical-nav-menu-group-active': isActive}, ...rootThemeClasses]"
    :value="isGroupExpanded"
    @click="updateGroupOpen(!isOpen)"
  >
    <template #prependIcon>
      <v-icon :class="{'alternate-icon-small': !item.icon}">
        {{ item.icon || alternateIcon }}
      </v-icon>
    </template>
    <template #activator>
      <v-list-item-title>{{ t(item.title) }}</v-list-item-title>

      <v-list-item-action
        v-if="item.badge"
        class="flex-shrink-0"
      >
        <v-badge
          :color="item.badgeColor"
          inline
          :content="item.badge"
        >
        </v-badge>
      </v-list-item-action>
    </template>

    <component
      :is="resolveNavItemComponent(child)"
      v-for="child in item.children"
      :key="child.subheader || child.title"
      :item="child"
    ></component>
  </v-list-group>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { computed, inject, ref, watch } from '@vue/composition-api'

// SFCs
import VerticalNavMenuSectionTitle from '@core/layouts/components/vertical-nav-menu/components/vertical-nav-menu-section-title/VerticalNavMenuSectionTitle.vue'
import VerticalNavMenuLink from '@core/layouts/components/vertical-nav-menu/components/vertical-nav-menu-link/VerticalNavMenuLink.vue'
import useVerticalNavMenu from '@/@core/layouts/composable/vertical-nav/useVerticalNavMenu'

// Composable
import useNav from '@/@core/layouts/composable/useNav'
import useAppConfig from '@core/@app-config/useAppConfig'
import useVerticalNavGroup from '@core/layouts/composable/vertical-nav/useVerticalNavGroup'
import { useUtils } from '@core/libs/i18n'
import { useUtils as useAclUtils } from '@core/libs/acl'

// Other
import themeConfig from '@themeConfig'

export default {
  name: 'VerticalNavMenuGroup',
  components: {
    VerticalNavMenuLink,
    VerticalNavMenuSectionTitle,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    // From Vuetify's `vuetify/src/mixins/themeable/index.ts` mixin
    rootThemeClasses() {
      return {
        'theme--dark': this.$vuetify.theme.isDark,
        'theme--light': !this.$vuetify.theme.isDark,
      }
    },
  },
  setup(props) {
    const { resolveNavItemComponent } = useVerticalNavMenu()
    const { isOpen, updateGroupOpen, isActive } = useVerticalNavGroup(props.item)
    const { canViewVerticalNavMenuGroup } = useAclUtils()
    const { isNavGroupActive } = useNav()
    const { menuIsVerticalNavMini } = useAppConfig()
    const isMouseHovered = inject('isMouseHovered')

    const isAccordion = themeConfig.menu.verticalMenuAccordion

    // Template ref
    const refVListGroup = ref(null)

    // VNavigationDrawer Internal API
    const isGroupExpanded = computed({
      get: () => (refVListGroup.value ? refVListGroup.value.isActive : false),
      set: value => {
        refVListGroup.value.isActive = value
      },
    })
    watch(isOpen, value => {
      if (isAccordion) isGroupExpanded.value = value
    })

    watch(menuIsVerticalNavMini, val => {
      if (val && !isMouseHovered) isGroupExpanded.value = false
      else {
        isGroupExpanded.value = isOpen.value
      }
    })

    watch(isMouseHovered, value => {
      if (menuIsVerticalNavMini.value) {
        if (value) isGroupExpanded.value = isOpen.value
        else isGroupExpanded.value = false
      }
    })

    // I18n
    const { t } = useUtils()

    return {
      isGroupExpanded,
      resolveNavItemComponent,
      isNavGroupActive,
      menuIsVerticalNavMini,
      refVListGroup,
      isMouseHovered,
      isOpen,
      isActive,
      updateGroupOpen,

      // Alternate Icon
      alternateIcon: themeConfig.menu.groupChildIcon,

      // i18n
      t,

      // ACL
      canViewVerticalNavMenuGroup,
    }
  },
}
</script>

<style lang="scss">
@import '~vuetify/src/styles/styles.sass';

.vertical-nav-menu-group {
  &.v-list-group--active > .v-list-group__header > .v-list-group__header__append-icon .v-icon {
    transform: none;
  }

  & > .v-list-group__header > .v-list-group__header__append-icon .v-icon {
    transform: rotate(-90deg);
  }

  & & .v-list-group__items .v-list-item__icon {
    visibility: hidden;
  }
}

@include theme(vertical-nav-menu-group) using ($material) {
  &.vertical-nav-menu-group-active > .v-list-group__header {
    background-color: rgba(map-deep-get($material, 'text', 'primary'), map-deep-get($material, 'states', 'selected'));
  }
}

.alternate-icon-small {
  font-size: 14px;
  height: 14px;
  width: 14px;
}
</style>
