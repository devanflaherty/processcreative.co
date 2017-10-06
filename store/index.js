import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      mobileNav: false,
      breakpoint: 0
    },
    getters: {
      mobileNav: state => {
        return state.mobileNav
      },
      breakpoint: state => {
        return state.breakpoint
      }
    },
    mutations: {
      TOGGLE_MOBILE_NAV (state, bool) {
        state.mobileNav = bool
      },
      CHANGE_BREAKPOINT (state, bp) {
        state.breakpoint = bp
      }
    },
    actions: {
      toggleMobileNav (context, bool) {
        context.commit('TOGGLE_MOBILE_NAV', bool)
      },
      changeBreakpoint (context, bp) {
        context.commit('CHANGE_BREAKPOINT', bp)
      }
    }
  })
}

export default createStore
