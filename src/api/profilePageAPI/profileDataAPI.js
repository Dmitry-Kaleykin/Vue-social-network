import instance from '../index'

export function getUserProfileAPI (userId) {
  return instance
    .get(`profile/${userId}`)
    .then(response => response.data);
}

export function getUserProfileStatusAPI (userId) {
  return instance
    .get(`profile/status/${userId}`)
    .then(response => response.data);
}

export function putUserProfileStatusAPI (status) {
  return instance
    .put('profile/status', {status})
    .then(response => response.data);
}

export function putUserProfileAvatarAPI (photo) {
  return instance
    .put('profile/photo', photo, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => response.data);
}