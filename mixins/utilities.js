import Vue from 'vue'

Vue.mixin({
  methods: {
    updateBg (color) {
      var body = document.querySelector('body')
      body.style.backgroundColor = color
    }
  }
})
