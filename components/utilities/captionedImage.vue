<template>
  <div class="captioned-image">
    <div class="image-caption is-overlay">
      <div class="caption-content" v-html="$prismic.asHtml(caption)"></div>
    </div>
    <img :src="img.url" :alt="img.alt">
  </div>
</template>

<script>
export default {
  props: ['img', 'caption']
}
</script>

<style lang="scss">
.captioned-image {
  position: relative;
  overflow: hidden;
  img {
    display: block;
  }
  .image-caption {
    background: rgba(black, 0.8);
    padding: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    visibility: hidden;
    opacity: 0;
    transition: all 0.5s ease;
    * > {
      flex: 1 0 auto;
    }
    .caption-content {
      p {
        color: white;
      }
    }
  }
  &:hover {
    .image-caption {
      visibility: visible;
      opacity: 1;
    }
  }
}
</style>

