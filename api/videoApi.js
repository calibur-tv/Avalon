export const getVideoInfo = (ctx, { id }) => {
  return ctx.$axios.$get(`video/${id}/show?refer=web`)
}

export const markPlaying = (ctx, { id }) => {
  return ctx.$axios.$post('video/playing', {
    id
  })
}

export const buyVideoPackage = (ctx, { season_id }) => {
  return ctx.$axios.$post('video/buy', {
    season_id
  })
}

export const createVideo = (ctx, form) => {
  return ctx.$axios.$post('video/create', form)
}

export const updateVideo = (ctx, id, form) => {
  return ctx.$axios.$post(`video/${id}/update`, form)
}

export const fetchRemoteVideo = (ctx, { id, src }) => {
  return ctx.$axios.$post('video/fetch', {
    id,
    src
  })
}
