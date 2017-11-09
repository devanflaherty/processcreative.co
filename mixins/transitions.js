import {TimelineMax, Back} from 'gsap'

// if (process.browser) {
//   var ScrollMagic = require('ScrollMagic')
//   require('animation.gsap')
//   // require('debug.addIndicators')
// }

const transitions = {
  methods: {
    beforeEnter (el) {

    },
    enter (el, done) {

    }, // afterEnter (el) beforeLeave (el) 
    leave (el, done) {
      var leave = new TimelineMax()

      if (el.querySelector('.stagger')) {
        var stagger = new TimelineMax()
        stagger.staggerTo(el.querySelectorAll('.stagger'), 1, {
          autoAlpha: 0,
          x: 100,
          ease: Back.easeIn
        })

        leave.add(stagger)
      }
      done()
    } // afterLeave (el)
    // staggerBeforeEnter (el) {
    //   TweenMax.set(el, {
    //     autoAlpha: 0,
    //     y: 100
    //   })
    // },
    // staggerEnter (el, done) {
    //   var delay = el.dataset.index * 150
    //   setTimeout(function () {
    //     TweenMax.to(el, 1, {
    //       autoAlpha: 1,
    //       y: 0,
    //       ease: Back.easeOut
    //     })
    //     done()
    //   }, delay)
    // },
    // staggerLeave (el, done) {
    //   var delay = el.dataset.index * 150
    //   setTimeout(function () {
    //     TweenMax.to(el, 1, {
    //       autoAlpha: 0,
    //       y: 100,
    //       ease: Back.easeIn
    //     })
    //     done()
    //   }, delay)
    // }
  }
}

export default transitions
