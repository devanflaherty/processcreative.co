<template>
  <section class="slice text-slice section">
    <div class="container">
      <blockquote>
        <div class="quote" v-html="$prismic.asHtml(slice.primary.quote)"></div>
        <div class="author" v-html="$prismic.asHtml(slice.primary.name_of_the_author)"></div>
      </blockquote>
    </div>
  </section>
</template>

<script>
export default {
  props: ['slice']
}
</script>
