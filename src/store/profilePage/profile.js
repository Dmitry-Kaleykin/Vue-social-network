import { putUserProfileStatusAPI, putUserProfileAvatarAPI, getUserProfileAPI, getUserProfileStatusAPI } from '../../api/profilePageAPI/profileDataAPI'

export default {
  state: {
    profileData: null,
    status: null,
    message: null,
  },
  mutations: {
    updateStatus (state, payload) {
      state.status = payload;
    },
    updateProfileData (state, payload) {
      state.profileData = payload;
    },
    updateMessage (state, payload) {
      state.message = payload;
    },
  },
  actions: {
    getUserProfile ({commit}, userId) {
      getUserProfileAPI(userId)
        .then(response => {
          commit('updateProfileData', response);
        });
    },
    getUserProfileStatus({commit}, userId) {
      getUserProfileStatusAPI(userId)
        .then(response => {
          commit('updateStatus', response);
        });
    },
    putUserProfileAvatar ({commit, state}, avatar) {
      const formData = new FormData();
      formData.append('image', avatar);
      putUserProfileAvatarAPI(formData)
        .then(response => {
          if (response.resultCode === 0) {
            console.log(response.data);
            commit('updateProfileData', {
              ...state.profileData,
              photos: response.data.photos
            });
          }
        });
    },
    putUserProfileStatus ({commit, state}) {
      commit('updateMessage', null);
      putUserProfileStatusAPI(state.status)
        .then(response => {
          if (response.resultCode != 0) {
            commit('updateMessage', response.messages);
          }
        });
    },
  }
}