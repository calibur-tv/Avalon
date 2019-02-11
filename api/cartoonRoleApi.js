export const getCartoonRoleInfo = (ctx, { id }) => {
  return ctx.$axios.$get(`cartoon_role/${id}/stock_show`)
}

export const getTodayActivity = ctx => {
  return ctx.$axios.$get(
    `cartoon_role/list/today?t=${Date.now()}-${Math.random()
      .toString(36)
      .substring(3, 6)}`
  )
}

export const dalaoUsers = ctx => {
  return ctx.$axios.$get('cartoon_role/list/dalao')
}

export const newbieUsers = ctx => {
  return ctx.$axios.$get('cartoon_role/list/newbie')
}

export const starRoleAction = (ctx, { id, amount }) => {
  return ctx.$axios.$post(`cartoon_role/${id}/buy_stock`, {
    amount
  })
}

export const createRole = (ctx, { bangumi_id, name, intro, avatar, alias }) => {
  return ctx.$axios.$post('cartoon_role/manager/create', {
    bangumi_id,
    name,
    intro,
    avatar,
    alias
  })
}

export const editRole = (ctx, form) => {
  return ctx.$axios.$post('cartoon_role/manager/edit', form)
}

export const createCartoonRole = (ctx, form) => {
  return ctx.$axios.$post('cartoon_role/manager/user_create', form)
}

export const getCartoonRoleDeal = (ctx, { id }) => {
  return ctx.$axios.$get(`cartoon_role/${id}/get_deal`)
}

export const createCartoonRoleDeal = (ctx, form) => {
  return ctx.$axios.$post('cartoon_role/create_deal', form)
}

export const makeCartoonRoleDeal = (ctx, form) => {
  return ctx.$axios.$post('cartoon_role/make_deal', form)
}

export const deleteCartoonRoleDeal = (ctx, { id }) => {
  return ctx.$axios.$post('cartoon_role/delete_deal', { id })
}
