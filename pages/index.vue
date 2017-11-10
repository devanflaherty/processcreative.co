<template>
  <section id="home" class="page" :data-wio-id="document.id" v-show="!loading">
    
    <heroSlider :gallery="home.hero_slider" />
    <section id="welcome" class="opening section">
      <div class="container"
      v-scroll-reveal.reset="{duration: 1000}">
        <div class="columns">
          <div class="column is-4">
            <div class="opening-headline" v-html="$prismic.asHtml(home.opening_headline)"></div>
          </div>
          <div class="column">
            <div class="opening-statement has-text-white" v-html="$prismic.asHtml(home.opening_statement)"></div>
            <h4 class="is-size-4 list-headline">Capabilities</h4>
            <div class="column-list" v-html="$prismic.asHtml(home.capabilities)"></div>
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

export default {
  components: {
    heroSlider
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
    leave
  },
  created () {
    this.$store.dispatch('toggleLoading', true)
  },
  mounted () {
    if (document) {
      this.$store.dispatch('toggleLoading', false)

      this.$prismic.initApi().then((ctx) => {
        ctx.toolbar()
      })
    }
  },
  beforeDestroy () {
    // this.$waypoint.destroyWaypoints()
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/mixins';
#home {
  background: $black;
}
#welcome {
  .opening-headline {
    color: white;
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
