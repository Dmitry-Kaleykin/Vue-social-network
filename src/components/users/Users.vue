<template>
  <div class="container">
    <v-sheet elevation="1" class="search">
      <v-text-field
        class="search_textfield"
        color="#5cbbf6"
        v-model="searchTerm"
      >
        <template v-slot:append>
          <v-fade-transition leave-absolute>
            <v-progress-circular
              v-if="loading"
              size="24"
              color="info"
              indeterminate
            ></v-progress-circular>
            <v-btn v-else icon v-on:click="changePageRequest('searchBar')">
              <v-icon alt="search">
                {{ "mdi-magnify" }}
              </v-icon>
            </v-btn>
          </v-fade-transition>
        </template>
      </v-text-field>
      <v-select
        solo
        attach=".search_filter"
        class="search_filter"
        placeholder="filter"
        item-text="text"
        item-value="value"
        :items="selectItems"
        v-on:change="changePageRequest('filter')"
        v-model="currentSelectItem"
      ></v-select>
    </v-sheet>
    <v-sheet elevation="1" class="pagination">
      <v-pagination
        color="#5cbbf6"
        v-model="page"
        :length="pagesCount"
        :total-visible="7"
        :value="page"
        v-on:click="changePageRequest"
      ></v-pagination>
    </v-sheet>
    <v-sheet elevation="1" class="user" v-for="user in users" :key="user.id">
      <router-link :to="`/profile/${user.id}`">
        <div class="user_avatar">
          <img alt="avatar" :src="user.photos.small || noIMG" />
        </div>
      </router-link>
      <div class="user_info">
        <h2 class="user_name">{{ user.name }}</h2>
        <v-divider class="user_divider"></v-divider>
        <p class="user_status">{{ user.status }}</p>
      </div>
      <v-btn
        v-if="user.followed"
        class="user_followButton"
        small
        color="#5cbbf6"
        :disabled="user.id == followLoading"
        @click="deleteFollow(user.id)"
        >Unfollow</v-btn
      >
      <v-btn
        v-else
        class="user_followButton"
        small
        color="#5cbbf6"
        :disabled="user.id == followLoading"
        @click="postFollow(user.id)"
        >Follow</v-btn
      >
    </v-sheet>
  </div>
</template>

<script>
import noIMG from "../../assets/noimg.jpg";

export default {
  name: "users",
  data() {
    return {
      noIMG,
      selectItems: [
        {text: 'All', value: null},
        {text: 'Followed', value: true},
        {text: 'Unfollowed', value: false},
      ],
    };
  },
  mounted() {
    this.changePageRequest();
  },
  watch: {
    page() {
      this.changePageRequest();
    },
  },
  methods: {
    changePageRequest(initiator) {
      const queryParams = {
        count: this.usersPerPage,
        page: this.page,
        term: this.searchTerm,
        friend: this.currentSelectItem,
      };
      switch (initiator) {
        case "filter": {
          this.$store.dispatch("getUsers", { ...queryParams, page: 1 });
          this.$store.commit("updatePage", 1);
        }
        case "searchBar": {
          this.$store.dispatch("getUsers", { ...queryParams, page: 1 });
          this.$store.commit("updatePage", 1);
        }
        default: {
          this.$store.dispatch("getUsers", queryParams);
        }
      }
    },
    postFollow(userId) {
      this.$store.dispatch("postFollow", userId);
    },
    deleteFollow(userId) {
      this.$store.dispatch("deleteFollow", userId);
    },
  },
  computed: {
    searchTerm: {
      get() {
        return this.$store.state.users.searchTerm;
      },
      set(value) {
        this.$store.commit("updateSearchTerm", value);
      },
    },
    page: {
      get() {
        return this.$store.state.users.page;
      },
      set(value) {
        this.$store.commit("updatePage", value);
      },
    },
    currentSelectItem: {
      get() {
        return this.$store.state.users.currentSelectItem;
      },
      set(value) {
        this.$store.commit("updateCurrentSelectItem", value);
      },
    },
    usersPerPage() {
      return this.$store.state.users.usersPerPage;
    },
    users() {
      return this.$store.state.users.users;
    },
    pagesCount() {
      return Math.ceil(this.$store.state.users.totalCount / this.usersPerPage);
    },
    loading() {
      return this.$store.state.users.loading;
    },
    followLoading() {
      return this.$store.state.users.followLoading;
    },
  },
};
</script>

<style lang="sass" scoped>
.container
  display: flex
  flex-direction: column
  align-items: center
  padding: 0
  overflow-y: hidden
  & > *
    margin-bottom: 4px

.search
  display: flex
  align-items: baseline
  width: 100%
  padding: 0 1rem
  &_textfield
    flex: 4
  &_filter
    flex: 1
    margin-left: 1rem !important

.user
  display: flex
  align-items: center
  width: 100%
  padding: 0.5rem
  &_avatar
    display: flex
    justify-content: center
    align-items: center
    width: 80px
    height: 80px
    overflow: hidden
    border-radius: 50%
    & img
      width: auto
      height: 100%
  &_info
    margin-left: 1rem
  &_followButton
    margin-left: auto
    color: white !important
    /* background color in template */

.pagination
  width: 100%

@media screen and (max-width: 990px)
  .user
    &_divider, &_status
      display: none
    &_status
      white-space: nowrap
      text-overflow: ellipsis
      overflow: hidden
    &_name
      font-size: 0.8rem
      /* сдвигает верстку если имя длинное, свойства ниже не исправляют */
      white-space: nowrap
      text-overflow: ellipsis
      overflow: hidden

  .search_filter
    flex: 2
</style>