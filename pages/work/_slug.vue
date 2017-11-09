<template>
  <section :data-wio-id="document.id" id="workPage">
    <WorkHero :entry="entry"/>

    <section id="workContent">
      <div class="container">
        <responsiveVideo class="stagger" :embed="entry.highlight_video.html" />
        
        <div class="columns stagger">
          <div class="column is-4">
            <div class="opening-headline" v-html="$prismic.asHtml(entry.opening_headline)"></div>
          </div>
          <div class="column">
            <div class="statement has-text-white" v-html="$prismic.asHtml(entry.opening_statement)"></div>
            <h4>Involvement</h4>
            <div class="capabilities">{{entry.involvement}}</div>
          </div>
        </div>
      </div>
    </section>

    <div style="color:white">
      <span>Feature Image:</span>
      <img :src="entry.feature_image.url">
    </div>
    <div style="color:white">
      <span>Highlight Video:</span>
      <div v-html="entry.highlight_video.html"></div>
    </div>
    <div style="color:white">
      <span>Project Headline:</span>
      <div v-html="$prismic.asHtml(entry.project_headline)"></div>
    </div>
    <div style="color:white">
      <span>Opening Statement:</span>
      <div v-html="$prismic.asHtml(entry.opening_statement)"></div>
    </div>
    <div style="color:white">
      <span>Primary Color:{{entry.primary_color}}</span><br>
      <span>Background Color:{{entry.background_color}}</span>
    </div>
    <div style="color:white">
      <span>Involvement:</span>
      <div style="white-space: pre-wrap; column-count:2;" v-html="toNewLines(entry.involvement)"></div>
    </div>
    <nuxt-link to="/">home</nuxt-link>
    <section>
      <component class="stagger" v-for="(slice, index) in entry.slices" :key="index" 
        :slice="slice" :is="toCamelCase(slice.slice_type)"></component>

      <!-- <article v-for="(slice, index) in entry.slices" :key="index">
        <h2>{{toCamelCase(slice.slice_type)}}</h2>
      </article>  -->
    </section>
  </section>
</template>

<script>
import WorkHero from '~/components/work/workHero'

export default {
  components: {
    WorkHero
  },
  asyncData ({ app, params }) {
    return app.$prismic.initApi().then((ctx) => {
      return ctx.api.getByUID('work_posts', params.slug).then((res) => {
        return {
          document: res,
          entry: res.data
        }
      })
    })
  },
  methods: {
    toCamelCase (str) {
      return this._.camelCase(str)
    },
    toNewLines (str) {
      return str.split('\n').join('<br>')
    }
  },
  mounted () {
    this.$prismic.initApi().then((api) => {
      api.toolbar()
    })

    this.updateBg(this.entry.background_color, '#workPage')
  }
}
</script>

<style lang="scss" scoped>
</style>
