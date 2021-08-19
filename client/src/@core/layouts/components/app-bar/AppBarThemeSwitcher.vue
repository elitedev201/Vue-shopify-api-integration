<template>
  <v-fade-transition mode="out-in">
    <v-icon
      :key="isDark"
      @click="isDark = !isDark"
    >
      {{ isDark ? icons.mdiWeatherSunny : icons.mdiWeatherNight }}
    </v-icon>
  </v-fade-transition>
</template>

<script>
import { mdiWeatherNight, mdiWeatherSunny } from '@mdi/js'
import useAppConfig from '@core/@app-config/useAppConfig'

export default {
  setup() {
    const { isDark } = useAppConfig()

    return {
      isDark,

      // Icons
      icons: {
        mdiWeatherNight,
        mdiWeatherSunny,
      },
    }
  },
}
</script>

<style>
</style>
