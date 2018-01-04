<template>
<div @mouseleave="hover('leave')" @mouseover="hover('enter')" class="processLogo" :class="status">

<svg viewBox="0 0 309 425" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <path ref="stroke" id="stroke" d="M115.850512,387.631559 C78.1956608,373.915508 43.3478988,345.907505 42.9959,289.2047 M218.4205,42.3136 C206.3085,39.2846 192.2635,37.5226 175.9355,37.5226 C175.9355,37.5226 61.7965,32.5406 61.7965,123.6906 C61.7965,172.0496 98.2105,191.1896 135.0855,202.0406 C147.0875,205.5726 159.1395,208.2306 170.0005,210.7256 C181.0235,213.2586 192.7315,215.3876 204.4895,217.7386 C254.5535,227.7486 305.5155,241.8056 308.3235,308.4176 C311.7335,389.3106 208.8135,400.0836 208.8135,400.0836 C208.8135,400.0836 160.3695,403.8486 115.8505,387.6316 L115.850512,387.631559 M293.4935,134.6504 C293.4935,134.6504 296.5615,61.8554 218.4205,42.3134"></path>
      <path d="M218.4205,42.3136 C206.3085,39.2846 192.2635,37.5226 175.9355,37.5226 C175.9355,37.5226 61.7965,32.5406 61.7965,123.6906 C61.7965,172.0496 98.2105,191.1896 135.0855,202.0406 C147.0875,205.5726 159.1395,208.2306 170.0005,210.7256 C181.0235,213.2586 192.7315,215.3876 204.4895,217.7386 C254.5535,227.7486 305.5155,241.8056 308.3235,308.4176 C311.7335,389.3106 208.8135,400.0836 208.8135,400.0836 C208.8135,400.0836 160.3695,403.8486 115.8505,387.6316 C109.3479,400.0967 102.9149,412.4247 96.6339,424.4647 C80.7749,418.9617 66.4139,411.5517 53.5899,402.1937 C36.9969,390.1007 23.8249,374.6787 14.0739,355.9437 C4.3119,337.2107 -0.3701,314.9637 0.0229,289.2047 L42.9959,289.2047 C43.3478988,345.907506 78.1956617,373.915508 115.850514,387.631559 C121.130513,377.511574 126.456507,367.303587 131.7885,357.0836 C136.3505,359.0736 141.2045,360.7536 146.3825,362.0916 C157.6965,365.0196 169.4055,366.4816 181.5085,366.4816 C189.7045,366.4816 198.4865,365.8056 207.8515,364.4336 C217.2195,363.0706 226.0015,360.4356 234.1985,356.5296 C242.3935,352.6326 249.2175,347.2636 254.6875,340.4306 C260.1485,333.6056 262.8835,324.9166 262.8835,314.3786 C262.8835,303.0636 259.2705,293.8886 252.0535,286.8626 C244.8265,279.8376 235.3675,273.9826 223.6585,269.3006 C211.9875,264.6306 198.7575,260.5446 183.9845,257.0396 C183.9395,257.0286 183.8955,257.0176 183.8495,257.0066 C169.0125,253.4926 153.9925,249.5956 138.7705,245.2966 C131.0425,243.3676 123.4115,241.2196 115.8775,238.8566 C108.1865,236.4466 100.5955,233.8136 93.1075,230.9546 C78.2695,225.3006 65.0055,217.9826 53.2965,209.0006 C41.5895,200.0256 32.1215,188.8026 24.9035,175.3376 C17.6775,161.8726 14.0735,145.5806 14.0735,126.4536 C14.0735,104.9936 18.6555,86.3516 27.8305,70.5446 C36.9975,54.7376 48.9985,41.5656 63.8355,31.0266 C78.6625,20.4896 95.4485,12.6876 114.1815,7.6096 C132.9155,2.5416 151.6515,-0.0004 170.3855,-0.0004 C192.2385,-0.0004 213.2115,2.4406 233.3185,7.3166 C234.3165,7.5596 235.2835,7.8436 236.2695,8.1016 C230.882526,18.4285506 224.855558,29.9784896 218.420592,42.3134231 C212.9615,52.7764 207.2075,63.8044 201.2715,75.1824 C209.3495,77.1924 216.6175,80.2264 223.0745,84.3014 C230.4835,88.9864 236.4375,95.4254 240.9305,103.6214 C245.2115,111.4494 247.7865,121.2644 248.6955,133.0084 C248.7385,133.5594 248.7975,134.0904 248.8325,134.6504 L293.4935,134.6504 C293.4935,134.6504 296.561496,61.8554903 218.420645,42.3134364 L218.4205,42.3136 Z" id="key"></path>

      <clipPath id="clip">
        <use xlink:href="#key"/>
      </clipPath>
    </defs>
  <router-link to="/" class="logo-link" :class="{'ready': ready}, status">
    <g id="samson-mark">
      <use fill="none" :stroke="primaryColor" xlink:href="#stroke" id="character" ref="character" stroke-width="160" clip-path="url(#clip)"/>
      <use fill="none" :stroke="primaryColor" xlink:href="#stroke" id="characterHover" ref="characterHover" stroke-width="160" clip-path="url(#clip)"/>
    </g>
  </router-link>
