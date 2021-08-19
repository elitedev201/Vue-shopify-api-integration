<template>
  <v-card
    class="app-card-code"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <!-- Title -->
    <v-card-title>
      {{ title }}
      <v-spacer></v-spacer>

      <v-slide-x-reverse-transition>
        <div v-show="isCodeCollapsed">
          <v-fade-transition mode="out-in">
            <v-icon
              :key="copyDynamicIcon"
              size="21"
              @click="copyActiveCode"
            >
              {{ copyDynamicIcon === 'copy' ? icons.mdiContentCopy : icons.mdiCheck }}
            </v-icon>
          </v-fade-transition>
        </div>
      </v-slide-x-reverse-transition>
      <v-icon
        dense
        class="ms-4"
        :color="isCodeCollapsed ? 'primary' : null"
        @click="isCodeCollapsed = !isCodeCollapsed"
      >
        {{ icons.mdiCodeTags }}
      </v-icon>
    </v-card-title>
    <div class="demo-content">
      <slot></slot>
    </div>

    <v-expand-transition>
      <div v-show="isCodeCollapsed">
        <v-divider></v-divider>

        <!-- Code -->
        <v-card-text>
          <prism :language="codeLanguage">
            {{ code }}
          </prism>
        </v-card-text>
        <!-- Snackbar: Copy not supported -->
        <v-snackbar
          v-model="showSnackbarCopyNotSupported"
          color="error"
        >
          Copy isn't supported on this device/browser.
          <template #action="{ attrs }">
            <v-btn
              text
              v-bind="attrs"
              @click="showSnackbarCopyNotSupported = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>

        <!-- Snackbar: Copied Successfully -->
        <v-snackbar
          v-model="showSnackbarCopiedSuccessfully"
          color="success"
        >
          Code Copied Successfully
          <template #action="{ attrs }">
            <v-btn
              text
              v-bind="attrs"
              @click="showSnackbarCopiedSuccessfully = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { ref } from '@vue/composition-api'
// eslint-disable-next-line object-curly-newline
import { mdiCodeTags, mdiLanguageJavascript, mdiLanguageTypescript, mdiContentCopy, mdiCheck } from '@mdi/js'
import { useClipboard } from '@vueuse/core'

// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import Prism from 'vue-prism-component'

export default {
  components: {
    Prism,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    codeLanguage: {
      type: String,
      default: 'markup',
    },
  },
  setup(props) {
    const isCodeCollapsed = ref(false)

    // Code
    const { copy, isSupported } = useClipboard()
    const copyDynamicIcon = ref('copy')

    const showSnackbarCopyNotSupported = ref(false)
    const showSnackbarCopiedSuccessfully = ref(false)

    const copyActiveCode = () => {
      if (!isSupported) showSnackbarCopyNotSupported.value = true
      else {
        copy(props.code).then(() => {
          showSnackbarCopiedSuccessfully.value = true
          copyDynamicIcon.value = 'copied'
          setTimeout(() => {
            copyDynamicIcon.value = 'copy'
          }, 5000)
        })
      }
    }

    return {
      isCodeCollapsed,
      copyActiveCode,
      showSnackbarCopyNotSupported,
      showSnackbarCopiedSuccessfully,
      copyDynamicIcon,

      // Icons
      icons: {
        mdiCodeTags,
        mdiLanguageJavascript,
        mdiLanguageTypescript,
        mdiContentCopy,
        mdiCheck,
      },
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~vuetify/src/components/VCard/_variables.scss';
@import '~vuetify/src/components/VBtn/_variables.scss';
@import '~vuetify/src/styles/styles.sass';

pre[class*='language-'] {
  margin: 0;
  border-radius: $card-border-radius;
  max-height: 350px;
}

.demo-content {
  &:last-child {
    padding-bottom: $card-spacer;
  }
}
</style>
