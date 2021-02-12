import instance from '../index'

export function deleteAuthAPI () {
  return instance
    .delete('auth/login')
    .then(response => response.data);
}