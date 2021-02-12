<template>
  <div class="profile">
    <v-sheet class="profile_information" elevation="1">
      <div class="profile_avatar">
        <v-img class="avatar" alt="avatar" src="../../assets/noimg.jpg"></v-img>
        <div class="avatar_selector">
          <v-icon x-large>mdi-plus-circle-outline</v-icon>
          <p>change avatar</p>
        </div>
      </div>
      <div class="profile_fullname">
        <v-text-field placeholder="change status"></v-text-field>
        <h1>Fullname</h1>
      </div>
    </v-sheet>
    <div class="profile_description">
      <v-sheet class="description">
        <p class="description_header">Description</p>
        <v-divider></v-divider>
        <p class="description_content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium sequi, odio illum perspiciatis nemo vel quaerat. Quisquam numquam cum maxime quae? Eveniet obcaecati sapiente laboriosam fugit cumque consequatur excepturi omnis.</p>
      </v-sheet>
    </div>
    <div class="profile_contacts">
      <v-sheet class="contacts">
        <v-icon 
          large
          tag="a"
          href="#"
          class="contacts_link"
          v-for="link in socialLinks"
          :key="link.url"
          :disabled="!link.active">
          {{link.icon}}
        </v-icon>
      </v-sheet>
    </div>
  </div>
</template>

<script>
export default {
  name: "profile",
  data () {
    return {
      socialLinks: [
        {url: 'github', icon: 'mdi-github', active: true},
        {url: 'vk', icon: 'mdi-vk', active: true},
        {url: 'facebook', icon: 'mdi-facebook', active: false},
        {url: 'instagram', icon: 'mdi-instagram', active: true},
        {url: 'twitter', icon: 'mdi-twitter', active: false},
        {url: 'website', icon: 'mdi-web', active: false},
        {url: 'youtube', icon: 'mdi-youtube', active: false},
      ],
    }
  },
  methods: {
    
  },
  computed: {
    
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
  cursor: pointer
  &_selector
    top: 200px
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
  &:hover ~ &_selector
    position: relative
    top: -200px
    pointer-events: none
    height: 100%
    background-color: rgba(0, 0, 0, 0.1)
    transition: all ease 0.5s

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