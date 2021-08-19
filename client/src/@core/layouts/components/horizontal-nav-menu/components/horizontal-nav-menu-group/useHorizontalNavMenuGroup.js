// eslint-disable-next-line object-curly-newline
import useNav from '@core/layouts/composable/useNav'
import { useRouter } from '@core/utils'
import { nextTick, ref, watch } from '@vue/composition-api'

export default function useHorizontalNavMenuGroup(item) {
  const { isNavGroupActive } = useNav()
  const { route } = useRouter()

  // ------------------------------------------------
  // childDropdown
  // ------------------------------------------------
  const refChildDropdown = ref(null)
  const openChildDropdownOnLeft = ref(false)

  // ------------------------------------------------
  // isActive
  // ------------------------------------------------
  const isOpen = ref(false)

  const updateGroupOpen = val => {
    isOpen.value = val
    if (val) {
      nextTick(() => {
        const childDropdownWidth = refChildDropdown.value.offsetWidth
        const windowContentWidth = window.innerWidth - 16
        const { left: childDropdownLeft } = refChildDropdown.value.getBoundingClientRect()
        const shallDropLeft = childDropdownLeft + childDropdownWidth - windowContentWidth
        openChildDropdownOnLeft.value = shallDropLeft > 0

        // Add scroll to child dd if don't have much space

        const refChildDropdownTop = refChildDropdown.value.getBoundingClientRect().top
        const refChildDropdownHeight = refChildDropdown.value.getBoundingClientRect().height
        if (window.innerHeight - refChildDropdownTop - refChildDropdownHeight - 28 < 1) {
          const maxHeight = window.innerHeight - refChildDropdownTop - 70
          refChildDropdown.value.style.maxHeight = `${maxHeight}px`
          refChildDropdown.value.style.overflowY = 'auto'
          refChildDropdown.value.style.overflowX = 'hidden'
        }
      })
    } else {
      openChildDropdownOnLeft.value = false
    }
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
    refChildDropdown,
    openChildDropdownOnLeft,
  }
}
