import { getVuetify } from '@core/utils'
import { computed, ref, watch } from '@vue/composition-api'

export const useResponsiveLeftSidebar = ({ sidebarWidth }) => {
  const isLeftSidebarOpen = ref(true)
  const $vuetify = getVuetify()

  const setInitialValue = () => {
    if ($vuetify.breakpoint.smAndDown) isLeftSidebarOpen.value = false
    else isLeftSidebarOpen.value = true
  }

  // Set the initial value of sidebar
  setInitialValue()

  watch(
    () => $vuetify.breakpoint.name,
    () => {
      // Reset left sidebar
      if ($vuetify.breakpoint.smAndDown) isLeftSidebarOpen.value = false
      if ($vuetify.breakpoint.mdAndUp) isLeftSidebarOpen.value = true
    },
  )

  const contentStyles = computed(() => {
    const styles = {}

    const marginDirection = $vuetify.rtl ? 'marginRight' : 'marginLeft'

    styles[marginDirection] = isLeftSidebarOpen.value && $vuetify.breakpoint.mdAndUp ? `${sidebarWidth}px` : null

    return styles
  })

  return {
    isLeftSidebarOpen,
    contentStyles,
  }
}

export const _ = {}
