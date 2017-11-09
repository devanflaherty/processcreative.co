import Vue from 'vue'
import {TweenMax} from 'gsap'
require('ScrollToPlugin')

Vue.mixin({
  methods: {
    updateBg (color, el) {
      if (el) {
        el = document.querySelector(el)
      } else {
        el = document.querySelector('body')
      }
      el.style.backgroundColor = color
    },
    scrollTo (el, obj) {
      // this.$ss().to(el)
      console.log(el)
      TweenMax.to(window, 1, {
        scrollTo: el
      })
    },
    setHeroUiContrast (style, previousStyle) {
      var body = document.querySelector('body')
      if (previousStyle && previousStyle !== style) {
        body.classList.remove(`hero-ui-${previousStyle}`)
        body.classList.add(`hero-ui-${style}`)
      } else if (!previousStyle) {
        if (!body.classList.contains(`hero-ui-${style}`)) {
          if (style === 'Dark') {
            body.classList.remove(`hero-ui-Light`)
          } else if (style === 'Light') {
            body.classList.remove(`hero-ui-Dark`)
          }
          body.classList.add(`hero-ui-${style}`)
        }
      }
    }
  }
  // beforeDestroy () {
  //   var body = document.querySelector('body')
  //   body.style.backgroundColor = null
  // }
})
