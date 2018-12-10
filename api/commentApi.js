export const getMainCommentList = (
  ctx,
  { type, id, fetchId, onlySeeMaster, seeReplyId }
) => {
  return ctx.$axios.$get('comment/main/list', {
    params: { fetchId, onlySeeMaster, seeReplyId, type, id }
  })
}

export const getSubCommentList = (ctx, { type, id, maxId }) => {
  return ctx.$axios.$get('comment/sub/list', {
    params: { maxId, type, id }
  })
}

export const createMainComment = (ctx, { type, id, content, images }) => {
  return ctx.$axios.$post('comment/main/create', {
    content,
    images,
    type,
    id
  })
}

export const createSubComment = (ctx, { type, id, content, targetUserId }) => {
  return ctx.$axios.$post('comment/main/reply', {
    targetUserId,
    content,
    type,
    id
  })
}

export const deleteSubComment = (ctx, { type, id }) => {
  return ctx.$axios.$post('comment/sub/delete', {
    type,
    id
  })
}

export const deleteMainComment = (ctx, { type, id }) => {
  return ctx.$axios.$post('comment/main/delete', {
    type,
    id
  })
}

export const toggleLikeMainComment = (ctx, { type, id }) => {
  return ctx.$axios.$post('comment/main/toggleLike', {
    type,
    id
  })
}

export const toggleLikeSubComment = (ctx, { type, id }) => {
  return ctx.$axios.$post('comment/sub/toggleLike', {
    type,
    id
  })
}
