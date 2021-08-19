<template>
  <v-subheader v-if="canViewVerticalNavMenuHeader(item)">
    <span
      v-show="!menuIsVerticalNavMini || (menuIsVerticalNavMini && isMouseHovered)"
      class="title-wrapper"
      :class="{'no-style': menuIsVerticalNavMini && !isMouseHovered}"
    >
      <span>{{ t(item.subheader) }}</span>
    </span>

    <v-icon v-show="menuIsVerticalNavMini && !isMouseHovered">
      {{ icons.mdiMinus }}
    </v-icon>
  </v-subheader>
</template>

<script>
import useAppConfig from '@core/@app-config/useAppConfig'
import { mdiMinus } from '@mdi/js'
import { inject } from '@vue/composition-api'
import { useUtils } from '@core/libs/i18n'
import { useUtils as useAclUtils } from '@core/libs/acl'

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const { menuIsVerticalNavMini } = useAppConfig()
    const isMouseHovered = inject('isMouseHovered')
    const { t } = useUtils()
    const { canViewVerticalNavMenuHeader } = useAclUtils()

    return {
      menuIsVerticalNavMini,
      isMouseHovered,

      // i18n
      t,

      // ACL
      canViewVerticalNavMenuHeader,

      // Icons
      icons: {
        mdiMinus,
      },
    }
  },
}
</script>

<style scoped lang="scss">
@import '~vuetify/src/styles/styles.sass';

@include theme(v-subheader) using ($material) {
  white-space: nowrap;
  position: relative;

  .v-icon {
    color: map-deep-get($material, 'dividers');
  }

  .title-wrapper {
    &:not(.no-style) {
      width: 100%;
      // text-align: center;
      position: absolute;
      left: 0;
      border-bottom: 1px solid map-deep-get($material, 'dividers');
      line-height: 0.1em;
      // margin: 10px 0 20px;
    }
  }

  .title-wrapper span {
    background: map-deep-get($material, 'background');
    padding: 0 10px;
    font-size: 0.75rem;

    @include ltr() {
      margin-left: 16px;
    }
    @include rtl() {
      margin-right: 16px;
    }
  }
}
</style>
