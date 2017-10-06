<template>
  <nav class="navbar is-transparent">
    <div class="navbar-brand">
      <div class="navbar-item" >
        <Logo :color="logoColor" :animate="true"/>
      </div>
      <div class="navbar-burger burger" :class="{'is-active': mobileNav}" @click="showMobileNav">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="navMenu" class="navbar-menu" :class="{'is-active': mobileNav}">
      <transition name="fade-in" appear>
        <div class="navbar-end" v-if="mobileNav || breakpoint > 2">
          <nuxt-link to="#featured" class="navbar-item " v-smooth-scroll="{offset: -100, duration: 1000}">
            Featured Work
          </nuxt-link>
          <a href="#contact" class="navbar-item" @click.prevent="toggleModal">
            Contact
          </a>
        </div>
      </transition>
    </div>
    <Modal @changeModalVis="toggleModal" :modalVisible="modal">
      <div slot="body">
        <p>Thank you for your patience as we are currently updating our site with new work and new agency capabilities.</p>

        <p>Our new site is set to launch November 1st, 2017.</p>

        <p>If you aren’t able to find what you are looking for below please reach out to us at newbusiness@processcreative.co with any questions that you might have.</p>
      </div>
    </Modal>
  </nav>
</template>

<script>
import {TweenMax} from 'gsap'
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
      logoColor: '#ffffff',
      modal: false
    }
  },
  computed: {
    ...mapGetters(['mobileNav', 'breakpoint'])
  },
  watch: {
    modal (m) {
      if (m === true) {
        this.logoColor = '#000000'
      } else {
        this.logoColor = '#ffffff'
      }
    }
  },
  methods: {
    showMobileNav () {
      var navmenu = document.getElementById('navMenu')
      if (TweenMax.isTweening(navmenu) === false) {
        this.$store.dispatch('toggleMobileNav', !this.mobileNav)

        if (this.mobileNav) {
          TweenMax.set(navmenu, {
            autoAlpha: 0,
            display: 'block'
          })
          TweenMax.to(navmenu, 1, {
            autoAlpha: 1
          }, 0.125)
        } else {
          this.modal = false
          TweenMax.set(navmenu, {
            display: 'block'
          })
          TweenMax.to(navmenu, 1, {
            autoAlpha: 0
          }, 0.125)
        }
      }
    },
    toggleModal (m) {
      if (m) {
        this.modal = m
      } else {
        this.modal = !this.modal
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/components/settings';
@import "~bulma/bulma";
.navbar {
  background: transparent;
  padding: 3rem 0;
  .navbar-brand {
    position: relative;
    z-index: 100;
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
    .navbar-end {
      align-items: center;
    }
    .navbar-item {
      color: $white;
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
    // For Mobile Menu
    @include touch(){
      padding-top: 200px;
      position: fixed;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba($white, 0.9);
      .navbar-item {
        color: $black;
        background: none!important;
      }
      .is-active {
        z-index: 100;
        display: none;
      }
    }
  }
}
</style>
