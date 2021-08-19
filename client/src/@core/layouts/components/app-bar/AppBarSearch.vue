<template>
  <div>
    <v-btn
      icon
      small
      class="app-bar-search-toggler"
      @click="shallShowFullSearchLocal = true"
    >
      <v-icon>
        {{ icons.mdiMagnify }}
      </v-icon>
    </v-btn>

    <!-- This is clever hack to hide scrolling 😉 -->
    <v-dialog
      :value="shallShowFullSearchLocal"
      hide-overlay
      persistent
    ></v-dialog>
    <v-expand-transition>
      <v-autocomplete
        v-show="shallShowFullSearchLocal"
        ref="refAutocomplete"
        :search-input.sync="searchQueryLocal"
        :items="searchQueryLocal ? data : []"
        hide-no-data
        no-data-text=""
        item-text="title"
        item-value="title"
        class="app-bar-autocomplete-box"
        return-object
        :color="$vuetify.theme.dark ? 'white' : null"
        rounded
        attach
        hide-details
        :filter="filter"
        auto-select-first
        :menu-props="{ maxHeight: 500, transition: 'slide-y-transition', contentClass: 'list-style' }"
        @input="valueSelected"
        @keyup.esc="shallShowFullSearchLocal = false"
        @blur="shallShowFullSearchLocal = false"
      >
        <!-- Slot: Selection -->
        <template #selection></template>

        <template #prepend-inner>
          <v-icon
            size="22"
            class="mr-1"
          >
            {{ icons.mdiMagnify }}
          </v-icon>
        </template>

        <!-- Slot: Append -->
        <template #append>
          <v-icon @click="shallShowFullSearchLocal = false">
            {{ icons.mdiClose }}
          </v-icon>
        </template>

        <!-- Slot: Item -->
        <template #item="{ item }">
          <div class="w-full">
            <!-- Section: Pages -->
            <div
              v-if="getSearchResultType(item) === 'pages'"
              class="d-flex align-content-end"
            >
              <v-icon
                size="20px"
                class="me-3"
              >
                {{ item.icon }}
              </v-icon>
              <span class="text-sm">{{ item.title }}</span>
            </div>

            <!-- Section: Files -->
            <div
              v-else-if="getSearchResultType(item) === 'files'"
              class="d-flex align-center py-2"
            >
              <v-icon
                size="20px"
                class="me-3"
              >
                {{ item.icon }}
              </v-icon>
              <div
                class="d-flex flex-column flex-grow-1"
                :class="{'align-start': $vuetify.rtl}"
              >
                <span class="d-block">{{ item.title }}</span>
                <small class="text--secondary text-xs">by {{ item.by }}</small>
              </div>
              <small class="text--secondary text-xs ms-auto">{{ item.size }}</small>
            </div>

            <!-- Contact -->
            <div
              v-else-if="getSearchResultType(item) === 'contacts'"
              class="d-flex align-center py-2"
            >
              <v-avatar
                class="me-3"
                size="40"
              >
                <v-img :src="item.avatar"></v-img>
              </v-avatar>
              <div class="d-flex flex-column flex-grow-1">
                <span class="d-block text-sm">{{ item.title }}</span>
                <small class="text--secondary text-xs">{{ item.email }}</small>
              </div>
              <small class="text--secondary text-xs">{{ item.time }}</small>
            </div>
          </div>
        </template>
      </v-autocomplete>
    </v-expand-transition>
  </div>
</template>

<script>
import { mdiMagnify, mdiClose } from '@mdi/js'
import { useVModel, useMagicKeys, whenever } from '@vueuse/core'
import { ref, watch } from '@vue/composition-api'
import { useRouter } from '@core/utils'
import store from '@/store'

