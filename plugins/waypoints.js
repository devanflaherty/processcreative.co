import Vue from 'vue'
if (process.browser) {
  require('waypoints/lib/noframework.waypoints.js')
  require('waypoints/lib/shortcuts/inview.js')
}

var VueWaypoint = {
  install: function install (Vue) {
    Vue.directive('waypoint', {
      inserted: function (el, binding, vnode) {
        var waypointType = 'waypoint'

        // Allows us to emit to the directive component
        var emit = (vnode, name, data) => {
          var handlers = (vnode.data && vnode.data.on) ||
            (vnode.componentOptions && vnode.componentOptions.listeners)

          if (handlers && handlers[name]) {
            handlers[name].fns(data)
          }
        }

        var options = binding.value || {}

        if (binding.modifiers) {
          if (binding.modifiers.inview) {
            waypointType = 'inview'
          }
          if (binding.modifiers.once) {
            options.destroy = true
          }
          if (binding.modifiers.down) {
            options.direction = 'down'
          }
          if (binding.modifiers.up) {
            options.direction = 'up'
          }
        }

        if (binding.value) {
          if (binding.value.offset) {
            options.offset = binding.value.offset
          } else {
            options.offset = 0
          }
        }

        if (waypointType === 'waypoint') {
          newWaypoint(el, emit, vnode, options)
        } else {
          newInview(el, emit, vnode, options)
        }
      }
    })
  }
}

/* eslint-disable */
const newWaypoint = (el, emit, vnode, options) => {
  var waypoint = new Waypoint({
    element: el,
    handler: function (direction) {
      console.log(el)
      console.log(direction)
      if (options.direction && options.direction == direction) {
        emit(vnode, 'collision', {el: el, direction: direction})        
      } else if (!options.direction) {
        emit(vnode, 'collision', {el: el, direction: direction})
      }
      if (options.destroy) {
        this.destroy()
      }
    },
    offset: options.offset
  })

  return waypoint
}

const newInview = (el, emit, vnode, options) => {
  var inview = new Waypoint.Inview({
    element: el,
    enter: function(direction) {
      console.log('inview')      
      emit(vnode, 'enter' , {el: el, direction: direction})
    },
    entered: function(direction) {
      emit(vnode, 'entered' , {el: el, direction: direction})
    },
    exit: function(direction) {
      emit(vnode, 'exit' , {el: el, direction: direction})
    },
    entered: function(direction) {
      emit(vnode, 'exited' , {el: el, direction: direction})
    },
    offset: options.offset
  })

  return inview
}
Vue.use(VueWaypoint)

export default (ctx, inject) => {
  inject('waypoint', new Vue({
    methods: {
      destroyWaypoints () {
        Waypoint.destroyAll()
      }
    }
  }))
}
/* eslint-enable */
