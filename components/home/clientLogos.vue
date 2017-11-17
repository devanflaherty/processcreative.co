<template>
<section id="clientLogos" class="section">
  <div class="container">
    <div class="columns is-mobile is-multiline is-centered">
      <div ref="logo" class="client-logo column is-4-tablet is-5-mobile"
        v-for="(item, index) in logos" :key="index" >
        <div class="logo-pad">
          <img :src="item.logo.url" :style="`height:${getHeight(item)}px`">
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
export default {
  props: ['logos'],
  methods: {
    getHeight (item) {
      if (item.height) {
        return item.height
      } else {
        return item.logo.dimensions.height
      }
    }
  },
  mounted () {
    this.$reveal('.client-logo', {duration: 1500}, 150)
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/mixins';
#clientLogos {
  padding-top: 260px;
}
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