</svg>


</div>
</template>

<script>
import {mapGetters} from 'vuex'
import {TimelineMax, TweenMax, Expo} from 'gsap'

export default {
  props: ['color', 'size', 'animate'],
  computed: {
    ...mapGetters(['mobileNav', 'breakpoint'])
  },
  data () {
    return {
      ready: false,
      status: null
    }
  },
  watch: {
    status (s) {
      let sH = document.getElementById('characterHover')
      let stroke = document.getElementById('stroke')
      var pathLength = stroke.getTotalLength()

      if (s === 'enter') {
        TweenMax
          .to(sH, 0.5, {
            stroke: this.backgroundColor,
            strokeDashoffset: 0,
            ease: Expo.easeIn
          })
      } else {
        TweenMax.killTweensOf(s)
        TweenMax
          .to(sH, 0.66, {
            strokeDashoffset: pathLength,
            ease: Expo.easeOut
          })
      }
    }
  },
  methods: {
    hover (status) {
      this.status = status
    },
    animateIn () {
      let logoAnimation = new TimelineMax()
      let s = document.getElementById('character')
      let sH = document.getElementById('characterHover')
      let stroke = document.getElementById('stroke')
      var pathLength = stroke.getTotalLength()

      logoAnimation
        .set(s, {
          stroke: this.primaryColor,
          strokeWidth: 160,
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength
        })
        .set(sH, {
          stroke: this.primaryColor,
          strokeWidth: 160,
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength
        })
        .to(s, 2, {
          strokeDashoffset: 0,
          onComplete: this.onReady
        }, 1)
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
  display: inline-block;
  .logo-link {
    color: none!important;
  }
  svg {
    position: absolute;
    top: 0;
    left: 0;
    transition: fill 0.5s ease;
    g.logoFill.is-mobile {
      fill: black!important;
    }
    g.logoFill {
      fill: white;
      transition: fill 0.5s ease;
    }
  }
  svg a {
    display: block;
    text-decoration: none;
    .slash {
      animation: process 2s ease infinite;
    }
  }
  &.ready:not(:hover) svg .slash {
    animation: process 2s ease;
  }
}

// @keyframes process {
//   0% {
//     transform: translate(0px, 0);
//   }
//   50% {
//     transform: translate(100px, 0);
//   }
//   100% {
//     transform: translate(0px, 0);
//   }
// }
// @keyframes reset {
//   0% {
//   }
//   50% {
//     transform: translate(100px, 0);
//   }
//   100% {
//     transform: translate(0, 0);
//   }

  // 100% {
  //   fill: yellow!important;
  // }
// }
</style>
