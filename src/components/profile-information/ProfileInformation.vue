<template>
  <div class="container">
    <v-alert 
      outlined
      dense
      dismissible
      color="#ff5c5c"
      transition="v-expand-transition"
      v-if="message.type === 'error'"
    >{{message.text}}</v-alert>
    <v-alert 
      outlined
      dense
      dismissible
      color="#4caf50"
      transition="v-expand-transition"
      type="success"
      v-else-if="message.type === 'success'"
    >{{message.text}}</v-alert>
    <v-text-field
      label="Your name"
      solo
      v-model="name"
    ></v-text-field>
    <p>Do you looking for a job?</p>
    <v-radio-group v-model="lookingForAJob">
      <v-radio
        v-for="variant in jobRadioData"
        :key="variant.label"
        :label="variant.label"
        :value="variant.value"
      ></v-radio>
    </v-radio-group>
    <v-textarea
      solo
      label="Discribe your skills"
      :disabled="!lookingForAJob"
      v-model="description"
    ></v-textarea>
    <v-text-field
      solo
      v-for="link in socialLinksData"
      :value="link.value"
      :key="link.placeholder"
      :placeholder="link.placeholder"
      :prepend-inner-icon="link.icon"
      @change="e => socialLinkValue(link.placeholder, e)"
    ></v-text-field>
    <v-btn class="button" color="#5cbbf6" @click="sendProfileInformation">
      Send
      <v-progress-circular
        indeterminate
        size="24"
        class="button_loading"
        v-if="loading"
      ></v-progress-circular>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'profile-information',
  data () {
    return {
      //
    }
  },
  methods: {
    socialLinkValue (placeholder, value) {
      this.$store.commit('updateSocialLink', {placeholder, value});
    },
    sendProfileInformation () {
      this.$store.dispatch('putProfileInformation');
    },
  },
  computed: {
    name: {
      get () {
        return this.$store.state.profileInformation.name;
      },
      set (value) {
        this.$store.commit('updateName', value);
      }
    },
    description: {
      get () {
        return this.$store.state.profileInformation.description;
      },
      set (value) {
        this.$store.commit('updateDescription', value);
      }
    },
    lookingForAJob: {
      get () {
        return this.$store.state.profileInformation.lookingForAJob;
      },
      set (value) {
        this.$store.commit('updateLookingForAJob', value);
      }
    },
    socialLinksData () {
      return this.$store.state.profileInformation.socialLinksData;
    },
    jobRadioData () {
      return this.$store.state.profileInformation.jobRadioData;
    },
    loading () {
      return this.$store.state.profileInformation.loading;
    },
    message () {
      return this.$store.state.profileInformation.message;
    },
  },
}
</script>

<style lang="sass" scoped>
.container
  padding: 1rem

.button
  display: block
  margin: auto
  color: white !important
  &_loading
    margin-left: 0.5rem
</style>