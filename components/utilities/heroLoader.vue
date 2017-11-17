<template>
<div class="is-overlay hero-image" :class="{'work-hero-image': $route.name == 'work-slug'}">
  <transition name='fade-in'>
    <div v-if="loaded" class="master-image is-overlay" :class="{'loaded': loaded}"
      :style="`background-image: url(${hero})`">
    </div>
  </transition>
  <transition name='fade-in'>
    <div v-if="thumbLoaded" class="placeholder-thumb is-overlay" 
      :style="`background-image: url(${hero})`">
    </div>
  </transition>
  {{$route.name}}

  <transition name='fade-in' v-if="$route.name == 'work-slug'">
    <div v-if="loaded || thumbLoaded" class="hero-fade" :style="`box-shadow: inset 0 -80px 50px -40px ${backgroundColor}`"></div>
  </transition>
</div>
</template>

<script>
export default {
  props: ['hero-image'],
  data () {
    return {
      hero: null,
      thumbLoaded: false,
      loaded: false
    }
  },
  mounted () {
    if (this.heroImage.placeholder) {
      let thumb = new Image()
      thumb.onload = () => {
        this.thumbLoaded = true
        this.hero = thumb.src
      }
      thumb.src = this.heroImage.placeholder.url
    }

    let imgMain = new Image()
    imgMain.onload = () => {
      this.thumbLoaded = false
      this.loaded = true
      this.hero = imgMain.src
    }
    imgMain.src = this.heroImage.large.url
  }
}
</script>

<style lang="scss" scoped>
.hero-fade {
  z-index: 5;
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 25vh;
  width: 100%;
  box-shadow: inset 0 -80px 50px -40px rgba(0, 0, 0, 1);
}

.master-image {
  background-size: cover;
  background-position: center;
}
.placeholder-thumb {
  filter: blur(50px);
  background-position: center;
  background-size: cover;
  transform: scale(1.2)
}
</style>
