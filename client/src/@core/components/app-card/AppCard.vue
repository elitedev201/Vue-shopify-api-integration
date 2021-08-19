<template>
  <v-card class="app-card">
    <slot></slot>
  </v-card>
</template>

<script>
export default {
  setup() {
    return {}
  },
}
</script>

<style lang="scss">
$app-card-spacer: 28px;
$app-card-content-spacer: 20px;
// 8 px is `$card-btn-padding` SASS variable
$app-card-outer-action-spacer: calc(#{$app-card-spacer} - 8px);

@import '~@/styles/variables';

.app-card {
  .app-card-header {
    &.v-card__title {
      line-height: 1;
      padding: $app-card-spacer;
    }
  }

  .app-card-body {
    padding: $app-card-spacer;

    .v-card__subtitle,
    .v-card__text:not(.app-card-body),
    .v-card__actions {
      padding: 0 !important;
      &:not(:last-child) {
        margin-bottom: $app-card-content-spacer;
      }
    }

    .v-card__actions {
      padding: $app-card-spacer;
    }
  }

  .v-card__actions {
    padding: 0 $app-card-outer-action-spacer $app-card-outer-action-spacer;
  }

  .app-card-header + .app-card-body {
    padding-top: 0;
  }

  .app-card-header + .app-card-body .v-card__subtitle:first-child {
    margin-top: calc(#{$app-card-spacer * 0.5rem / 1rem} - #{$app-card-spacer});
  }
}
</style>
