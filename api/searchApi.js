export const searchV2 = (ctx, { q, type, page }) => {
  return ctx.$axios.$get('search/new', {
    params: { q, type, page }
  })
}
