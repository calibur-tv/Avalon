export const getVideoInfo = (ctx, { id }) => {
  return ctx.$axios.$get(`video/${id}/show?refer=web`)
}

export const markPlaying = (ctx, { id }) => {
  return ctx.$axios.$post('video/playing', {
    id
  })
}
