<template>
<div class="image-wrap" :style="padding">
  <transition name="fade-in">
    <img v-if="loaded" :src="image.url" :alt="image.alt">
  </transition>
</div>
</template>

<script>
export default {
  props: ['image'],
  data () {
    return {
      loaded: false
    }
  },
  computed: {
    padding () {
      let h = this.image.height
      let w = this.image.width

      let aspect = (h / w) * 100
      return `padding-top: ${aspect}%`
    }
  },
  mounted () {
    if (this.image) {
      let img = new Image()
      img.onload = () => {
        this.loaded = true
      }
      img.src = this.img.url
    }
  }
}
</script>

<style lang="scss" scoped>
.imageWrap {
  height: 0;
}
</style>
