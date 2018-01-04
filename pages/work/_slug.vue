<template>
  <section 
    :data-wio-id="document.id" 
    id="workPage" 
    class="page" 
    :class="contrast"
    v-show="!loading">
    <WorkHero :entry="entry"
      v-scroll-reveal="{duration: 2000, scale: 0.9, distance: '0'}"/>

    <section class="section" v-if="entry.highlight_video.html">
      <div class="container stagger">
        <responsiveVideo :embed="entry.highlight_video.html" 
          v-scroll-reveal="{duration: 1000, scale: 0.9, distance: '200px'}"/>
      </div>
    </section>
    
    <section id="workContent" class="opening section">
      <div class="container">
        <div class="columns opener">
          <div class="column is-4">
            <div class="opening-headline" :class="contrast" 
              v-html="$prismic.asHtml(entry.opening_headline)"
              v-scroll-reveal="{scale: 1, distance: '100px', origin: 'left'}"></div>
          </div>
          <div class="column">
            <div class="opening-statement rich-text"
              :class="contrast"
              v-html="$prismic.asHtml(entry.opening_statement)"
              v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'bottom'}"></div>
            <h3 class="list-headline" v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'bottom', delay: 100}">Involvement</h3>
            <p class="work-types column-list" v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'bottom', delay: 200}">{{entry.involvement}}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Repeatable Slices -->
    <component v-for="(slice, index) in entry.slices" :key="index" 
      :slice="slice"  :is="toCamelCase(slice.slice_type)"></component>

  </section>
</template>

<script>
import { beforeEnter, enter, leave } from '~/mixins/page-transitions'
import WorkHero from '~/components/work/workHero'

export default {
  components: {
    WorkHero
  },
  transition: {
    name: 'page',
    mode: 'out-in',
    css: false,
    beforeEnter,
    enter,
    leave
  },
  asyncData ({ app, params, store }) {
    return app.$prismic.initApi().then(ctx => {
      return ctx.api.getByUID('work_posts', params.slug).then(res => {
        return {
          document: res,
          entry: res.data
        }
      })
    })
  },
  computed: {
    contrast () {
      return {
        'has-text-black': this.entry.page_contrast === 'Dark',
        'has-text-white': this.entry.page_contrast === 'Light'
      }
    }
  },
  created () {
    this.$store.dispatch('toggleLoading', true)
  },
  beforeMount () {
    this.$store.dispatch('setBackgroundColor', this.entry.background_color)
  },
  mounted () {
    if (this.document) {
      console.log(this.document)
      this.$store.dispatch('toggleLoading', false)
      this.setPageStyle(
        this.entry.primary_color,
        this.entry.background_color,
        this.entry.page_contrast
      )

      this.$prismic.initApi().then(api => {
        api.toolbar()
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
