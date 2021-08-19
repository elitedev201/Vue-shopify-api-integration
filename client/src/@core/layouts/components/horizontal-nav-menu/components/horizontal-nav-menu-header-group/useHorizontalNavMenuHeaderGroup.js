import useNav from '@core/layouts/composable/useNav'
import { useRouter } from '@core/utils'
import { ref, watch } from '@vue/composition-api'

export default function useHorizontalNavMenuHeaderGroup(item) {
  const { isNavGroupActive } = useNav()
  const { route } = useRouter()

  // ------------------------------------------------
  // isOpen
  // ------------------------------------------------
  const isOpen = ref(false)

  const updateGroupOpen = val => {
    // eslint-disable-next-line no-use-before-define
    isOpen.value = val
  }

  // ------------------------------------------------
  // isActive
  // ------------------------------------------------
  const isActive = ref(false)

  const updateIsActive = () => {
    isActive.value = isNavGroupActive(item.children)
  }
  watch(() => route.value.name, updateIsActive, { immediate: true })

  return {
    isOpen,
    isActive,
    updateGroupOpen,
    updateIsActive,
  }
}
