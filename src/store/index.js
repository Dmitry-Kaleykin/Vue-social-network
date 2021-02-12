import Vue from 'vue'
import Vuex from 'vuex'
import login from './loginPage/login'
import users from './usersPage/users'
import profileInformation from './profileInformationPage/profileInformationPage'
import mainLayout from './mainLayout/mainLayout'
import router from '../router/index'
import { getAuthAPI } from '../api/loginPageAPI/authAPI'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedUser: {
      id: null,
      email: null,
      login: null,
    },
  },
  mutations: {
    setLoggedUserData (state, payload) {
      state.loggedUser = payload;
    },
    deleteLoggedUserData (state) {
      state.loggedUser = {
        id: null,
        email: null,
        login: null,
      }
    },
  },
  actions: {
    getAuth ({commit}) {
      getAuthAPI()
        .then(response => {
          if (response.resultCode === 0) {
            commit('setLoggedUserData', response.data);
            router.push('/profile');
          }
        })
        .catch(error => {
          console.log(error);
          //commit('updateMessage', error);
        });
    },
  },
  modules: {
    login,
    mainLayout,
    users,
    profileInformation,
  }
})
