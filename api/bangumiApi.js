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

export const createSeason = (ctx, form) => {
  return ctx.$axios.$post('bangumi/manager/create_season', form)
}

export const editSeason = (ctx, form) => {
  return ctx.$axios.$post('bangumi/manager/edit_season', form)
}

export const getEditBangumi = (ctx, { bangumi_id }) => {
  return ctx.$axios.$get('bangumi/manager/get_info', {
    params: { bangumi_id }
  })
}

export const editBangumiInfo = (ctx, form) => {
  return ctx.$axios.$post('bangumi/manager/edit_info', form)
}

export const getManagerList = (ctx, id) => {
  return ctx.$axios.$get('bangumi/manager/list', {
    params: {
      id
    }
  })
}

export const setManager = (ctx, { user_id, bangumi_id }) => {
  return ctx.$axios.$post('bangumi/manager/set_manager', {
    user_id,
    bangumi_id
  })
}

export const removeManager = (ctx, { user_id, bangumi_id }) => {
  return ctx.$axios.$post('bangumi/manager/remove_manager', {
    user_id,
    bangumi_id
  })
}
