import Vue from 'vue'
import {mapGetters} from 'vuex'
// import {TweenMax} from 'gsap'
// require('ScrollToPlugin')

Vue.mixin({
  computed: {
    ...mapGetters(['primaryColor', 'loading'])
  },
  methods: {
    setPageStyle (primary, background, contrast, el) {
      this.setBg(background)
      this.setPageContrast(contrast)
      this.setPrimaryColor(primary)
    },
    setBg (color) {
      let el = document.querySelector('body')

      if (color) {
        el.style.backgroundColor = color
      }
    },
    setPrimaryColor (primary) {
      this.$store.dispatch('setPrimaryColor', primary)
    },
    setPageContrast (style, el) {
      if (el) {
        el = document.querySelector(el)
      } else {
        el = document.querySelector('body')
      }
      el.classList.remove('contrast-Dark', 'contrast-Light')
      el.classList.add(`contrast-${style}`)
    },
    setHeroUiContrast (style, previousStyle) {
      var body = document.querySelector('body')
      if (style) {
        if (previousStyle && previousStyle !== style) {
          body.classList.remove(`contrast-${previousStyle}`)
          body.classList.add(`contrast-${style}`)
        } else if (!previousStyle) {
          if (!body.classList.contains(`contrast-${style}`)) {
            if (style === 'Dark') {
              body.classList.remove(`contrast-Light`)
            } else if (style === 'Light') {
              body.classList.remove(`contrast-Dark`)
            }
            body.classList.add(`contrast-${style}`)
          }
        }
      } else {
        body.classList.remove('contrast-Dark', 'contrast-Light')
      }
    },
    toCamelCase (str) {
      return this._.camelCase(str)
    },
    toNewLines (str) {
      return str.split('\n').join('<br>')
    },
    getPosition (el) {
      let xPos = 0
      let yPos = 0
      while (el) {
        if (el.tagName === 'body') {
          // deal with browser quirks with body/window/document and page scroll
          let xScroll = el.scrollLeft || document.documentElement.scrollLeft
          let yScroll = el.scrollTop || document.documentElement.scrollTop
          xPos += (el.offsetLeft - xScroll + el.clientLeft)
          yPos += (el.offsetTop - yScroll + el.clientTop)
        } else {
          // for all other non-BODY elements
          xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft)
          yPos += (el.offsetTop - el.scrollTop + el.clientTop)
        }
        el = el.offsetParent
      }
      return {
        x: xPos,
        y: yPos
      }
    }
  }
  // scrollTo (el, obj) {
  //   // this.$ss().to(el)
  //   TweenMax.to(window, 1, {
  //     scrollTo: el
  //   })
  // }
  // beforeDestroy () {
  //   var body = document.querySelector('body')
  //   body.style.backgroundColor = null
  // }
})
