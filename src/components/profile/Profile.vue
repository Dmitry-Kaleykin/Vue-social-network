<template>
  <div class="profile">
    <v-sheet class="profile_information" elevation="1">
      <div class="profile_avatar">
        <v-img class="avatar" alt="avatar" :src="avatar || noIMG"></v-img>
        <div class="avatar_selector" v-if="isOwner">
          <v-file-input
            color="#5cbbf6"
            light
            class="avatar_input"
            accept="image/png, image/jpeg, image/bmp"
            prepend-icon="mdi-camera"
            @change="sendAvatar"
          ></v-file-input>
        </div>
      </div>
      <div class="profile_fullname">
        <v-text-field color="#5cbbf6" :placeholder="status || 'change status'" v-if="isOwner" v-model="status" @blur="sendStatus"></v-text-field>
        <p v-else>{{status}}</p>
        <h1>{{fullName}}</h1>
      </div>
    </v-sheet>
    <div  class="profile_description">
      <v-sheet class="description">
        <p class="description_header">Description</p>
        <v-divider></v-divider>
        <p class="description_content">{{description || 'User did not provide information'}}</p>
      </v-sheet>
    </div>
    <div class="profile_contacts">
      <v-sheet class="contacts">
        <v-icon 
          large
          tag="a"
          class="contacts_link"
          v-for="(value, name, index) in contacts"
          :key="name"
          :disabled="!value"
          :href="value">
          {{icons[index]}}
        </v-icon>
      </v-sheet>
    </div>
  </div>
</template>

<script>
import noIMG from "../../assets/noimg.jpg";

export default {
  name: "profile",
  data () {
    return {
      noIMG,
      icons: [ // According to the API contacts sequence
        'mdi-youtube',
        'mdi-web',
        'mdi-twitter',
        'mdi-instagram',
        'mdi-facebook',
        'mdi-vk',
        'mdi-github',
      ],
    }
  },
  mounted () {
    this.$store.dispatch('getUserProfile', this.routeId);
    this.$store.dispatch('getUserProfileStatus', this.routeId);
  },
  methods: {
    sendAvatar(avatar) {
      this.$store.dispatch('putUserProfileAvatar', avatar);
    },
    sendStatus () {
      this.$store.dispatch('putUserProfileStatus');
    },
  },
  computed: {
    status: {
      get () {
        return this.$store.state.profile.status;
      },
      set (value) {
        this.$store.commit('updateStatus', value);
      }
    },
    isOwner () {
      return this.routeId == this.$store.state.loggedUser.id;
    },
    message () {
      return this.$store.state.profile.message;
    },
    routeId () {
      return this.$route.params.id;
    },
    avatar () {
      return this.$store.state.profile.profileData?.photos?.small;
    },
    fullName () {
      return this.$store.state.profile.profileData?.fullName;
    },
    description () {
      return this.$store.state.profile.profileData?.lookingForAJobDescription;
    },
    contacts () {
      let contactLinks = this.$store.state.profile.profileData?.contacts;
      delete contactLinks.mainLink; // Extra link removed
      return contactLinks;
    },
  },
}
</script>

<style lang="sass" scoped>
.profile
  display: flex
  flex-direction: column
  align-items: center
  & > *
    margin-bottom: 0.5rem
  &_information
    padding: 0.5rem 1rem 1rem 1rem
    width: 100%
    display: flex
  &_description
    width: 100%
  &_contacts
    width: 100%
  &_fullname
    width: 100%
    margin-left: 2rem
  &_avatar
    overflow: hidden
    height: 200px
    width: 200px
    border-radius: 50%
    flex-shrink: 0

.avatar
  height: 100%
  width: 100%
  &_input
    margin: 0 2rem
  &_selector
    color: #e2e2e2
    position: relative
    top: 200px
    transition: ease .5s
    height: 100%
    background-color: rgba(255,255,255, 0.4)
    &:hover
      top: -80px
  &:hover ~ &_selector
    top: -60px

.description
  padding: 1rem
  line-height: 2rem

.contacts
  display: flex
  justify-content: space-around
  padding: 1rem
  &_link:hover
    color: #5c5c5c !important

@media screen and (max-width: 990px) 
  .profile
    &_information
      flex-direction: column
      align-items: center
    &_fullname
      margin-left: 0

</style>