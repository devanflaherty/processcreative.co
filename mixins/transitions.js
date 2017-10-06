const transitions = {
  methods: {
    staggerBeforeEnter (el) {
      TweenMax.set(el, {
        autoAlpha: 0,
        y: 100
      })
    },
    staggerEnter (el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        TweenMax.to(el, 1, {
          autoAlpha: 1,
          y: 0,
          ease: Back.easeOut
        })
        done()
      }, delay)
    },
    staggerLeave (el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        TweenMax.to(el, 1, {
          autoAlpha: 0,
          y: 100,
          ease: Back.easeIn
        })
        done()
      }, delay)
    }
  }
}

export default transitions
