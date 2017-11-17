<template>
  <section id="home" class="page" :data-wio-id="document.id" v-show="!loading">
    
    <heroSlider :gallery="home.hero_slider" />
    <section id="welcome" class="padding-large opening section">
      <div class="container">
        <div class="columns">
          <div class="column is-4">
            <h3 class="opening-headline has-text-white"
              v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'left'}">
              {{$prismic.asText(home.opening_headline)}}
            </h3>
          </div>
          <div class="column">
            <div class="opening-statement has-text-white" 
              v-html="$prismic.asHtml(home.opening_statement)"
              v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'top', delay: 100}"></div>

            <h3 class="list-headline"
              v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'top', delay: 200}">
              Capabilities
            </h3>
            <div class="column-list" v-html="$prismic.asHtml(home.capabilities)"
              v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'top', delay: 300}"></div>
            <div class="statement" v-html="$prismic.asHtml(home.closing_statement)"
              v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'top', delay: 400}"></div>
            <a name="toWhite" v-waypoint.up.inview="{offset: 0}"
              @enter="setBg('#000')"></a>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="featuredWork">
      <div class="container">
        <div class="work-welcome columns">
          <div class="column">
            <h3 class="opening-headline has-text-black" 
              v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'left'}">
              {{$prismic.asText(home.work_headline)}}
            </h3>
          </div>
          <div class="column">
            <div class="work-statement" 
              v-html="$prismic.asHtml(home.work_statement)"
              v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'top', delay: 200}"></div>
            <a name="toWhite" v-waypoint.down.inview="{offset: 0}"
              @enter="setBg('#fff')"></a>
          </div>
        </div>
        <workCard v-for="(post, index) in home.featured_work" :key="index" :post="post.work_post"/>
        <a name="toWhite" v-waypoint.up.inview="{offset: 0}"
              @enter="setBg('#fff')"></a>
      </div>
    </section>

    <clientLogos :logos="home.clients" />
  </section>
</template>

<script>
import heroSlider from '~/components/home/heroSlider'
import clientLogos from '~/components/home/clientLogos'
import {beforeEnter, enter} from '~/mixins/page-transitions'
import {TimelineMax} from 'gsap'

export default {
  components: {
    heroSlider,
    clientLogos
  },
  asyncData ({ params, app, store }) {
    return app.$prismic.initApi().then((ctx) => {
      return ctx.api.getSingle('home', {'fetchLinks': 'work_posts.title, work_posts.feature_image, work_posts.involvement, work_posts.description, work_posts.primary_color'}).then((res) => {
        return {
          document: res,
          home: res.data
        }
      })
    }).catch((err) => {
      console.log(err)
    })
  },
  head () {
    return {
      title: 'Home'
    }
  },
  transition: {
    name: 'home',
    mode: 'out-in',
    css: false,
    beforeEnter,
    enter,
    leave: (el, done) => {
      let leave = new TimelineMax()

      leave.to(el, 0.5, {
        autoAlpha: 0
      }, 0.25)

      // leave.to(window, 0.1, { scrollTo: 0 })
      leave.addCallback(() => {
        window.scrollTo(0, 0)
      })
      leave.addCallback(() => {
        done()
      })
    }
  },
  created () {
    this.$store.dispatch('toggleLoading', true)
  },
  beforeMount () {
    this.$store.dispatch('setBackgroundColor', '#000')
  },
  mounted () {
    if (this.document) {
      this.$store.dispatch('toggleLoading', false)

      this.$prismic.initApi().then((ctx) => {
        ctx.toolbar()
      })
    }
  },
  beforeDestroy () {
    this.$waypoint.destroyWaypoints()
    this.setBg(null, '.main')
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/mixins';
#welcome {
  min-height: 100%;
  padding-top: 300px;
  padding-bottom: 300px;
}
#featuredWork {
  padding-top: 300px;
  padding-bottom: 300px;
  position: relative;
  .work-welcome {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
}

#clients {
  padding: 8rem 0 2rem;
  h2 {
    margin-bottom: 3.5rem;
  }
}
</style>
