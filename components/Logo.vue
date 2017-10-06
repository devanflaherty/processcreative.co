<template>
  <router-link to="/" class="processLogo" :class="{'ready': ready}">
    <svg viewBox="0 0 584 483" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g class="Logo" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g class="logoFill" ref="logoFill" fill="white" transform="translate(0.000000, -1.000000)" :class="{'is-mobile': mobileNav}">
                <polygon class="slash" ref="slash" points="97.2207 97.5187 -0.0003 338.8097 97.2577 338.8097 194.4727 97.5187"></polygon>
                <path d="M413.1976,1.0077 L413.1976,0.9997 L291.6666,0.9997 L194.4566,0.9997 L194.4196,97.5187 L291.6716,97.5187 L413.1976,97.5187 C453.4636,97.5187 486.1126,129.9267 486.1126,169.9037 C486.1126,209.8827 453.4636,242.2917 413.1976,242.2917 L291.6716,242.2917 L291.6716,97.5187 L194.4566,338.8097 L194.4566,483.5797 L291.6666,483.5797 L291.6666,338.8097 L413.1976,338.8097 C507.1586,338.8097 583.3226,263.1907 583.3226,169.9087 C583.3226,76.6267 507.1586,1.0077 413.1976,1.0077" 
                class="charachter"
                ref="charachter"></path>
            </g>
        </g>
    </svg>
  </router-link>
</template>

<script>
import {mapGetters} from 'vuex'
import {TimelineMax, Back} from 'gsap'
var logoAnimation = new TimelineMax()

export default {
  props: ['color', 'size', 'animate'],
  computed: {
    ...mapGetters(['mobileNav', 'breakpoint']),
    fillColor () {
      var logoColor = '#000'
      if (this.color) {
        logoColor = this.color
      }
      return logoColor
    }
  },
  data () {
    return {
      ready: false
    }
  },
  methods: {
    animateIn () {
      var filler = this.$refs.logoFill
      var slash = this.$refs.slash
      var p = this.$refs.charachter

      new TimelineMax({delay: 0.25})
        .fromTo(filler, 3, {
          fill: 'yellow'
        }, {
          fill: this.fillColor
        })

      logoAnimation
        .set(slash, {
          x: 200
        })
        .set(p, {
          autoAlpha: 0,
          x: -80
        })
        .to(slash, 0.66, {
          x: 0,
          ease: Back.easeOut
        })
        .to(p, 1, {
          autoAlpha: 1,
          x: 0,
          onComplete: this.onReady
        }, 0.5)
    },
    onReady () {
      this.ready = true
    }
  },
  mounted () {
    if (this.animate) {
      this.animateIn()
    }
  }
}
</script>


<style lang="scss" scoped>
.processLogo {
  height: 0;
  width: 100%;
  min-width: 40px;
  padding-top: 82.70%;
  position: relative;
  z-index: 100;
  svg {
    position: absolute;
    top: 0;
    left: 0;
    .slash {
      transition: all 0.5s ease;
    }
    .logoFill.is-mobile {
      fill: black!important;
    }
  }
  &:hover svg .slash {
    // fill: green!important;
    animation: process 2s ease infinite;
  }
  &.ready:not(:hover) svg .slash {
    transform: translate(0, 0);
  }
}

@keyframes process {
  0% {
    transform: translate(0px, 0);
  }
  50% {
    transform: translate(100px, 0);
    fill: green!important;
  }
}
</style>
