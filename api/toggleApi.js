export const users = ({ ctx, type, id, last_id, take, model }) => {
  return ctx.$axios.$get('toggle/users', {
    params: { id, last_id, take, model, type }
  })
}

export const like = ({ ctx, type, id }) => {
  return ctx.$axios.$post('toggle/like', { type, id })
}

export const reward = ({ ctx, type, id }) => {
  return ctx.$axios.$post('toggle/reward', { type, id })
}

export const follow = ({ ctx, type, id }) => {
  return ctx.$axios.$post('toggle/follow', { type, id })
}

export const mark = ({ ctx, type, id }) => {
  return ctx.$axios.$post('toggle/mark', { type, id })
}

export const vote = ({ ctx, type, id, is_agree }) => {
  return ctx.$axios.$post('toggle/vote', { type, id, is_agree })
}
