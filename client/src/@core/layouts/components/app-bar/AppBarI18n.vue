<template>
  <v-menu
    offset-y
    nudge-bottom="22"
    min-width="175"
    left
    :elevation="$vuetify.theme.dark ? 9 : 8"
  >
    <!-- Activator -->
    <template v-slot:activator="{ on, attrs }">
      <div
        v-bind="attrs"
        class="d-flex align-center"
        v-on="on"
      >
        <v-img
          :src="require(`@/assets/images/flags/${$i18n.locale}.png`)"
          :alt="$i18n.locale"
          height="14px"
          width="22px"
          class="me-2"
        ></v-img>
        <span v-if="$vuetify.breakpoint.smAndUp">{{ locales.find(l => l.locale === $i18n.locale).title }}</span>
      </div>
    </template>

    <!-- Options List -->
    <v-list>
      <v-list-item-group
        :value="$i18n.locale"
        @change="updateActiveLocale"
      >
        <v-list-item
          v-for="locale in locales"
          :key="locale.locale"
          :value="locale.locale"
        >
          <v-img
            :src="locale.img"
            height="14px"
            width="22px"
            :alt="locale.locale"
            class="me-2"
          ></v-img>
          <v-list-item-title>{{ locale.title }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
import { loadLanguageAsync } from '@/plugins/i18n'
import useAppConfig from '@core/@app-config/useAppConfig'

export default {
  setup() {
    const { isRtl } = useAppConfig()

    const locales = [
      {
        title: 'English',
        img: require('@/assets/images/flags/en.png'),
        locale: 'en',
      },
      {
        title: 'French',
        img: require('@/assets/images/flags/fr.png'),
        locale: 'fr',
      },
      {
        title: 'Arabic',
        img: require('@/assets/images/flags/ar.png'),
        locale: 'ar',
      },
    ]

    const updateActiveLocale = locale => {
      // Set to RTL mode if locale is arabic
      isRtl.value = locale === 'ar'

      loadLanguageAsync(locale)
    }

    return {
      locales,
      updateActiveLocale,
    }
  },
}
</script>
