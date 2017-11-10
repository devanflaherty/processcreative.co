<template>
  <section id="featuredWork" class="page section push-top" v-show="!loading">
    <div class="container">
      <div class="work-welcome columns">
        <div class="column">
          <div class="opening-headline has-text-black" 
            v-html="$prismic.asHtml(workPage.opening_headline)"
            v-scroll-reveal="{scale: 1, distance: '100px', origin: 'left'}"></div>
        </div>
        <div class="column">
          <div class="opening-statement" 
            v-html="$prismic.asHtml(workPage.opening_statement)"
            v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'top'}"></div>
        </div>
      </div>
      <workCard v-for="(post, index) in workPosts" :key="index" :post="post"/>
    </div>
  </section>
</template>

<script>
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
  created () {
    this.$store.dispatch('toggleLoading', true)
    this.$store.dispatch('setPrimaryColor', '#000000')
  },
  mounted () {
    if (this.workPosts) {
      this.$store.dispatch('toggleLoading', false)
    }
    console.log(this.workPage)
  }
}
</script>

<style lang="scss" scoped>
.push-top {
  margin-top: 148px;
}
.work-welcome {
  padding-top: 6rem;
  padding-bottom: 8rem;
}
</style>
