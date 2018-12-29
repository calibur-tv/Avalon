export const getCaptcha = ctx => {
  return ctx.$axios.$get(
    `image/captcha?t=${Date.now()}-${Math.random()
      .toString(36)
      .substring(3, 6)}`
  )
}

export const getUpToken = ctx => {
  return ctx.$axios.$get('image/uptoken')
}

export const uploadToQiniu = (ctx, formData) => {
  return ctx.$axios.$post('https://up.qbox.me', formData, {
    'Content-Type': 'multipart/form-data'
  })
}

export const getImageInfo = (ctx, { id, hash, query }) => {
  return ctx.$axios.$get(`image/${id}/show`, {
    params: { hash, query }
  })
}

export const createAlbum = (
  ctx,
  {
    bangumi_id,
    name,
    url,
    width,
    height,
    size,
    type,
    is_creator,
    is_cartoon,
    part
  }
) => {
  return ctx.$axios.$post('image/album/create', {
    bangumi_id,
    name,
    url,
    width,
    height,
    size,
    type,
    is_creator,
    is_cartoon,
    part
  })
}

export const editAlbum = (
  ctx,
  { id, name, url, width, height, size, type, part }
) => {
  return ctx.$axios.$post('image/album/edit', {
    id,
    name,
    url,
    width,
    height,
    size,
    type,
    part
  })
}

export const uploadSingleImage = (
  ctx,
  { bangumi_id, name, url, width, height, size, type, is_creator, geetest }
) => {
  return ctx.$axios.$post('image/single/upload', {
    bangumi_id,
    name,
    url,
    width,
    height,
    size,
    type,
    is_creator,
    geetest
  })
}

export const uploadManyImage = (ctx, { album_id, images }) => {
  return ctx.$axios.$post('image/album/upload', {
    album_id,
    images
  })
}

export const deleteAlbum = (ctx, { id }) => {
  return ctx.$axios.$post('image/album/delete', { id })
}

export const editSingleImage = (ctx, { id, name, bangumi_id }) => {
  return ctx.$axios.$post('image/single/edit', {
    id,
    name,
    bangumi_id
  })
}

export const getUserAlbums = ctx => {
  return ctx.$axios.$get('image/album/users')
}

export const sortAlbum = (ctx, { id, result }) => {
  return ctx.$axios.$post(`image/album/${id}/sort`, { result })
}

export const deleteAlbumImage = (ctx, { id, result, imageId }) => {
  return ctx.$axios.$post(`image/album/${id}/deleteImage`, { result, imageId })
}
