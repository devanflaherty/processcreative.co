<template>
  <section :data-wio-id="document.id">
    <h1>Hello</h1>
    <h2 style="color:white">Title:{{entry.title[0].text}}</h2>
    <div style="color:white">
      <span>Description:</span>
      <div v-html="$prismic.asHtml(entry.description)"></div>
    </div>
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
    <section>
      <component v-for="(slice, index) in entry.slices" :key="index" 
        :slice="slice" :is="toCamelCase(slice.slice_type)"></component>

      <!-- <article v-for="(slice, index) in entry.slices" :key="index">
        <h2>{{toCamelCase(slice.slice_type)}}</h2>
      </article>  -->
    </section>
  </section>
</template>

<script>
export default {
  asyncData ({ app, params }) {
    return app.$prismic.initApi().then((ctx) => {
      return ctx.api.getByUID('work', params.slug).then((res) => {
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
  beforeMount () {
  },
  mounted () {
    this.$prismic.initApi().then((api) => {
      api.toolbar()
    })
    // console.log(this.entry)
  }
}
</script>

<style lang="scss" scoped>

</style>
