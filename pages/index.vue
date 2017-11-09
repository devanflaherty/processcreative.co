<template>
  <section id="page"
    :data-wio-id="document.id">
    
    <heroSlider :gallery="home.hero_slider" />
    <section id="welcome" class="section" 
      >
      <!-- v-waypoint.down="{offset: '-50%'}"
      @collision="scrollTo('#featuredWork')"-->
      <div class="container"
      v-scroll-reveal.reset="{duration: 1000}">
        <div class="columns">
          <div class="column is-4">
            <div class="opening-headline" v-html="$prismic.asHtml(home.opening_headline)"></div>
          </div>
          <div class="column">
            <div class="statement has-text-white" v-html="$prismic.asHtml(home.opening_statement)"></div>
            <h4>Capabilities</h4>
            <div class="capabilities" v-html="$prismic.asHtml(home.capabilities)"></div>
            <div class="statement" v-html="$prismic.asHtml(home.closing_statement)"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="featuredWork" style="background: white">
      <div class="container">
        <div class="work-welcome columns">
          <div class="column">
            <div class="work-headline has-text-black" v-html="$prismic.asHtml(home.work_headline)"></div>
          </div>
          <div class="column">
            <div class="work-statement" v-html="$prismic.asHtml(home.work_statement)"></div>
          </div>
        </div>
        <workCard v-for="(post, index) in home.featured_work" :key="index" :post="post.work_post"/>
      </div>
    </section>
  </section>
</template>

<script>
import heroSlider from '~/components/home/heroSlider'
import {beforeEnter, enter, leave} from '~/mixins/page-transitions'

// if (process.browser) {
//   require('waypoints/lib/noframework.waypoints.js')
//   require('waypoints/lib/shortcuts/inview.js')
// }
// import VideoFeature from '~/components/VideoFeature'
// import ClientLogos from '~/components/ClientLogos'

export default {
  components: {
    heroSlider
  },
  asyncData ({ params, app }) {
    return app.$prismic.initApi().then((ctx) => {
      return ctx.api.getSingle('home', {'fetchLinks': 'work_posts.title, work_posts.feature_image, work_posts.involvement, work_posts.description, work_posts.primary_color'}).then((res) => {
        return {
          document: res,
          home: res.data
        }
      })
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
    leave
  },
  data () {
    return {
      ready: false,
      entry: {}
    }
  },
  mounted () {
    this.ready = true
    this.$prismic.initApi().then((ctx) => {
      ctx.toolbar()
    })
  },
  beforeDestroy () {
    this.$waypoint.destroyWaypoints()
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/mixins';
#page {
  background: $black;
}
#welcome {
  padding-top: 25vh;
  padding-bottom: 25vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .opening-headline {
    font-size: 1.5rem!important;
    color: white;
  }
  .statement {
    font-size: 1.5rem!important;
    font-weight: 200;
    margin-bottom: 4rem;
  }
  h4 {
    color: #999;
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
  .capabilities {
    margin-bottom: 4rem;
    white-space: pre-wrap;
    column-count:2;
    font-size: 1.5rem!important;
    color: #666;
    font-weight: 200;
  }
}
#featuredWork {
  padding-top: 25vh;
  padding-bottom: 25vh;
  .work-welcome {
    padding-top: 4rem;
    padding-bottom: 4rem;
    .work-headline {
      font-size: 1.5rem!important;
    }
    .work-statement {
      font-size: 1.5rem!important;
      font-weight: 200;
    }
  }
}
#clients {
  padding: 8rem 0 2rem;
  h2 {
    margin-bottom: 3.5rem;
  }
}
</style>
