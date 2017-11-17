<template>
  <main class="main">
    <SiteNav />
    <nuxt />
    <SiteFooter />
  </main>
</template>

<script>

import SiteNav from '~/components/SiteNav'
import SiteFooter from '~/components/SiteFooter'

import breakpoints from '~/mixins/breakpoints'
import {beforeEnter, enter, leave} from '~/mixins/page-transitions'
import {mapGetters} from 'vuex'

export default {
  components: {
    SiteNav,
    SiteFooter
  },
  transition: {
    name: 'page',
    mode: 'out-in',
    css: false,
    beforeEnter,
    enter,
    leave
  },
  mixins: [breakpoints],
  computed: {
    ...mapGetters(['loading'])
  },
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
  background: rgba(white, 0.2);
  padding: .5rem 1rem;
  transition: all 0.5s ease;
  &:hover {
    background: white;
  }
}

#loader {
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0; top: 0;
  h1 {
    color: black;
    font-weight: 800;
    span {
      font-size: 44px!important;
      color: black;
      display: inline-block;
    }
    span:nth-child(1) {
      animation: wave-left infinite 2s;
    }
    span:nth-child(3) {
      animation: wave-right infinite 2s;
    }
  }
}
@keyframes wave-left {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-50px, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
@keyframes wave-right {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(50px, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
