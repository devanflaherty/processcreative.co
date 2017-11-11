import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      primaryColor: '#000',
      loading: true,
      mobileNav: false,
      breakpoint: 0,
      navigationMenu: null,
      connectMenu: null,
      contact: {
        newBusiness: null,
        general: null
      },
      teamSlugs: null
    },
    getters: {
      primaryColor: state => {
        return state.primaryColor
      },
      loading: state => {
        return state.loading
      },
      mobileNav: state => {
        return state.mobileNav
      },
      breakpoint: state => {
        return state.breakpoint
      },
      navigationMenu: state => {
        return state.navigationMenu
      },
      connectMenu: state => {
        return state.connectMenu
      },
      contact: state => {
        return state.contact
      },
      teamSlugs: state => {
        return state.teamSlugs
      }
    },
    mutations: {
      SET_PRIMARY_COLOR (state, color) {
        state.primaryColor = color
      },
      TOGGLE_LOADING (state, bool) {
        state.loading = bool
      },
      TOGGLE_MOBILE_NAV (state, bool) {
        state.mobileNav = bool
      },
      CHANGE_BREAKPOINT (state, bp) {
        state.breakpoint = bp
      },
      SET_NAVIGATION_MENU (state, menu) {
        state.navigationMenu = menu
      },
      SET_CONNECT_MENU (state, menu) {
        state.connectMenu = menu
      },
      SET_CONTACT (state, obj) {
        state.contact = obj
      },
      SET_TEAM_SLUGS (state, array) {
        state.teamSlugs = array
      }
    },
    actions: {
      setPrimaryColor (context, color) {
        context.commit('SET_PRIMARY_COLOR', color)
      },
      toggleLoading (context, bool) {
        context.commit('TOGGLE_LOADING', bool)
      },
      toggleMobileNav (context, bool) {
        context.commit('TOGGLE_MOBILE_NAV', bool)
      },
      changeBreakpoint (context, bp) {
        context.commit('CHANGE_BREAKPOINT', bp)
      },
      async getMenus (context) {
        this.$prismic.initApi().then((ctx) => {
          ctx.api.getSingle('menu').then((res) => {
            context.commit('SET_NAVIGATION_MENU', res.data.navigation_menu)
            context.commit('SET_CONNECT_MENU', res.data.connect_menu)

            const contact = {
              newBusiness: res.data.new_business,
              general: res.data.general
            }
            context.commit('SET_CONTACT', contact)
          })
        })
      },
      getTeamSlugs (context, slugs) {
        context.commit('SET_TEAM_SLUGS', slugs)
      }
    }
  })
}

export default createStore
