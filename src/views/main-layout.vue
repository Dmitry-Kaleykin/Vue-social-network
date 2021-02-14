<template>
  <div class="layout">
    <div class="layout_head">
      <div class="header">
        <div class="header_container">
          <v-img class="header_logo" src="../assets/logo2.png" alt="logo"></v-img>
          <p class="header_title">Social network model</p>
          <v-btn  
            large 
            icon 
            class="header_burger"
            @click="toggleSidebar">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
        </div>
        <div class="header_container">
          <h3 class="header_name">{{fullname}}</h3>
          <v-btn class="header_button" color="#5cbbf6" @click="logout">Sign out</v-btn>
        </div>
      </div>
    </div>
    <div class="layout_body">
      <div class="sidebar" :class="{'sidebar-active': sidebar}">
        <v-list>
          <v-subheader>PAGES</v-subheader>
          <v-divider></v-divider>
          <v-list-item-group>
            <router-link 
              v-for="page in pages" 
              :key="page.title"
              :to="page.url">
              <v-list-item color="#5cbbf6" @click="toggleSidebar">
                <v-list-item-icon>
                  <v-icon>{{page.icon}}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="pagelink_title">
                    {{page.title}}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </router-link>
          </v-list-item-group>
        </v-list>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "main-layout",
  data: () => ({
    pages: [],
    sidebar: false,
  }),
  created () {
    this.pages = [
      {title: "Profile", icon: "mdi-account", url: `/profile/${this.loggedUserId}`},
      {title: "Dialogs", icon: "mdi-message", url: '/dialogs'},
      {title: "Users", icon: "mdi-account-multiple", url: '/users'},
      {title: "Profile information", icon: "mdi-account-cog", url: '/info'},
    ]
  },
  methods: {
    toggleSidebar () {
      this.sidebar = !this.sidebar
    },
    logout () {
      this.$store.dispatch('deleteAuth');
    },
  },
  computed: {
    fullname () {
      return this.$store.state.loggedUser.login;
    },
    loggedUserId () {
      return this.$store.state.loggedUser.id;
    }
  },
}
</script>

<style lang="sass" scoped>
.layout
  height: 100vh
  background-color: #f4f4f2
  display: flex
  flex-direction: column
  align-items: center

  &_head
    background-color: #e8e8e8
    width: 100%
    display: flex
    justify-content: center
  
  &_body
    height: 100%
    width: 990px
    display: flex

.header
  width: 990px
  height: 60px
  display: flex
  justify-content: space-between
  &_container
    display: flex
    justify-content: flex-end
    align-items: center
    &:first-child
      justify-content: flex-start
  &_logo
    flex-basis: 80px
    flex-grow: 0
    flex-shrink: 0
  &_title
    font-size: 25px
    font-weight: 500
  &_button
    color: white !important
    margin-left: 1rem
    /* background color in template */
  &_burger
    display: none

.sidebar
  background-color: #bbbfca
  width: 320px
  flex-shrink: 0

.content
  background-color: #495464
  width: 100%
  margin-bottom: 54px
  overflow-y: auto
  box-sizing: border-box

.pagelink_title
  margin-left: 1rem

@media screen and (max-width: 990px)
  .sidebar
    position: fixed
    width: 100%
    height: 100vh
    left: -100%
    transition: all ease 0.5s
    z-index: 1
    &-active
      left: 0

  .content
    overflow: scroll

  .header
    width: 100%
    &_container
      justify-content: flex-end
      margin-right: 1rem
      &:first-child
        justify-content: flex-start
        margin-right: 0
        margin-left: 1rem
    &_logo
      display: none
    &_title
      display: none
    &_burger
      display: block
    &_name
      display: none

  .layout
    &_body
      width: 100%

</style>