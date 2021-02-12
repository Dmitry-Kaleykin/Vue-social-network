import { deleteAuthAPI } from '../../api/mainLayoutAPI/logoutAPI'
import router from '../../router/index'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    deleteAuth ({commit}) {
      deleteAuthAPI()
        .then(response => {
          if (response.resultCode === 0) {
            commit('deleteLoggedUserData', null, {root: true});
            router.push('/');
          }
        })
        .catch(error => console.log(error));
    }
  }
}