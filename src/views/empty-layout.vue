<template>
  <div class="layout">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="sass" scoped>
.layout
  min-height: 100vh
  background: radial-gradient(#f4f4f2, #495464)
  display: flex
  justify-content: center
  align-items: center
  @media screen and (max-width: 400px) 
    background: white
</style>