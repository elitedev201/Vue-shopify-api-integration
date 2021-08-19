import useNav from '@core/layouts/composable/useNav'
import { useRouter } from '@core/utils'
import { ref, watch } from '@vue/composition-api'

export default function useHorizontalNavMenuHeaderGroup(item) {
  const { isNavLinkActive, navLinkProps } = useNav()
  const { route } = useRouter()

  // ------------------------------------------------
  // isActive
  // ------------------------------------------------
  const isActive = ref(false)

  const updateIsActive = () => {
    isActive.value = isNavLinkActive(item)
  }
  watch(() => route.value.name, updateIsActive, { immediate: true })

  // ------------------------------------------------
  // linkProps
  // ------------------------------------------------
  const linkProps = navLinkProps.value(item)

  return {
    isActive,
    updateIsActive,
    linkProps,
  }
}
