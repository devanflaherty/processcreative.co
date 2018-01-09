<template>
  <section 
    :data-wio-id="document.id" 
    id="page" 
    class="page section push-top" 
    :class="contrast"
    v-show="!loading">

    <div class="container page-wrap">
      <div class="page-welcome columns">
        <div class="column">
          <div class="opening-headline"
            v-html="$prismic.asHtml(page.opening_headline)"
            v-scroll-reveal="{scale: 1, distance: '100px', origin: 'left'}"></div>
        </div>
        <div class="column">
          <div class="opening-statement rich-text"
            v-html="$prismic.asHtml(page.opening_statement)"
            v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'bottom'}"></div>
        </div>
      </div>
    </div>
    
    <!-- Repeatable Slices -->
    <component v-for="(slice, index) in page.slices" :key="index" 
      :slice="slice"  :is="toCamelCase(slice.slice_type)"></component>
    
  </section>
</template>

<script>
import {beforeEnter, enter, leave} from '~/mixins/page-transitions'

export default {
  name: 'page',
  transition: {
    name: 'page',
    mode: 'out-in',
    css: false,
    beforeEnter,
    enter,
    leave
  },
  head () {
    return {
      title: this.$prismic.asText(this.page.title)
    }
  },
  asyncData ({ app, params, error }) {
    return app.$prismic.initApi().then((ctx) => {
      return ctx.api.getByUID('pages', params.page).then((res) => {
        return {
          document: res,
          page: res.data
        }
      })
    }).catch(err => {
      console.error(err)
      if (err) {
        error({statusCode: 404, message: 'The page you are looking for does not exist.'})
      }
    })
  },
  computed: {
    contrast () {
      return {
        'has-text-black': this.page.page_contrast === 'Dark',
        'has-text-white': this.page.page_contrast === 'Light'
      }
    }
  },
  created () {
    this.$store.dispatch('toggleLoading', true)
  },
  beforeMount () {
    this.$store.dispatch('setBackgroundColor', this.page.background_color)
  },
  mounted () {
    if (this.document) {
      this.$store.dispatch('toggleNavVis', true)
      this.$store.dispatch('toggleLoading', false)
      this.setPageStyle(this.page.primary_color, this.page.page_contrast)

      this.$prismic.initApi().then(api => {
        api.toolbar()
      })
    }
  }
}
</script>

<style scoped>
.title
{
  margin-top: 30px;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.button
{
  margin-top: 30px;
}
</style>
