import Vue from 'vue'
var sr = require('scrollreveal')()

var ScrollReveal = {
  install: function install (Vue) {
    Vue.prototype.$reveal = function (el, options, int) {
      return sr.reveal(el, options, int)
    }
    Vue.directive('scroll-reveal', {
      inserted: function inserted (el, binding) {
        var options = binding.value || {}

        if (binding.modifiers) {
          if (binding.modifiers.reset) {
            options.reset = true
          }

          if (binding.modifiers.nomobile) {
            options.mobile = false
          }
        }

        if (binding.value) {
          if (binding.value.origin) {
            options.origin = binding.value.origin
          }

          if (binding.value.distance) {
            options.distance = binding.value.distance
          }

          if (binding.value.duration) {
            options.duration = binding.value.duration
          }

          if (binding.value.opacity) {
            options.opacity = binding.value.opacity
          }

          if (binding.value.scale) {
            options.scale = binding.value.scale
          }
        }

        sr.reveal(el, options)
      }
    })
  }
}

Vue.use(ScrollReveal)
