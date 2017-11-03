<template>
  <section class="gallery gallery-stacked columns is-multiline">
    <article class="column is-6 is-paddingless" v-for="(slide, index) in slides" :key="index">
      <img :src="slide.gallery_image.url">
      <div v-html="$prismic.asHtml(slide.image_captions)"></div>
    </article>
  </section>
</template>

<script>
export default {
  props: ['slides']
}
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  height: auto;
  display: block;
}
</style>
