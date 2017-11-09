<template>
<transition name="fade-in">
  <div class="responsiveWrap" v-show="videoReady">
    <div 
      ref="videoWrap"
      class="responsive-video"
      :style="`padding: ${padding}% 0 0 0`"
      v-html="embed">
    </div>
  </div>
</transition>
</template>

<script>
export default {
  props: ['embed'],
  data () {
    return {
      videoReady: false,
      videoWidth: 16,
      videoHeight: 9
    }
  },
  computed: {
    padding () {
      var pad = (this.videoHeight / this.videoWidth) * 100
      return pad
    }
  },
  mounted () {
    var wrap = this.$refs.videoWrap
    var iframe = wrap.querySelector('iframe')

    this.videoHeight = iframe.clientHeight
    this.videoWidth = iframe.clientWidth
    this.videoReady = true
  }
}
</script>

<style lang="scss">
.responsive-video {
  padding: 56.25% 0 0 0;
  position: relative;
  > * {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
}
</style>
