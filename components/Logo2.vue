<template>
<div class="navbar-item" >
  <router-link to="/" id="processLogo" >
    <svg id="logo" viewBox="0 0 625 550" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="fill" transform="translate(1.000000, 0.000000)" fill="#000000">
                <path d="M-1,0 L624,0 L624,550 L-1,550 L-1,0 Z M117.2207,130.5187 L19.9997,371.8097 L117.2577,371.8097 L214.4727,130.5187 L117.2207,130.5187 Z M433.1976,34.0077 L433.1976,33.9997 L311.6666,33.9997 L214.4566,33.9997 L214.4196,130.5187 L311.6716,130.5187 L433.1976,130.5187 C473.4636,130.5187 506.1126,162.9267 506.1126,202.9037 C506.1126,242.8827 473.4636,275.2917 433.1976,275.2917 L311.6716,275.2917 L311.6716,130.5187 L214.4566,371.8097 L214.4566,516.5797 L311.6666,516.5797 L311.6666,371.8097 L433.1976,371.8097 C527.1586,371.8097 603.3226,296.1907 603.3226,202.9087 C603.3226,109.6267 527.1586,34.0077 433.1976,34.0077 Z" id="charachter"></path>
            </g>
        </g>
    </svg>
  </router-link>
</div>
</template>

<script>
import {TimelineMax, Back} from 'gsap'

export default {
  props: ['color', 'size'],
  computed: {
    fillColor () {
      var logoColor = '#000'
      if (this.color) {
        logoColor = this.color
      }
      return logoColor
    }
  },
  methods: {
    animateIn () {
      var fill = document.getElementById('processLogo')
      var svg = document.getElementById('logo')

      new TimelineMax()
        .set(svg, {
          scale: 1.0125
        })
        .set(fill, {
          autoAlpha: 0,
          background: 'blue'
        })
        .to(fill, 0.25, {
          autoAlpha: 1,
          background: 'blue',
          ease: Back.easeOut
        })
        .to(fill, 0.25, {
          autoAlpha: 1,
          background: 'yellow',
          ease: Back.easeOut
        })
        .to(fill, 0.25, {
          autoAlpha: 1,
          background: 'green',
          ease: Back.easeOut
        })
        .to(fill, 0.25, {
          autoAlpha: 1,
          background: 'red',
          ease: Back.easeOut
        })
        .to(fill, 0.25, {
          autoAlpha: 1,
          background: this.fillColor,
          ease: Back.easeOut
        })
    }
  },
  mounted () {
    this.animateIn()
  }
}
</script>

<style lang="scss" scoped>
#processLogo {
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
    #slash {
      transition: all 0.5s ease;
    }
  }
  &:hover {
    // fill: green!important;
    animation: process 3s ease infinite;
  }
  &:not(:hover) svg #slash {
    background: white;
  }
}

@keyframes process {
  0% {
    background: white;
  }
  50% {
    background: blue;
  }
}
</style>
