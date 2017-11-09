import {TimelineMax, Back} from 'gsap'

export const beforeEnter = function (el, done) {
  var beforeEnter = new TimelineMax()
  beforeEnter.set(el, {
    autoAlpha: 0,
    x: -200
  })
}

export const enter = function (el, done) {
  var enter = new TimelineMax()
  enter.to(el, 1, {
    autoAlpha: 1,
    x: 0
  })

  if (el.querySelector('#slider')) {
    enter.fromTo(el.querySelector('#slider'), 1, {
      autoAlpha: 0,
      css: {
      }
    }, {
      autoAlpha: 1
    }, 0)
  }

  enter.addCallback(() => {
    done()
  })
}

export const leave = function (el, done) {
  console.log('leave')
  var leave = new TimelineMax()

  if (el.querySelector('.stagger')) {
    console.log('stagger')
    var stagger = new TimelineMax()
    stagger.staggerTo('.stagger', 0.5, {
      autoAlpha: 0,
      x: 100,
      ease: Back.easeIn
    }, 0.125)

    leave.add(stagger)
  }
  leave.to(el, 0.5, {
    autoAlpha: 0,
    x: 200
  }, 0.5)

  // leave.to(window, 0.1, { scrollTo: 0 })
  leave.addCallback(() => {
    window.scrollTo(0, 0)
  })
  leave.addCallback(() => {
    done()
  })
}
