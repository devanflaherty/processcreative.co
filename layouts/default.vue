<template>
  <main class="main">
    <SiteNav />
    <nuxt />
    <transition name="fade-in">
      <div id="loader" class="is-flex" v-if="loading">
        <h1>
          <span>|</span>
          <span>|</span>
          <span>|</span>
        </h1>
      </div>
    </transition>
    <SiteFooter />
  </main>
</template>

<script>
import SiteNav from '~/components/SiteNav'
import SiteFooter from '~/components/SiteFooter'

import breakpoints from '~/mixins/breakpoints'
import {mapGetters} from 'vuex'

export default {
  components: {
    SiteNav,
    SiteFooter
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
  h1 {
    color: black;
    font-weight: 800;
    font-size: 44px;
    span {
      display: inline-block;
      animation: wave infinite 2s;
    }
    span:nth-child(1) {
      animation-delay: 0;
    }
    span:nth-child(2) {
      animation-delay: .25s;
    }
    span:nth-child(3) {
      animation-delay: .5s;
    }
  }
}
@keyframes wave {
  0% {
    opacity: 0;
    transform: translate(0, -10px);
  }
  50% {
    opacity: 1;
    transform: translate(0, 10px);
  }
  100% {
    opacity: 0;
    transform: translate(0, -10px);
  }
}
</style>
