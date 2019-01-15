export const getNoticeInfo = (ctx, { id }) => {
  return ctx.$axios.$get(`user/notice/show/${id}`)
}