export default {
  props: {
    shallShowFullSearch: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      required: true,
    },
    filter: {
      type: Function,
      default: null,
    },
    searchQuery: {
      type: [String, null],
      default: '',
    },
  },
  setup(props, { emit }) {
    const shallShowFullSearchLocal = useVModel(props, 'shallShowFullSearch', emit)
    const searchQueryLocal = useVModel(props, 'searchQuery', emit)

    const refAutocomplete = ref(null)

    watch(shallShowFullSearchLocal, value => {
      if (!value) searchQueryLocal.value = ''
      store.commit('app/TOGGLE_CONTENT_OVERLAY', value)

      // ? We create our own autofucs logic because `autofocus` prop was creating issue on `esc` key
      if (value) {
        setTimeout(() => {
          refAutocomplete.value.focus()
        }, 150)
      }
    })

    const { router } = useRouter()
    const valueSelected = value => {
      if (value.to) {
        router.push(value.to).catch(() => {})
      }
      shallShowFullSearchLocal.value = false
      searchQueryLocal.value = ''
    }

    // Hotkey
    // eslint-disable-next-line camelcase
    const { ctrl_shift_slash } = useMagicKeys()
    whenever(ctrl_shift_slash, () => {
      shallShowFullSearchLocal.value = true
    })

    // Result type
    const getSearchResultType = item => {
      if (item.to !== undefined) return 'pages'
      if (item.size !== undefined) return 'files'
      if (item.email !== undefined) return 'contacts'

      return null
    }

    return {
      searchQueryLocal,
      refAutocomplete,
      shallShowFullSearchLocal,
      valueSelected,
      getSearchResultType,

      icons: {
        mdiMagnify,
        mdiClose,
      },
    }
  },
}
</script>

<style lang="scss">
@import '~@core/preset/preset/mixins.scss';

@include theme(app-bar-autocomplete-box) using ($material) {
  div[role='combobox'] {
    background-color: map-deep-get($material, 'cards');
  }
}

.app-bar-autocomplete-box {
  position: absolute !important;
  width: 100%;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 14px !important;
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;

  .v-input__control {
    height: 100%;
  }

  div[role='combobox'] {
    height: 100%;
    z-index: 10;
    padding: 0 20px !important;

    .v-input__prepend-inner,
    .v-input__append-inner {
      align-self: center;
      margin-top: -2px;
      svg {
        font-size: 24px;
        height: 24px;
        width: 24px;
      }
    }

    .v-input__prepend-inner {
      @include ltr() {
        margin-left: 4px;
      }
      @include rtl() {
        margin-right: 4px;
      }
    }
  }
  // Content - Result
  .v-menu__content {
    @include style-scroll-bar();
    max-width: unset;
    width: 100%;
    border-radius: 12px !important;
    top: calc(64px + 0.625rem) !important;

    .v-subheader {
      text-transform: uppercase;
      letter-spacing: 0.21px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    @include theme(v-subheader) using ($material) {
      color: map-deep-get($material, 'text', 'disabled');
    }

    .v-list-item {
      > [id^='list-item'] {
        width: 100%;
      }
    }
  }

  @at-root .v-app-bar.app-bar-shinked & {
    div[role='combobox'] {
      padding: 0 !important;
    }

    // Content - Result
    .v-menu__content {
      max-width: unset;
      width: calc(100% + 20px * 2);
      @include ltr() {
        margin-left: -20px;
      }
      @include rtl() {
        margin-right: -20px;
      }
    }
  }
}

// ————————————————————————————————————
//* ——— Horizontal Nav
// ————————————————————————————————————

.content-layout.horizontal-nav {
  .app-system-bar {
    // Assigning 7 z-index so that search result can be seen on top of navigation menu
    z-index: 7;

    .v-text-field {
      margin-top: 0;
      padding-top: 0;
    }

    // Remove 3rem padding from both side.
    // ? 3rem is applied to navbar-content-container
    .app-bar-autocomplete-box {
      max-width: calc(100% - 3rem * 2);
      @include ltr() {
        margin-left: 3rem;
      }
      @include rtl() {
        margin-right: 3rem;
      }
    }

    // ? In Full content contet have padding of 1.5rem
    &:not(.app-system-bar-boxed) {
      .app-bar-autocomplete-box {
        max-width: calc(100% - 1.5rem * 2);
        @include ltr() {
          margin-left: 1.5rem;
        }
        @include rtl() {
          margin-right: 1.5rem;
        }
      }
    }
  }
}
</style>
