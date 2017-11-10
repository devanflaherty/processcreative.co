<template>
  <section :data-wio-id="document.id" id="workPage" class="page" v-show="!loading">
    <WorkHero :entry="entry" 
      v-scroll-reveal="{duration: 2000, scale: 0.9, distance: '0'}"/>

    <section class="section">
      <div class="container">
        <responsiveVideo class="stagger" :embed="entry.highlight_video.html" 
          v-scroll-reveal="{duration: 1000, scale: 0.9, distance: '200px'}"/>
      </div>
    </section>
    
    <section id="workContent" class="opening section">
      <div class="container">
        <div class="columns opener stagger">
          <div class="column is-4">
            <div class="opening-headline" :class="{'has-text-white': entry.page_contrast == 'Light', 'has-text-black': entry.page_contrast == 'Dark'}" 
              v-html="$prismic.asHtml(entry.opening_headline)"
              v-scroll-reveal="{scale: 1, distance: '100px', origin: 'left'}"></div>
          </div>
          <div class="column">
            <div class="opening-statement" 
              v-html="$prismic.asHtml(entry.opening_statement)"
              v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'top'}"></div>
            <h4 class="is-size-4 list-headline" v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'top', delay: 100}">Involvement</h4>
            <div class="work-types column-list" v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'top', delay: 200}">{{entry.involvement}}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Repeatable Slices -->
    <component class="stagger" v-for="(slice, index) in entry.slices" :key="index" 
      :slice="slice" :is="toCamelCase(slice.slice_type)"></component>

  </section>
</template>

<script>
import WorkHero from '~/components/work/workHero'

export default {
  components: {
    WorkHero
  },
  asyncData ({ app, params, store }) {
    return app.$prismic.initApi().then((ctx) => {
      return ctx.api.getByUID('work_posts', params.slug).then((res) => {
        return {
          document: res,
          entry: res.data
        }
      })
    })
  },
  created () {
    this.$store.dispatch('toggleLoading', true)
  },
  mounted () {
    if (this.document) {
      this.$store.dispatch('toggleLoading', false)

      this.$prismic.initApi().then((api) => {
        api.toolbar()
      })

      this.$store.dispatch('setPrimaryColor', this.entry.primary_color)
      this.updateBg(this.entry.background_color, '#workPage')
      this.setPageContrast(this.entry.page_contrast, '#workPage')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
