export const getPageData = ctx => {
  return ctx.$axios.$get('door/data', { refer: 'pc' })
}

export const getBanners = ctx => {
  return ctx.$axios.$get('image/banner')
}

export const getCarousel = ctx => {
  return ctx.$axios.$get('cm/loop/list')
}

export const viewCarousel = (ctx, { id }) => {
  return ctx.$axios.$post('cm/loop/view', { id })
}

export const clickCarousel = (ctx, { id }) => {
  return ctx.$axios.$post('cm/loop/click', { id })
}
