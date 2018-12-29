const getFlowList = (
  ctx,
  { sort, type, take, page, minId, seenIds, bangumiId, userZone }
) => {
  return ctx.$axios.$get('flow/list', {
    params: {
      sort,
      type,
      take,
      page,
      minId,
      seenIds,
      bangumiId,
      userZone
    }
  })
}

/* ---------- flow 的 meta 信息 ---------- */

export const meta = (ctx, { type }) => {
  return ctx.$axios.$get('flow/meta', {
    params: { type }
  })
}

/**
 * 所有的函数能接受到的有如下参数，根据情况使用
 * ctx
 * id
 * max_id
 * seen_ids
 * page
 * order_by
 * count
 */

/* ---------- world ---------- */

export const getWorldPost = ({ ctx, seen_ids, count, max_id, order_by }) => {
  return getFlowList(ctx, {
    type: 'post',
    sort: order_by,
    seenIds: seen_ids,
    minId: max_id,
    take: count
  })
}

export const getWorldImage = ({ ctx, seen_ids, count, max_id, order_by }) => {
  return getFlowList(ctx, {
    type: 'image',
    sort: order_by,
    seenIds: seen_ids,
    minId: max_id,
    take: count
  })
}

export const getWorldScore = ({ ctx, seen_ids, count, max_id, order_by }) => {
  return getFlowList(ctx, {
    type: 'score',
    sort: order_by,
    seenIds: seen_ids,
    minId: max_id,
    take: count
  })
}

export const getWorldQAQ = ({ ctx, seen_ids, count, max_id, order_by }) => {
  return getFlowList(ctx, {
    type: 'question',
    sort: order_by,
    seenIds: seen_ids,
    minId: max_id,
    take: count
  })
}

export const getRoleTrending = ({ ctx, seen_ids, count, max_id, order_by }) => {
  return getFlowList(ctx, {
    type: 'role',
    sort: order_by,
    seenIds: seen_ids,
    minId: max_id,
    take: count
  })
}

/* ---------- bangumi ---------- */

export const getBangumiPost = ({
  ctx,
  id,
  seen_ids,
  count,
  max_id,
  order_by
}) => {
  return getFlowList(ctx, {
    type: 'post',
    bangumiId: id,
    sort: order_by,
    seenIds: seen_ids,
    minId: max_id,
    take: count
  })
}

export const getBangumiImage = ({
  ctx,
  id,
  seen_ids,
  count,
  max_id,
  order_by
}) => {
  return getFlowList(ctx, {
    type: 'image',
    bangumiId: id,
    sort: order_by,
    seenIds: seen_ids,
    minId: max_id,
    take: count
  })
}

export const getBangumiRole = ({ ctx, id, page, count, order_by }) => {
  return getFlowList(ctx, {
    type: 'role',
    bangumiId: id,
    sort: order_by,
    take: count,
    page
  })
}

export const getBangumiScore = ({
  ctx,
  id,
  seen_ids,
  count,
  max_id,
  order_by
}) => {
  return getFlowList(ctx, {
    type: 'score',
    bangumiId: id,
    sort: order_by,
    seenIds: seen_ids,
    minId: max_id,
    take: count
  })
}

export const getBangumiQAQ = ({
  ctx,
  id,
  seen_ids,
  count,
  max_id,
  order_by
}) => {
  return getFlowList(ctx, {
    type: 'question',
    bangumiId: id,
    sort: order_by,
    seenIds: seen_ids,
    minId: max_id,
    take: count
  })
}

export const getBangumiCartoon = ({ ctx, id, page, count, order_by }) => {
  return ctx.$axios.$get(`bangumi/${id}/cartoon`, {
    params: {
      page,
      take: count,
      sort: order_by
    }
  })
}

/* ---------- user ---------- */

export const getUserFollowBangumis = ({ ctx, id }) => {
  return ctx.$axios.$get(`user/${id}/followed/bangumi`)
}

export const getUserPost = ({ ctx, id, page, count, order_by }) => {
  return getFlowList(ctx, {
    type: 'post',
    userZone: id,
    sort: order_by,
    take: count,
    page
  })
}

export const getUserPostReply = ({ ctx, id, count, page }) => {
  return ctx.$axios.$get(`user/${id}/posts/reply`, {
    params: { count, page }
  })
}

export const getUserImage = ({ ctx, id, page, count, order_by }) => {
  return getFlowList(ctx, {
    type: 'image',
    userZone: id,
    sort: order_by,
    take: count,
    page
  })
}

export const getUserScore = ({ ctx, id, page, count, order_by }) => {
  return getFlowList(ctx, {
    type: 'score',
    userZone: id,
    sort: order_by,
    take: count,
    page
  })
}

export const getUserQAQ = ({ ctx, id, page, count, order_by }) => {
  return getFlowList(ctx, {
    type: 'question',
    userZone: id,
    sort: order_by,
    take: count,
    page
  })
}

export const getUserAnswer = ({ ctx, id, page, count, order_by }) => {
  return getFlowList(ctx, {
    type: 'answer',
    userZone: id,
    sort: order_by,
    take: count,
    page
  })
}

export const getUserRole = ({ ctx, id, page, count, order_by }) => {
  return getFlowList(ctx, {
    type: 'role',
    userZone: id,
    sort: order_by,
    take: count,
    page
  })
}

export const getUserScoreDrafts = ({ ctx }) => {
  return ctx.$axios.$get('score/drafts')
}

export const getUserAnswerDrafts = ({ ctx }) => {
  return ctx.$axios.$get('question/soga/drafts')
}

export const getUserBookmarks = ({ ctx, page, take, order_by }) => {
  return ctx.$axios.$get('user/bookmarks', {
    params: { page, take, type: order_by }
  })
}

/* ---------- question ---------- */

export const getQuestionAnswers = ({ ctx, id, count, seen_ids, order_by }) => {
  return getFlowList(ctx, {
    type: 'answer',
    bangumiId: id,
    sort: order_by,
    take: count,
    seenIds: seen_ids
  })
}

/* ---------- cartoon_role ---------- */

export const cartoonRoleFans = ({ ctx, id, seen_ids, max_id, order_by }) => {
  return ctx.$axios.$get(`cartoon_role/${id}/fans`, {
    params: { seenIds: seen_ids, minId: max_id, sort: order_by }
  })
}
