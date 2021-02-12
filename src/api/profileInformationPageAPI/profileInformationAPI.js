import instance from '../index'

export function putProfileInformationAPI (profileData) {
  return instance
    .put('profile', profileData)
    .then(response => response.data);
}