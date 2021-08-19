import { watch } from '@vue/composition-api'
import { useWindowSize } from '@vueuse/core'

export default () => {
  const setVh = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
  }
  const { width: windowWidth } = useWindowSize()

  watch(windowWidth, setVh, { immediate: true })

  return {}
}
