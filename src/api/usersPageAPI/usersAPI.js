import instance from '../index'

export function getUsersAPI ({count, page, term, friend}) {
  let url = '/users?';
  if (count) url += `count=${count}`;
  if (page) url += `&page=${page}`;
  if (term) url += `&term=${term}`;
  if (friend) url += `&friend=${friend}`;
  return instance
    .get(url)
    .then(response => response.data);
}

export function postFollowAPI (userId) {
  return instance
    .post(`follow/${userId}`)
    .then(response => response.data);
}

export function deleteFollowAPI (userId) {
  return instance
    .delete(`follow/${userId}`)
    .then(response => response.data);
}