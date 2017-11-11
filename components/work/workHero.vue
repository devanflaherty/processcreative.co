<template>
  <section class="hero work-hero is-fullheight">
    <div class="work-hero-image is-overlay" :style="`background-image: url(${entry.hero_image.url})`">
      <div class="hero-fade" :style="`box-shadow: inset 0 -80px 50px -40px ${entry.background_color}`"></div>
    </div>

    <!-- Hero content: will be in the middle -->
    <div class="hero-body">
      <div class="container">
        <h2 class="work-title">
          <strong :class="contrast">{{$prismic.asText(entry.title)}}</strong><br>
          <span>{{$prismic.asText(entry.description)}}</span>
        </h2>
      </div>
    </div>

    <!-- Hero footer: will stick at the bottom -->
    <div class="hero-foot">
    </div>
  </section>
</template>

<script>
import {TweenMax} from 'gsap'

if (process.browser) {
  var ScrollMagic = require('ScrollMagic')
  require('animation.gsap')
  // require('debug.addIndicators')
}

export default {
  props: ['entry', 'contrast'],
  mounted () {
    this.setHeroUiContrast(this.entry.hero_contrast)

    /* eslint-disable */
    var controller = new ScrollMagic.Controller()

    var slider = new ScrollMagic.Scene({
      duration: '100%',
      triggerHook: 'onEnter'
    })
      .setTween(TweenMax.to('.work-hero-image', 1, {
        autoAlpha: 0,
        y: '200px'
      }))
      // .addIndicators({name:'headline'})
      .addTo(controller)
    /* eslint-enable */
  }
}
</script>

<style lang="scss" scoped>
.hero {
  background-color: none;
}
.work-hero-image {
  background-size: cover;
  background-position: center;
  .hero-fade {
    z-index: 5;
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 25vh;
    width: 100%;
    box-shadow: inset 0 -80px 50px -40px rgba(0, 0, 0, 1)
  }
}
</style>
