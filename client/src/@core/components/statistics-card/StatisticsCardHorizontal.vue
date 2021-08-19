<template>
  <v-card
    outlined
    class="statistics-horizontal"
  >
    <div class="d-flex align-center">
      <v-avatar
        :color="$vuetify.theme.dark ? '#312d4b': '#fff'"
        rounded
        size="44"
        class="elevation-3"
      >
        <v-icon
          size="30"
          :color="color"
        >
          {{ icon }}
        </v-icon>
      </v-avatar>

      <div class="ms-3">
        <span class="text-xs">{{ statTitle }}</span>
        <p class="text-no-wrap mb-0">
          <span
            class="text-xl font-weight-semibold text--primary"
          >{{ statistics }}</span>
          <v-icon
            size="20"
            :color="checkChange(change) ? 'success':'error'"
          >
            {{ checkChange(change) ?mdiChevronUp :mdiChevronDown }}
          </v-icon>
          <span
            class="font-weight-semibold text-xs"
            :class="checkChange(change) ? 'success--text':'error--text'"
          >{{ change.slice(1) }}</span>
        </p>
      </div>
    </div>
  </v-card>
</template>

<script>
import { mdiAccountOutline, mdiChevronDown, mdiChevronUp } from '@mdi/js'

export default {
  props: {
    statTitle: { type: String, default: '' },
    statistics: { type: String, default: '' },
    change: { type: String, default: '' },
    icon: { type: String, default: '' },
    color: { type: String, default: '' },
  },
  setup() {
    const checkChange = value => {
      const firstChar = value.charAt(0)
      if (firstChar === '+') {
        return true
      }

      return false
    }

    return {
      mdiAccountOutline,
      mdiChevronDown,
      mdiChevronUp,
      checkChange,
    }
  },
}
</script>

<style lang="scss" scoped>
.statistics-horizontal {
  background-color: transparent !important;
  padding: 1.25rem 4.063rem 1.125rem 1.25rem;
}

.v-application {
  &.v-application--is-rtl {
    .statistics-horizontal {
      padding: 1.25rem 1.125rem 1.25rem 4.063rem;
    }
  }
}
</style>
