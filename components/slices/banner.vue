<template>
<section class="slice banner-slice hero is-primary">
  <img :src="slice.primary.image_banner.url">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
        Medium title
      </h1>
      <h2 class="subtitle">
        Medium subtitle
      </h2>
    </div>
  </div>
</section>
</template>

<script>
export default {
  props: ['slice']
}
</script>

<style lang="scss" scoped>
.banner-slice {
  img {
    width: 100%;
  }
}
</style>

