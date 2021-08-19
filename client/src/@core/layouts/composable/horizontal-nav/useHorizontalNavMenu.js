export default () => {
  const resolveNavItemComponent = item => {
    if (item.children) return 'horizontal-nav-menu-group'

    return 'horizontal-nav-menu-link'
  }

  return {
    resolveNavItemComponent,
  }
}
