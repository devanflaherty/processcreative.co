<template>
  <section id="page"
    v-waypoint="{offset: 0}" 
    @collision="updateBg('#000')"
    :data-wio-id="document.id">
    <section class="hero is-success is-fullheight is-paddingless">
      <div class="hero-body is-paddingless">
        <heroSlider :gallery="home.hero_slider" />
      </div>
    </section>
    
    <div id="welcome" class="container" v-scroll-reveal="{duration: 1000}">
      <div class="opening-headline" v-html="$prismic.asHtml(home.opening_headline)"></div>
      <div class="opening-statement" v-html="$prismic.asHtml(home.opening_statement)"></div>
      <div class="capabilities" v-html="$prismic.asHtml(home.capabilities)"></div>
      <div class="work-headline" v-html="$prismic.asHtml(home.work_headline)"></div>
      <div class="work-statement" v-html="$prismic.asHtml(home.work_statement)"></div>
    </div>
    <div>
      <section id="featuredWork" v-waypoint="{offset: '25%'}" @collision="updateBg('#fff')">
        <workCard v-for="(post, index) in home.featured_work" :key="index" :post="post.work_post"/>
      </section>
    </div>
  </section>
</template>

<script>
import heroSlider from '~/components/home/heroSlider'

if (process.browser) {
  require('waypoints/lib/noframework.waypoints.js')
  require('waypoints/lib/shortcuts/inview.js')
}
// import VideoFeature from '~/components/VideoFeature'
// import ClientLogos from '~/components/ClientLogos'

export default {
  components: {
    heroSlider
  },
  asyncData ({ params, app }) {
    return app.$prismic.initApi().then((ctx) => {
      return ctx.api.getSingle('home', {'fetchLinks': 'work.title, work.feature_image, work.involvement'}).then((res) => {
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
  data () {
    return {
      entry: {}
    }
  },
  mounted () {
    this.$prismic.initApi().then((ctx) => {
      ctx.toolbar()
    })
  }
}
</script>

<style scoped lang="scss">
@import '~bulma/bulma';
#welcome {
  height: calc(100vh - 196px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  @include mobile() {
    height: calc(100vh - 300px);
    margin-bottom: 4rem;
  }
}
#featured {
  h2 {
    margin-bottom: 5.5rem;
  }
}
#clients {
  padding: 8rem 0 2rem;
  h2 {
    margin-bottom: 3.5rem;
  }
}
</style>
