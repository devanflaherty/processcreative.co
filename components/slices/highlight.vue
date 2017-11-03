<template>
  <article class="slice columns" :class="slice.slice_type">
    <template v-if="highlight.highlight_placement == 'Right'">
      <div class="column">
        <div v-html="$prismic.asHtml(highlight.highlight_body)"></div>
      </div>

      <div class="column">
        <img :src="highlight.highlight_thumbnail.url">
        <div v-html="$prismic.asHtml(highlight.highlight_caption)"></div>
      </div>
    </template>
    <template v-else>
      <div class="column">
        {{highlight}}
        <img :src="highlight.highlight_thumbnail.url">
        <div v-html="$prismic.asHtml(highlight.highlight_caption)"></div>
      </div>
      <div class="column">
        <div v-html="$prismic.asHtml(highlight.highlight_body)"></div>
      </div>
    </template>
  </article>
</template>

<script>
export default {
  props: ['slice'],
  data () {
    return {
      highlight: this.slice.primary
    }
  }
}
</script>