<template>
  <section class="slice text-slice section">
    <div class="container">
      <div class="text" v-html="$prismic.asHtml(slice.primary.text)"></div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['slice']
}
</script>
