import {TweenMax} from 'gsap'

if (process.browser) {
  var ScrollMagic = require('ScrollMagic')
  require('animation.gsap')
  // require('debug.addIndicators')
}

const transitions = {
  methods: {
    fadeY (el, distance) {
      return TweenMax.fromTo(el, 1,
        {
          y: 0,
          autoAlpha: 1
        },
        {
          y: distance,
          autoAlpha: 0
        }
      )
    },
    fadeOut (el) {
      return TweenMax.fromTo(el, 1,
        {
          autoAlpha: 1
          // y: 0
        },
        {
          autoAlpha: 0.3
          // y: -200
        }
      )
    }
    // sliderTween () {
    //   var tl = new TimelineMax()
    //   var slider = document.querySelector('.swiper-wrapper')
    //   return tl.add(this.scaleOut(slider))
    // }
  },
  mounted () {
    /* eslint-disable */
    var controller = new ScrollMagic.Controller()

    var ui = new ScrollMagic.Scene({
      duration: '200%',
      triggerHook: 'onEnter'
    })
      .setTween(this.fadeY(this.$refs.pagination, -250))
      // .addIndicators({name:'headline'})
      .addTo(controller)
    
    var slider = new ScrollMagic.Scene({
      duration: '100%',
      triggerHook: 'onEnter'
    })
      .setTween(this.fadeOut('.slide-img'))
      // .addIndicators({name:'headline'})
      .addTo(controller)

    // var wh = window.innerHeight / 2
    // var wipes = new ScrollMagic.Scene({
    //   offset: wh,
    // })
    //   .setClassToggle(document.querySelector('#slider'), "wipe")
    //   // .addIndicators({name:'headline'})
    //   .addTo(controller)

    /* eslint-enable */
  }
}

export default transitions
