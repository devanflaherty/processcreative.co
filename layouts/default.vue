<template>
  <main class="main">
    <SiteNav />
    <nuxt />
    <div id="loader" class="is-flex">
      <h1>Loading</h1>
    </div>
    <SiteFooter />
  </main>
</template>

<script>
import SiteNav from '~/components/SiteNav'
import SiteFooter from '~/components/SiteFooter'

import breakpoints from '~/mixins/breakpoints'

export default {
  components: {
    SiteNav,
    SiteFooter
  },
  mixins: [breakpoints],
  created () {
    this.$store.dispatch('getMenus')
  }
}
</script>

<style lang="scss">
.wio-link {
  position: absolute;
  z-index: 50;
  left: 0;
  top: 0;
  background: rgba(white, 0.8);
  padding: .75rem 1rem;
  transition: all 0.5s ease;
  &:hover {
    background: white;
  }
}

#loader {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0; top: 0;
  visibility: hidden;
  opacity: 0;
  h1 {
    color: black;
    font-weight: 800;
    font-size: 44px;
  }
}
</style>
