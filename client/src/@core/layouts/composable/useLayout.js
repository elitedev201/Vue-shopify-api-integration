import useAppConfig from '@core/@app-config/useAppConfig'
import { getVuetify } from '@core/utils'
import themeConfig from '@themeConfig'
import { ref, watch } from '@vue/composition-api'

export function useLayout() {
  const handleBreakpointLayoutSwitch = () => {
    const $vuetify = getVuetify()
    const { appContentLayoutNav } = useAppConfig()

    // ? This is flag which hold nav type need to render when going to lgAndup from mdAndDown
    /*
    ? Requirement: When we set  to `horizontal` nav and hit the `mdAndDown` breakpoint nav type is changed to `vertical`.
    ? Now if we go back to `lgAndUp` breakpoint from `mdAndDown` how we will know which we previous nav type in large device user viewed?
    */
    //  Let's assign value we get from themeConfig as default value of lgAndUpNav
    const lgAndUpNav = ref(themeConfig.app.contentLayoutNav)

    // There might be case where use manually switch from vertical to horizontal nav and vice versa in `lgAndUp` screen
    // So when user comes back from `mdAndDown` to `lgAndUp` we can set updated nav type
    // For this we need to update the `lgAndUpNav` value if screen is `lgAndUp`
    watch(appContentLayoutNav, value => {
      if ($vuetify?.breakpoint.lgAndUp) lgAndUpNav.value = value
    })

    // This is layout switching part
    // If it's `mdAndDown` => We will use vertical nav no matter what previous nav type was
    // Or if it's `lgAndUp` we need to switch back to `lgAndUp` nav type. For this we will tracker property `lgAndUpNav`
    watch(
      () => $vuetify?.breakpoint.lgAndUp,
      value => {
        if (value) appContentLayoutNav.value = lgAndUpNav.value
        else appContentLayoutNav.value = 'vertical'
      },
      {
        immediate: true,
      },
    )
  }

  return {
    handleBreakpointLayoutSwitch,
  }
}

export const _ = null
