import { getUsersAPI, postFollowAPI, deleteFollowAPI } from '../../api/usersPageAPI/usersAPI'

export default {
  state: {
    users: null,
    totalCount: null,
    message: null,
    loading: null,
    followLoading: null,
    currentSelectItem: null,
    page: 1,
    usersPerPage: 10,
    searchTerm: null,
  },
  mutations: {
    toggleFollowLoading (state, payload) {
      state.followLoading = payload;
    },
    updateSearchTerm (state, payload) {
      state.searchTerm = payload;
    },
    updatePage (state, payload) {
      state.page = payload;
    },
    updateCurrentSelectItem (state, payload) {
      state.currentSelectItem = payload;
    },
    updateTotalCount (state, payload) {
      state.totalCount = payload;
    },
    updateUsers (state, payload) {
      state.users = payload;
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
    getUsers ({commit}, queryParams) {
      commit('switchLoadingOn');
      getUsersAPI(queryParams)
        .then(response => {
          if (!response.error) {
            commit('updateUsers', response.items);
            commit('updateTotalCount', response.totalCount);
          }
        })
        .catch(error => {
          commit('updateMessage', error);
        })
        .finally(commit('switchLoadingOff'));
    },
    postFollow ({commit, dispatch, state}, userId) {
      commit('toggleFollowLoading', userId);
      postFollowAPI(userId)
        .then(response => {
          if (response.resultCode === 0) {
            dispatch('getUsers', {
              count: state.usersPerPage,
              page: state.page,
              term: state.searchTerm,
              friend: state.currentSelectItem,
            });
          }
          commit('toggleFollowLoading', null);
        })
        .catch(error => {
          console.log(error);
          commit('toggleFollowLoading', null);
        });
    },
    deleteFollow ({commit, dispatch, state}, userId) {
      commit('toggleFollowLoading', userId);
      deleteFollowAPI(userId)
        .then(response => {
          if (response.resultCode === 0) {
            dispatch('getUsers', {
              count: state.usersPerPage,
              page: state.page,
              term: state.searchTerm,
              friend: state.currentSelectItem,
            });
          }
          commit('toggleFollowLoading', null);
        })
        .catch(error => {
          console.log(error);
          commit('toggleFollowLoading', null);
        });
    },
  },
}