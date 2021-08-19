import useNav from '@core/layouts/composable/useNav'
import { useRouter } from '@core/utils'
import { ref, watch } from '@vue/composition-api'

export default function useHorizontalNavMenuLink(item) {
  const { route } = useRouter()
  const { isNavLinkActive, navLinkProps } = useNav()

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
