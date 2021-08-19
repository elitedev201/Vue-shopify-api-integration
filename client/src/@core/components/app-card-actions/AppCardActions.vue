<template>
  <v-expand-transition>
    <v-card
      v-show="!isRemoved"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <v-card-title>
        <slot name="title"></slot>
        <v-spacer></v-spacer>
        <div>
          <!-- Slot: Before Actions -->
          <slot name="before-actions"></slot>

          <!-- Action Buttons -->

          <!-- Collapse -->
          <v-btn
            v-show="(!(actionRefresh || actionRemove) || actionCollapse) && !noActions"
            icon
            small
            @click="triggerCollapse"
          >
            <v-icon
              size="20"
              :style="{ transform: isContentCollapsed ? 'rotate(-180deg)' : null }"
            >
              {{ icons.mdiChevronUp }}
            </v-icon>
          </v-btn>

          <!-- Refresh -->
          <v-btn
            v-show="(!(actionCollapse || actionRemove) || actionRefresh) && !noActions"
            icon
            small
            @click="triggerRefresh"
          >
            <v-icon size="20">
              {{ icons.mdiRefresh }}
            </v-icon>
          </v-btn>

          <!-- Close -->
          <v-btn
            v-show="(!(actionCollapse || actionRefresh) || actionRemove) && !noActions"
            icon
            small
            @click="triggerRemove"
          >
            <v-icon size="20">
              {{ icons.mdiClose }}
            </v-icon>
          </v-btn>
          <!-- /Action Buttons -->

          <!-- Slot: After Actions -->
          <slot name="after-actions"></slot>
        </div>
      </v-card-title>

      <v-expand-transition>
        <div v-show="!isContentCollapsed">
          <slot></slot>
        </div>
      </v-expand-transition>

      <v-overlay
        v-model="showOverlay"
        absolute
        color="white"
        opacity="0.75"
      >
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-overlay>
    </v-card>
  </v-expand-transition>
</template>

<script>
import { ref } from '@vue/composition-api'
import { mdiRefresh, mdiChevronUp, mdiClose } from '@mdi/js'

export default {
  inheritAttrs: false,
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
    noActions: {
      type: Boolean,
      default: false,
    },
    actionCollapse: {
      type: Boolean,
      default: false,
    },
    actionRefresh: {
      type: Boolean,
      default: false,
    },
    actionRemove: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const showOverlay = ref(false)
    const isContentCollapsed = ref(props.collapsed)
    const isRemoved = ref(false)

    // Action Utils
    const hideOveraly = () => {
      showOverlay.value = false
    }

    // Action Triggers
    const triggerCollapse = () => {
      isContentCollapsed.value = !isContentCollapsed.value
      emit('collapsed', isContentCollapsed.value)
    }
    const triggerRefresh = () => {
      showOverlay.value = true
      emit('refresh', hideOveraly)
    }
    const triggerRemove = () => {
      isRemoved.value = true
      emit('removed')
    }

    return {
      showOverlay,
      isContentCollapsed,
      isRemoved,

      // Triggerer
      triggerRefresh,
      triggerCollapse,
      triggerRemove,

      // Icons
      icons: {
        mdiChevronUp,
        mdiRefresh,
        mdiClose,
      },
    }
  },
}
</script>

<style>
</style>
