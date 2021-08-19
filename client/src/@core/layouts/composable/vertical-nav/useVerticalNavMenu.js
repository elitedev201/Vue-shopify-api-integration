import { ref } from '@vue/composition-api'

export default () => {
  const resolveNavItemComponent = item => {
    if (item.subheader) return 'vertical-nav-menu-section-title'
    if (item.children) return 'vertical-nav-menu-group'

    return 'vertical-nav-menu-link'
  }

  const isMouseHovered = ref(false)

  return {
    isMouseHovered,
    resolveNavItemComponent,
  }
}
