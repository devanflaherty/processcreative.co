<template>
<article ref="feature">
  <transition name="slide-up">
    <div class="columns is-centered flex">
      <template v-if="alignment === 'left'">
        <div class="column flex-center is-half is-order-2-touch">
          <div class="content-cell has-text-right">
            <slot name="content">
              <h3 class="has-text-right">Don Julio</h3>
              <p class="has-text-right">We combine creativity, design and story into impacting products, content and strategies. Wheter that something is a single video or a year long strategy.</p>
            </slot>
          </div>
        </div>
      </template>
      
      <div class="column is-half is-order-1-touch">
        <div class="video-player">
          <WistiaVideo :aspect-ratio="'56.25'" :video-id="videoId" />
        </div>
      </div>

      <template v-if="alignment === 'right'">
        <div class="column flex-center is-half is-order-2-touch">
          <div class="content-cell">
            <slot name="content">
              <h3>Don Julio</h3>
              <p>We combine creativity, design and story into impacting products, content and strategies. Wheter that something is a single video or a year long strategy.</p>
            </slot>
          </div>
        </div>
      </template>
    </div>
  </transition>
</article>
</template>

<script>
import WistiaVideo from '~/components/utilities/WistiaVideo'

export default {
  props: ['contentAligned', 'origin', 'videoId'],
  components: {
    WistiaVideo
  },
  data () {
    return {
      reveal: false
    }
  },
  computed: {
    alignment () {
      if (!this.contentAligned) {
        return 'left'
      } else {
        return this.contentAligned
      }
    }
  },
  methods: {
    revealUp () {
      this.reveal = true
    }
  },
  mounted () {
    this.$reveal(this.$refs.feature, {delay: '100', reset: true})
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/mixins';
article {
  @include mobile() {
    margin-left: -1.5rem;
    margin-right: -1.5rem;
  }
}
.flex-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.content-cell {
  padding: 0 4rem;
  @include touch() {
    padding: 2rem;
    text-align: left!important;
  }
}
</style>

