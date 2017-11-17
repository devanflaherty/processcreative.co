<template>
  <nav class="navbar is-transparent">
    <style>
      .navbar-item:after {
        background: {{primaryColor}}!important;
      }
      .nav-burg span {
        background: {{primaryColor}}!important;
      }
    </style>
    <transition name="nav-in" appear>
      <div class="navbar-brand" v-if="navVis">
        <div class="navbar-item" >
          <Logo :color="primaryColor" :animate="navVis"/>
        </div>
        <div class="nav-burg" :class="{'is-active': mobileNav}" @click="showMobileNav">
          <span :style="`background-color: ${primaryColor}`"></span>
          <span :style="`background-color: ${primaryColor}`"></span>
        </div>
      </div>
    </transition>
    <transition name="nav-in" appear>
      <div id="navMenu" class="navbar-menu" v-if="breakpoint >= 3 && navVis">
        <transition name="fade-in" appear>
          <div class="navbar-end" v-if="mobileNav || breakpoint > 2">
            <nuxt-link class="navbar-item" :to="$prismic.asLink(link.link_url)" v-for="(link, index) in navigationMenu" :key="index">
              {{link.link_label}}
            </nuxt-link>
          </div>
        </transition>
      </div>
    </transition>

    <MobileNav :menu="navigationMenu" :mobileNav="mobileNav"/>

    <!-- <Modal @changeModalVis="toggleModal" :modalVisible="modal">
      <div slot="body">
        <p class="is-size-4 is-size-6-mobile">Thank you for your patience as we are currently updating our site with new work and new agency capabilities.</p>
        <br>
        <p class="is-size-4 is-size-6-mobile"><strong>Our new site is set to launch November 1st, 2017.</strong></p>
        <br>
        <p class="is-size-4 is-size-6-mobile">If you aren’t able to find what you are looking for below please reach out to us at newbusiness@processcreative.co with any questions that you might have.</p>
      </div>
    </Modal> -->
  </nav>
</transition>
</template>

<script>
import Logo from '~/components/Logo'
import Modal from '~/components/Modal'
import MobileNav from '~/components/MobileNav'

import { mapGetters } from 'vuex'

export default {
  components: {
    Logo,
    Modal,
    MobileNav
  },
  data () {
    return {
      logoColor: '#000000',
      modal: false
    }
  },
  computed: {
    ...mapGetters(['mobileNav', 'navigationMenu', 'breakpoint'])
  },
  watch: {
    mobileNav (bool) {
      if (bool) {
        this.disableScroll(true)
      } else {
        this.disableScroll(false)
        this.modal = false
      }
    },
    modal (m) {
      if (m === true) {
        this.logoColor = '#000000'
      } else {
        this.logoColor = '#ffffff'
      }
    },
    breakpoint (newV, oldV) {
      if (newV > oldV && oldV < 3) {
        this.$store.dispatch('toggleMobileNav', false)
        this.disableScroll(false)
      }
    }
  },
  methods: {
    showMobileNav () {
      this.$store.dispatch('toggleMobileNav', !this.mobileNav)
    },
    toggleModal (m) {
      if (m) {
        this.disableScroll(true)
        this.modal = m
      } else {
        this.disableScroll(false)
        this.modal = !this.modal
      }
    },
    disableScroll (bool) {
      if (bool) {
        document.getElementsByTagName('html')[0].style.overflow = 'hidden'
        document.getElementsByTagName('body')[0].style.overflow = 'hidden'
      } else {
        document.getElementsByTagName('html')[0].style.overflow = null
        document.getElementsByTagName('body')[0].style.overflow = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/mixins';

body.hero-ui-Dark {
  .navbar .navbar-menu .navbar-item a {
    color: black!important
  }
}
body.hero-ui-Dark {
  .navbar .navbar-menu .navbar-item a {
    color: white!important
  }
}
.navbar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: transparent;
  padding: 3rem 4rem;
  @include mobile() {
    padding: 1rem;
  }
  .navbar-brand {
    position: relative;
    z-index: 100;
    justify-content: space-between;
    align-items: center;

    .navbar-burger {
      transition: all 0.5s ease;
      background: none;
      position: relative;
      z-index: 10;
      &.is-active span {
        background: black;
      }
    }
  }
  .navbar-menu {
    z-index: 90;
    padding-left: 0;
    padding-right: 0;
    .navbar-end {
      align-items: center;
    }
    .navbar-item {
      color: $black;
      font-size: 1rem;
      position: relative;
      padding-left: 0;
      padding-right: 0;
      margin: 0 2rem; 
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        display: block;
        height: 2px;
        background: transparent;
        width: 0;
        transition: all 0.5s ease;
      }
      &:hover {
        &:after {
          background: $grey-light;
          width: 100%;
        }
      }
    }
  }
}

.nav-burg {
  color: $white;
  padding: 4px;
  height: 8px;
  width: 2rem;
  position: relative;
  z-index: 100;
  float: right;
  flex: 0 1 auto;
  cursor: pointer;
  transition: all 0.5s ease;
  @include desktop() {
    display: none;
  }
  &:hover {
    background: none;
  }
  span {
    cursor: pointer;
    position: absolute;
    display: block;
    content: '';
    transition: background-color .5s ease, top .5s .5s cubic-bezier(.75,0,.50, 1.5), transform .5s cubic-bezier(.75,0,.50, 1.5);

    border-radius: 6px;
    height: 2px;
    width: 1.5rem;
    background: $black;
  }
  span:nth-child(1) {
    top: 0;
  }
  span:nth-child(2) {
    top: 100%;
  }
  &.is-active span {
    top: 50%;
    transform-origin: center center;
    background: $black!important;
    transition: background-color .5s ease, top .5s cubic-bezier(.75,0,.50, 1.5), transform .5s .5s cubic-bezier(.75,0,.50, 1.5);
  }
  &.is-active span:nth-child(1) {
    transform: rotate(-45deg);
  }
  &.is-active span:nth-child(2) {
    transform: rotate(45deg);
  }
}

.nav-in-enter-active, .nav-in-leave-active {
  transition: all 0.5s cubic-bezier(.48, 0, .12, 1);
}
.nav-in-enter, .nav-in-leave-to {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}
</style>
