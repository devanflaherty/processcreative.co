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

        sr.reveal(el, options)
      }
    })
  }
}

Vue.use(ScrollReveal)
