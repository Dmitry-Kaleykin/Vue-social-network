import { postLoginAPI, getCaptchaAPI } from '../../api/loginPageAPI/loginAPI'
import router from '../../router/index'

export default {
  state: {
    email: '',
    password: '',
    rememberMe: false,
    captcha: null,
    captchaUrl: null,
    message: null,
    loading: false,
  },
  mutations: {
    updateEmail (state, payload) {
      state.email = payload;
    },
    updatePassword (state, payload) {
      state.password = payload;
    },
    updateRemember (state, payload) {
      state.rememberMe = payload;
    },
    updateCaptcha (state, payload) {
      state.captcha = payload;
    },
    updateCaptchaUrl (state, payload) {
      state.captchaUrl = payload;
    },
    updateUserId (state, payload) {
      state.userId = payload;
    },
    updateMessage (state, payload) {
      state.message = payload;
    },
    switchLoadingOn (state) {
      state.loading = true;
    },
    switchLoadingOff (state) {
      state.loading = false;
    },
  },
  actions: {
    postLogin ({state, commit, rootState}) {
      commit('switchLoadingOn');
      postLoginAPI({
        email: state.email,
        password: state.password,
        rememberMe: state.rememberMe,
        captcha: state.captcha,
      })
        .then(response => {
          if (response.resultCode === 0) {
            commit('setLoggedUserData', {
              id: response.data.userId,
              email: null,
              login: null,
            }, {root: true});
            router.push(`/profile/${rootState.loggedUser.id}`);
          }
        })
        .catch(error => {
          commit('updateMessage', error);
        });
      commit('switchLoadingOff');
    },
    getCaptcha ({commit}) {
      commit('switchLoadingOn');
      getCaptchaAPI()
        .then(response => {
          commit('updateCaptchaUrl', response.url);
        })
        .catch(error => {
          commit('updateMessage', error);
        })
      commit('switchLoadingOff');
    }
  },
}