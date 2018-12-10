export const getAnswerInfo = (ctx, { id }) => {
  return ctx.$axios.$get(`question/soga/${id}/show`)
}

export const getEditAnswerData = (ctx, { id }) => {
  return ctx.$axios.$get(`question/soga/${id}/resource`)
}

export const createAnswer = (
  ctx,
  { question_id, do_publish, geetest, source_url, content, intro }
) => {
  return ctx.$axios.$post('question/soga/create', {
    question_id,
    do_publish,
    geetest,
    source_url,
    content,
    intro
  })
}

export const updateAnswer = (
  ctx,
  { question_id, do_publish, geetest, source_url, content, intro, id }
) => {
  return ctx.$axios.$post(`question/soga/${id}/update`, {
    question_id,
    do_publish,
    geetest,
    source_url,
    content,
    intro
  })
}

export const deleteAnswer = (ctx, { id }) => {
  return ctx.$axios.$post(`question/soga/${id}/delete`)
}
