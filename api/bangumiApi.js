export const getBangumiInfo = (ctx, { id }) => {
  return ctx.$axios.$get(`bangumi/${id}/show`)
}

export const getRecommendedBangumis = ctx => {
  return ctx.$axios.$get('bangumi/recommended')
}

export const getHotBangumis = ctx => {
  return ctx.$axios.$get('bangumi/hots')
}

export const getReleasedBangumis = ctx => {
  return ctx.$axios.$get('bangumi/released')
}

export const getAllBangumiTag = ctx => {
  return ctx.$axios.$get('bangumi/tags')
}

export const getCategoryBangumis = (ctx, { tags, page, take }) => {
  return ctx.$axios.$get('bangumi/category', {
    params: { id: tags, page, take }
  })
}

export const getBangumiVideos = (ctx, { id }) => {
  return ctx.$axios.$get(`bangumi/${id}/videos`)
}

export const getBangumiScore = (ctx, { id }) => {
  return ctx.$axios.$get('score/bangumis', {
    params: { id }
  })
}

export const getAllBangumi = ctx => {
  return ctx.$axios.$get('search/bangumis')
}

export const getTopicPosts = (ctx, { id }) => {
  return ctx.$axios.$get(`bangumi/${id}/posts/top`)
}

export const editBangumiInfo = (
  ctx,
  { id, name, summary, avatar, banner, tags }
) => {
  return ctx.$axios.post(`bangumi/${id}/edit`, {
    name,
    summary,
    avatar,
    banner,
    tags
  })
}
