<template>
  <v-btn
    v-if="canViewHorizontalNavMenuHeaderLink(item)"
    :color="isActive ? 'primary' : null"
    depressed
    rounded
    :to="{ name: item.to }"
    large
    class="horizontal-nav-menu-header-link px-6"
    active-class="bg-gradient-primary header-link-active"
  >
    <v-icon
      dark
      left
      :size="item.icon ? 22 : 15"
    >
      {{ item.icon || alternateIcon }}
    </v-icon>
    {{ t(item.title) }}
  </v-btn>
</template>

<script>
import useHorizontalNavMenuHeaderLink from '@core/layouts/composable/horizontal-nav/useHorizontalNavMenuHeaderLink'
import { useUtils } from '@core/libs/i18n'
import { useUtils as useAclUtils } from '@core/libs/acl'
import themeConfig from '@themeConfig'

export default {
  components: {},
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { isActive, updateIsActive } = useHorizontalNavMenuHeaderLink(props.item)

    // ACL
    const { canViewHorizontalNavMenuHeaderLink } = useAclUtils()

    // i18n
    const { t } = useUtils()

    return {
      isActive,
      updateIsActive,

      // alternate icons
      alternateIcon: themeConfig.menu.groupChildIcon,

      // i18n
      t,

      // ACL
      canViewHorizontalNavMenuHeaderLink,
    }
  },
}
</script>

<style lang="scss">
@import '~vuetify/src/styles/styles.sass';

.horizontal-nav-menu-header-link.header-link-active {
  box-shadow: 0 5px 10px -4px rgba(94, 86, 105, 0.42);
  @include elevationTransition();
}
</style>
