<template>
<article class="slice banner-slice hero is-primary">
  <blurLoader :image="banner.image_banner" />
  <div class="hero-overlay is-overlay">
    <div class="container">
      <h1 class="title has-text-white" v-if="banner.title_of_banner.length > 0">
        {{$prismic.asText(banner.title_of_banner)}}
      </h1>
      <div class="rich-text" v-html="$prismic.asHtml(banner.description)" v-if="banner.description.length > 0"></div>
      <a class="button" :href="$prismic.asLink(banner.button_link)" v-if="banner.button_link.length > 0">{{$prismic.asText(banner.button_label)}}</a>
    </div>
  </div>
</article>
</template>

<script>
export default {
  props: ['slice'],
  data () {
    return {
      banner: this.slice.primary
    }
  }
}
</script>

<style lang="scss" scoped>
.banner-slice {
  img {
    width: 100%;
  }
}
.banner-slice {
  position: relative;
  .hero-overlay {
    display: flex;
    align-items: center;
  }
}

</style>

