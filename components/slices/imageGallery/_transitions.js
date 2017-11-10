import {TweenMax} from 'gsap'

if (process.browser) {
  var ScrollMagic = require('ScrollMagic')
  require('animation.gsap')
  require('debug.addIndicators')
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
        },
        {
          autoAlpha: 0.3
        }
      )
    },
    forEach (array, callback, scope) {
      for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]) // passes back stuff we need
      }
    }
  },
  mounted () {
    /* eslint-disable */
    var controller = new ScrollMagic.Controller()

    var sliders = document.querySelectorAll('.slice-slider')

    this.forEach(sliders, (index, value) => {
      var slice = sliders[index]
      var pagination = slice.querySelector('.slider-ui')
      var slideImage = slice.querySelector('.slide-img')

      var ui = new ScrollMagic.Scene({
        duration: '200%',
        triggerElement: slice,
        triggerHook: 0.25
      })
        .setTween(
          TweenMax.fromTo('.swiper-custom-pagination', 1,
            {
              y: 0,
              autoAlpha: 1
            },
            {
              y: -250,
              autoAlpha: 0
            }
          )
        )
        // .addIndicators({name:'pagination'})
        .addTo(controller)
    })
    
    // var heroUi = new ScrollMagic.Scene({
    //   duration: '200%',
    //   triggerElement: '#slider'
    // })
    //   .setTween(this.fadeY(this.$refs.pagination, -250))
    //   .addIndicators({name:'pagination'})
    //   .addTo(controller)
    
    // var slider = new ScrollMagic.Scene({
    //   duration: '100%',
    //   triggerHook: 'onEnter'
    // })
    //   .setTween(this.fadeOut('.slide-img'))
    //   // .addIndicators({name:'headline'})
    //   .addTo(controller)

    /* eslint-enable */
  }
}

export default transitions
