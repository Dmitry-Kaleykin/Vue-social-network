<template>
  <div class="login">
    <div class="login_image">
      <v-img src="../../assets/logo.png" alt="Vue Social Network"></v-img>
    </div>
    <v-card elevation="2" class="login_container">
      <h1 class="login_header">Sign in</h1>
      <v-divider></v-divider>
      <v-alert
        outlined
        dense
        dismissible
        transition="v-expand-transition"
        color="#ff5c5c"
        class="login_alert"
        v-if="message"
      >
        {{ message }}
      </v-alert>
      <div class="login_form">
        <v-text-field solo label="email" v-model="email"></v-text-field>
        <v-text-field
          solo
          label="password"
          v-model="password"
          type="password"
        ></v-text-field>
        <v-checkbox
          color="#5cbbf6"
          class="login_checkbox"
          label="Remember me"
          v-model="rememberMe"
        ></v-checkbox>
        <div class="captcha" v-if="captchaUrl">
          <v-img alt="captcha" :src="captchaUrl"></v-img>
          <p>type the code you see above:</p>
          <v-text-field solo label="captcha" v-model="captcha"></v-text-field>
        </div>
        <v-btn block color="#5cbbf6" class="login_button" @click="signIn">
          Sign in
          <v-progress-circular
            indeterminate
            size="24"
            class="login_progress"
            v-if="loading"
          ></v-progress-circular>
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "login",
  methods: {
    signIn () {
      this.$store.dispatch("postLogin");
    },
  },
  computed: {
    email: {
      get() {
        return this.$store.state.login.email;
      },
      set(value) {
        this.$store.commit("updateEmail", value);
      },
    },
    password: {
      get() {
        return this.$store.state.login.password;
      },
      set(value) {
        this.$store.commit("updatePassword", value);
      },
    },
    rememberMe: {
      get() {
        return this.$store.state.login.rememberMe;
      },
      set(value) {
        this.$store.commit("updateRemember", value);
      },
    },
    captcha: {
      get() {
        return this.$store.state.login.captcha;
      },
      set(value) {
        this.$store.commit("updateCaptcha", value);
      },
    },
    captchaUrl () {
      return this.$store.state.login.captchaUrl;
    },
    message() {
      return this.$store.state.login.message;
    },
    loading() {
      return this.$store.state.login.loading;
    },
  },
};
</script>

<style lang="sass" scoped>
.login
  text-align: center
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  margin-bottom: 1rem

  &_image
    margin-bottom: 5rem

  &_header
    color: white
    padding: 1rem
    background-color: #5cbbf6

  &_alert
    margin: 1rem
    margin-bottom: 0
    /* border color in template */

  &_container
    width: 320px

  &_button
    color: white !important
    margin: 0 auto

  &_form
    padding: 1rem

  &_checkbox
    margin-top: 0
    /* background color in template */

  &_progress
    position: absolute
    right: 3rem

.captcha > *
  margin-bottom: 1rem

@media screen and (max-width: 990px)
  .login_image
    width: 300px
</style>
