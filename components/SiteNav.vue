<template>
  <nav class="navbar is-transparent">
    <div class="navbar-brand">
      <div class="navbar-item" >
        <Logo :color="primaryColor" :animate="true"/>
      </div>
      <div class="nav-burg" :class="{'is-active': mobileNav}" @click="showMobileNav">
        <span :style="`background-color: ${primaryColor}`"></span>
        <span :style="`background-color: ${primaryColor}`"></span>
      </div>
    </div>

    <div id="navMenu" class="navbar-menu" v-if="breakpoint >= 3">
      <transition name="fade-in" appear>
        <div class="navbar-end" v-if="mobileNav || breakpoint > 2">
          <nuxt-link class="navbar-item" :to="$prismic.asLink(link.link_url)" v-for="(link, index) in navigationMenu" :key="index">
            {{link.link_label}}
          </nuxt-link>
        </div>
      </transition>
    </div>

    <div id="mobileNav" :class="{'is-active': mobileNav}">
      <div class="mobile-nav-wrap">
        <nuxt-link class="navbar-item" :to="$prismic.asLink(link.link_url)" v-for="(link, index) in navigationMenu" :key="index">
          {{link.link_label}}
        </nuxt-link>
      </div>
    </div>

    <Modal @changeModalVis="toggleModal" :modalVisible="modal">
      <div slot="body">
        <p class="is-size-4 is-size-6-mobile">Thank you for your patience as we are currently updating our site with new work and new agency capabilities.</p>
        <br>
        <p class="is-size-4 is-size-6-mobile"><strong>Our new site is set to launch November 1st, 2017.</strong></p>
        <br>
        <p class="is-size-4 is-size-6-mobile">If you aren’t able to find what you are looking for below please reach out to us at newbusiness@processcreative.co with any questions that you might have.</p>
      </div>
    </Modal>
  </nav>
</template>

<script>
import Logo from '~/components/Logo'
import Modal from '~/components/Modal'

import { mapGetters } from 'vuex'

export default {
  components: {
    Logo,
    Modal
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

#mobileNav {
  z-index: 10;
  display: none;
  visibility: hidden;
  @include touch(){
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .mobile-nav-wrap {
      z-index: 10;
      position: absolute;
      top: 200px; 
      left: -100%;
      margin: auto;
      width: 100%;
      height: 100%;
      padding-left: 4rem;
      padding-right: 4rem;
      @include mobile() {
        padding-left: 1rem;
        padding-right: 1rem;
      }
      .navbar-item {
        color: $black;
        background: none!important;
        &:after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          margin: 0 auto;
          display: block;
          height: 0px;
          background: transparent;
          width: 2px;
          transition: all 0.5s ease;
        }
        &:hover {
          &:after {
            height: 100%;
            background: $black;
          }
        }
      }
    }
    &::before, &::after {
      content:'';
      display: block;
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
    }
    // Transition timing Out
    .mobile-nav-wrap {
      transition: all 0.5s ease;
    }
    &::before {
      z-index: 8;
      background: white;
      transition: all 0.5s 0.25s ease;
    }
    &::after {
      z-index: 7;
      background: black;
      transition: all 0.5s 0.66s ease;
    }
    &.is-active {
      visibility: visible;
      
      .mobile-nav-wrap, &::before, &::after {
        left: 0;
      }
      // Transitions In
      &::after {
        transition: all 0.33s ease;
      }
      &::before {
        transition: all 0.33s 0.25s ease;
      }
      .mobile-nav-wrap {
        transition: all 0.33s 0.33s ease;
      }
    }
    // &:not(.is-active) {
    //   animation: reset 1s ease;
    // }
  }
}

@keyframes set {
  0% {
    border-radius: 1000px;
    width: 0;
    height: 0;
    display: none;
    opacity: 0;
  }
  100% {
    opacity: 1;
    height: 100%;
    width: 100%;
    border-radius: 0;
    display: block;
  }
}

@keyframes reset {
  0% {
    display: block;
  }
  50% {
    opacity: 0;
  }
  100% {
    display: none;
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
</style>
