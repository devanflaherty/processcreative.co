<template>
  <section id="featuredWork" class="page section push-top" v-show="!loading">
    <div class="container">
      <div class="work-welcome page-welcome columns">
        <div class="column">
          <div class="opening-headline has-text-black" 
            v-html="$prismic.asHtml(workPage.opening_headline)"
            v-scroll-reveal="{scale: 1, distance: '100px', origin: 'left'}"></div>
        </div>
        <div class="column">
          <div class="opening-statement" 
            v-html="$prismic.asHtml(workPage.opening_statement)"
            v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'bottom'}"></div>
        </div>
      </div>
      <workCard v-for="(post, index) in workPosts" :key="index" :post="post"/>
    </div>
  </section>
</template>

<script>
import {beforeEnter, enter, leave} from '~/mixins/page-transitions'

export default {
  async asyncData ({ params, app, store }) {
    let [workPosts, workPage] = await Promise.all([
      app.$prismic.initApi().then((ctx) => {
        return ctx.api.query(
          app.$prismic.predicates.at('document.type', 'work_posts')
        )
      }), app.$prismic.initApi().then((ctx) => {
        return ctx.api.getByUID('pages', 'work')
      })
    ])
    return {
      workPosts: workPosts.results,
      workPage: workPage.data
    }
  },
  transition: {
    name: 'page',
    mode: 'out-in',
    css: false,
    beforeEnter,
    enter,
    leave
  },
  created () {
    this.$store.dispatch('toggleLoading', true)
  },
  beforeMount () {
    this.$store.dispatch('setBackgroundColor', this.workPage.background_color)
  },
  mounted () {
    if (this.workPosts) {
      this.$store.dispatch('toggleLoading', false)
      this.setPageStyle(this.workPage.primary_color, this.workPage.background_color, this.workPage.page_contrast)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
