export const getRecommendedUsers = ctx => {
  return ctx.$axios.$get('user/recommended')
}

export const getLoginUser = ctx => {
  return ctx.$axios.$post('door/refresh')
}

export const settingProfile = (ctx, params) => {
  return ctx.$axios.$post('user/setting/profile', params)
}

export const settingImage = (ctx, { type, url }) => {
  return ctx.$axios.$post('user/setting/image', { type, url })
}

export const getUserInfo = (ctx, { zone }) => {
  return ctx.$axios.$get(`user/${zone}/show`)
}

export const bindPhone = (ctx, { id, phone, password, authCode }) => {
  return ctx.$axios.$post('door/bind_phone', {
    id,
    phone,
    password,
    authCode
  })
}

export const sendMessage = (ctx, { phone_number, type, geetest }) => {
  return ctx.$axios.$post('door/message', {
    phone_number,
    type,
    geetest
  })
}

export const register = (
  ctx,
  { access, secret, nickname, authCode, inviteCode }
) => {
  return ctx.$axios.$post('door/register', {
    access,
    secret,
    nickname,
    authCode,
    inviteCode
  })
}

export const login = (ctx, { access, secret, remember, geetest }) => {
  return ctx.$axios.$post('door/login', {
    access,
    secret,
    remember,
    geetest
  })
}

export const logout = ctx => {
  return ctx.$axios.$post('door/logout')
}

export const feedback = (ctx, { type, desc, ua }) => {
  return ctx.$axios.$post('user/feedback', { type, desc, ua })
}

export const daySignAction = ctx => {
  return ctx.$axios.$post('user/daySign')
}

export const getUserCard = (ctx, { id }) => {
  return ctx.$axios.$get('user/card', {
    params: { id }
  })
}

export const report = (ctx, { id, type, model, message }) => {
  return ctx.$axios.$post('report/send', {
    id,
    type,
    model,
    message
  })
}

export const resetPassword = (ctx, { method, access, authCode, secret }) => {
  return ctx.$axios.$post('door/reset', {
    method,
    access,
    authCode,
    secret
  })
}

export const readAllMessage = ctx => {
  return ctx.$axios.$post('user/notification/clear')
}

export const readMessage = (ctx, { id }) => {
  return ctx.$axios.$post('user/notification/read', { id })
}

export const getNotifications = (ctx, { minId }) => {
  return ctx.$axios.$get('user/notification/list', {
    params: { minId }
  })
}

export const getNotificationCount = ctx => {
  return ctx.$axios.$get('user/notification/count')
}
