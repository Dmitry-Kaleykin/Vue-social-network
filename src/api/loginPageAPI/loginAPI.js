import instance from '../index'

export function postLoginAPI (formData) {
  return instance
    .post('auth/login', formData)
    .then(response => response.data);
}

export function getCaptchaAPI () {
  return instance
    .get('security/get-captcha-url')
    .then(response => response.data);
}