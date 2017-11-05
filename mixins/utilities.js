import Vue from 'vue'

Vue.mixin({
  methods: {
    updateBg (color, el) {
      var body = document.querySelector('body')
      body.style.backgroundColor = color
    },
    scrollTo (el, obj) {
      this.$ss().to(el)
    }
  }
})
