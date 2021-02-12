import { putProfileInformationAPI } from '../../api/profileInformationPageAPI/profileInformationAPI'

export default {
  state: {
    name: null,
    descriptionQuestion: false,
    description: null,
    jobRadioData: [
      {label: 'Yes', value: true},
      {label: 'No', value: false}
    ],
    lookingForAJob: true,
    socialLinksData: [
      {placeholder: 'github', icon: 'mdi-github', value: null},
      {placeholder: 'vk', icon: 'mdi-vk', value: null},
      {placeholder: 'facebook', icon: 'mdi-facebook', value: null},
      {placeholder: 'instagram', icon: 'mdi-instagram', value: null},
      {placeholder: 'twitter', icon: 'mdi-twitter', value: null},
      {placeholder: 'website', icon: 'mdi-web', value: null},
      {placeholder: 'youtube', icon: 'mdi-youtube', value: null},
    ],
    message: {
      type: null,
      text: null
    },
    loading: false,
  },
  mutations: {
    updateSocialLink (state, payload) {
      const socialLinkIndex = state.socialLinksData.findIndex(item => item.placeholder === payload.placeholder);
      state.socialLinksData[socialLinkIndex].value = payload.value;
    },
    updateLookingForAJob (state, payload) {
      state.lookingForAJob = payload;
    },
    updateName (state, payload) {
      state.name = payload;
    },
    updateDescription (state, payload) {
      state.description = payload;
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
    putProfileInformation ({state, commit, rootState}) {
      commit('updateMessage', {type: null, text: null});
      commit('switchLoadingOn');
      const profileData = {
        userId: rootState.loggedUser.id,
        lookingForAJob: state.lookingForAJob,
        lookingForAJobDescription: state.lookingForAJob ? state.description : null,
        fullName: state.name,
        AboutMe: 'none', //API defect
        contacts: {}
      }
      state.socialLinksData.map( link => {
        if (!link.value) {
          profileData.contacts[link.placeholder] = ''
        } else {
          profileData.contacts[link.placeholder] = link.value
        }
      });
      putProfileInformationAPI(profileData)
        .then(response => {
          if (response.resultCode === 0) {
            commit('updateMessage', {type: 'success', text: 'Success'});
          }
          commit('updateMessage', {type: 'error', text: response.messages[0]});
          commit('switchLoadingOff');
        })
        .catch(error => {
          commit('updateMessage', {type: 'error', text: error});
          commit('switchLoadingOff');
        })
        .finally(commit('switchLoadingOff'));
    },
  },
}