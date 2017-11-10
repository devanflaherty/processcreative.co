import Vue from 'vue'
import {mapGetters} from 'vuex'
import {TweenMax} from 'gsap'
require('ScrollToPlugin')

Vue.mixin({
  computed: {
    ...mapGetters(['primaryColor', 'loading'])
  },
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
      TweenMax.to(window, 1, {
        scrollTo: el
      })
    },
    setHeroUiContrast (style, previousStyle) {
      var body = document.querySelector('body')
      if (style) {
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
      } else {
        body.classList.remove('hero-ui-Dark', 'hero-ui-Light')
      }
    },
    setPageContrast (style, el) {
      if (el) {
        el = document.querySelector(el)
      } else {
        el = document.querySelector('body')
      }
      el.classList.add(`contrast-${style}`)
    },
    toCamelCase (str) {
      return this._.camelCase(str)
    },
    toNewLines (str) {
      return str.split('\n').join('<br>')
    }
  }
  // beforeDestroy () {
  //   var body = document.querySelector('body')
  //   body.style.backgroundColor = null
  // }
})
