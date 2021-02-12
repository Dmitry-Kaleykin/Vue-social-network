import instance from '../index'

export function getAuthAPI () {
  return instance
    .get('auth/me')
    .then(response => response.data);
}