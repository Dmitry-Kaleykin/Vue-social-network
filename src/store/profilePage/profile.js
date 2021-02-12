export default {
  state: {
    profileData: null,
    status: null,
  },
  mutations: {

  },
  actions: {
    putUserProfileAvatar (photo) {
      const formData = new FormData();
      formData.append('image', photo);
    }
  }
}