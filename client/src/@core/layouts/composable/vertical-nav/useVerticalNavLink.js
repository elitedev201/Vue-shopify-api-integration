import useNav from '@core/layouts/composable/useNav'
import { useRouter } from '@core/utils'
import { ref, watch } from '@vue/composition-api'

export default function useVerticalNavMenuLink(item) {
  const { isNavLinkActive, navLinkProps } = useNav()
  const { route } = useRouter()

  const isActive = ref(false)

  const linkProps = navLinkProps.value(item)

  watch(
    () => route.value.name,
    () => {
      isActive.value = isNavLinkActive(item)
    },
    { immediate: true },
  )

  return {
    isActive,
    linkProps,
  }
}
