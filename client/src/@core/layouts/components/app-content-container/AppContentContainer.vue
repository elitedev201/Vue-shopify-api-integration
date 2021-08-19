<template>
  <div
    class="app-content-container mx-auto h-full"
    :class="{'app-content-container-boxed': appContentWidth === 'boxed'}"
  >
    <slot></slot>
  </div>
</template>

<script>
import useAppConfig from '@core/@app-config/useAppConfig'

export default {
  setup() {
    const { appContentWidth } = useAppConfig()

    return {
      appContentWidth,
    }
  },
}
</script>

<style lang="scss">
@import '~@core/layouts/styles/_variables';

.app-content-container {
  &.app-content-container-boxed {
    max-width: $content-max-width;
  }
}
</style>
