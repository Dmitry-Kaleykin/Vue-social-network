<template>
  <v-app class="app_container">
    <component :is="layout + '-layout'">
      <router-view></router-view>
    </component>
  </v-app>
</template>

<script>
import EmptyLayout from './views/empty-layout.vue'
import Login from './components/login/Login.vue'
import MainLayout from './views/main-layout.vue';
import Profile from './components/profile/Profile.vue';
import Users from './components/users/Users.vue';
import ProfileInformation from './components/profile-information/ProfileInformation';

export default {
  name: 'App',
  data () {
    return {
      error: '',
    }
  },
  created () {
    this.auth();
  },
  methods: {
    auth () {
      this.$store.dispatch("getAuth");
    },
  },
  computed: {
    layout () {
      return this.$route.meta.layout;
    },
  },
  components: {
    Login,
    EmptyLayout,
    MainLayout,
    Profile,
    Users,
    ProfileInformation,
  },
};
</script>

<style lang="sass">
html
  height: 100%

body
  min-height:100%
  overflow: hidden

*
  list-style: none
  text-decoration: none
</style>
