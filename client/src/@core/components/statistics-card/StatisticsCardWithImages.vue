<template>
  <v-card>
    <div class="d-flex">
      <div>
        <v-card-title class="text-base font-weight-semibold">
          {{ statTitle }}
        </v-card-title>
        <v-card-text class="d-flex align-center">
          <h2 class="text-2xl font-weight-semibold">
            {{ statistics }}
          </h2>
          <span
            class="text-xs ms-1"
            :class="checkChange(change) ? 'success--text':'error--text'"
          > {{ change }}</span>
        </v-card-text>
        <v-card-text>
          <v-chip
            small
            :color="chipColor"
            class="v-chip-light-bg font-weight-semibold"
            :class="`${chipColor}--text`"
          >
            {{ chipText }}
          </v-chip>
        </v-card-text>
      </div>
      <v-spacer></v-spacer>
      <div class="illustrator-img">
        <v-img
          :width="avatarWidth"
          :src="avatar"
        ></v-img>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    statTitle: { type: String, default: '' },
    statistics: { type: String, default: '' },
    change: { type: String, default: '' },
    chipText: { type: String, default: '' },
    chipColor: { type: String, default: '' },
    avatar: { type: String, default: '' },
    avatarWidth: { type: String, default: '' },
  },
  setup() {
    const checkChange = value => {
      const firstChar = value.charAt(0)
      if (firstChar === '+') {
        return true
      }

      return false
    }

    return { checkChange }
  },
}
</script>

<style lang="scss" scoped>
.illustrator-img {
  position: absolute;
  right: 5%;
  bottom: 0;
}

.v-application {
  &.v-application--is-rtl {
    .illustrator-img {
      left: 5%;
      right: unset;
    }
  }
}
</style>
