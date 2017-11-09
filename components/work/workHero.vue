<template>
  <section class="hero is-fullheight" :style="`background-color: ${entry.primary_color}`">
    <div class="work-hero-image is-overlay" :style="`background-image: url(${entry.hero_image.url})`"></div>
    <div class="hero-fade" :style="`box-shadow: inset 0 -80px 50px -40px ${entry.background_color}`"></div>
    
    <!-- Hero head: will stick at the top -->
    <div class="hero-head">
    </div>

    <!-- Hero content: will be in the middle -->
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title" v-html="$prismic.asText(entry.title)"></h1>
        <h2 class="subtitle" v-html="$prismic.asText(entry.description)"></h2>
      </div>
    </div>

    <!-- Hero footer: will stick at the bottom -->
    <div class="hero-foot">
    </div>
  </section>
</template>

<script>
export default {
  props: ['entry'],
  mounted () {
    this.setHeroUiContrast(this.entry.hero_contrast)
  }
}
</script>

<style lang="scss" scoped>
.hero {
  .hero-fade {
    z-index: 5;
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 25vh;
    width: 100%;
    box-shadow: inset 0 -80px 50px -40px rgba(0, 0, 0, 1)
  }
}
.work-hero-image {
  background-size: cover;
  background-position: center;
}
</style>
