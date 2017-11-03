<template>
  <div class="columns is-mobile is-multiline is-centered">
    <div ref="logo" class="client-logo column is-4-tablet is-5-mobile"
      v-for="(logo, index) in logos" :key="index" >
      <div class="logo-pad">
        <img :src="logo.src" :style="`height:${logo.height}px`">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      logos: [
        {
          src: '/images/logos/toyota.png',
          height: 60
        },
        {
          src: '/images/logos/ks.png',
          height: 76
        },
        {
          src: '/images/logos/patron.png',
          height: 66
        },
        {
          src: '/images/logos/don-julio.png',
          height: 71
        },
        {
          src: '/images/logos/subaru.png',
          height: 58
        },
        {
          src: '/images/logos/opkix.png',
          height: 35.5
        },
        {
          src: '/images/logos/nissan.png',
          height: 70
        },
        {
          src: '/images/logos/lazboy.png',
          height: 22
        },
        {
          src: '/images/logos/aaa.png',
          height: 64
        }
      ]
    }
  },
  mounted () {
    this.$reveal('.client-logo', {duration: 1500}, 150)
  }
}
</script>

<style lang="scss" scoped>
@import '~bulma/bulma';
.client-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  .logo-pad {
    padding: 35px 0;
  }
  img {
    display: block;
    max-width: none;
    @include mobile() {
      max-width: 100%;
    }
  }
}
</style>

