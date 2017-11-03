<template>
  <div>
    <nuxt-link :to="`/work/${post.uid}`">
      <span v-html="$prismic.asHtml(entry.title)"></span>
    </nuxt-link>
    <img :src="entry.feature_image.url">
    <div style="color:white">
      <span>Involvement:</span>
      <div style="white-space: pre-wrap; column-count:2;" v-html="toNewLines(entry.involvement)"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['post'],
  data () {
    return {
      entry: this.post.data
    }
  },
  methods: {
    toNewLines (str) {
      return str.split('\n').join('<br>')
    }
  }
}
</script>