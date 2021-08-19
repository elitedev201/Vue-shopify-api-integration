import router from '@/router'
import { isObject } from '@core/utils'
import { computed } from '@vue/composition-api'

export default () => {
  const navLinkProps = computed(() => item => {
    const props = {}

    // If route is string => it assumes => Create route object from route name
    // If route is not string => It assumes it's route object => returns route object
    if (item.to) {
      props.to = typeof item.to === 'string' ? { name: item.to } : item.to
    } else {
      props.href = item.href
      props.target = '_blank'
      props.rel = 'nofollow'
    }

    if (!props.target) props.target = item.target

    return props
  })

  /**
   * Return route name for navigation link
   * If link is string then it will assume it is route-name
   * IF link is object it will resolve the object and will return the link
   * @param {Object, String} link navigation link object/string
   */
  const resolveNavLinkRouteName = link => {
    if (isObject(link.to)) {
      const { route } = router.resolve(link.to)

      return route.name
    }

    return link.to
  }

  /**
   * Check if nav-link is active
   * @param {Object} link nav-link object
   */
  const isNavLinkActive = link => {
    // Matched routes array of current route
    const matchedRoutes = router.currentRoute.matched

    // Check if provided route matches route's matched route
    const resolveRoutedName = resolveNavLinkRouteName(link)

    if (!resolveRoutedName) return false

    // eslint-disable-next-line arrow-body-style
    return matchedRoutes.some(route => {
      return route.name === resolveRoutedName || route.meta.navActiveLink === resolveRoutedName
    })
  }

  /**
   * Check if nav group is
   * @param {Array} children Group children
   */
  // eslint-disable-next-line arrow-body-style
  const isNavGroupActive = children => {
    return children.some(child => {
      // If child have children => It's group => Go deeper(recursive)
      if (child.children) {
        return isNavGroupActive(child.children)
      }

      // else it's link => Check for matched Route
      return isNavLinkActive(child)
    })
  }

  return {
    navLinkProps,
    resolveNavLinkRouteName,
    isNavLinkActive,
    isNavGroupActive,
  }
}
