<template>
  <article class="work-card" :class="{'reveal' : reveal}" 
    v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'bottom'}"
    @beforeReveal="wipe"
    :data-wio-id="post.id">
    <!-- Wipe transition -->
    <div class="wipe" :style="`background-color: ${entry.primary_color}`"></div>
    
    <nuxt-link :to="`/work/${post.uid}`">
      <!-- quick info overlay : reveal on hover -->
      <div class="work-quick-info is-overlay columns">
        <div class="work-quick-title column">
          <h2 class="quick-title">
            {{entry.title[0].text}}
            <span>{{entry.description[0].text}}</span>
          </h2>
        </div>

        <div class="work-quick-involvement column">
          <h4>Involvement</h4>
          <div class="quick-involvement" v-html="toNewLines(entry.involvement)"></div>
        </div>
      </div>

      <div class="image-loader" ref="imageLoader">
        <div class="slice-wrap" v-for="(slice, i) in 3" :key="i">
          <div class="image-slice" :style="`background-image: url(${entry.feature_image.url})`"></div>
        </div>
      </div>
      <img :src="entry.feature_image.url" style="visibility: hidden; opacity: 0;">
    </nuxt-link>
  </article>
</template>

<script>
import {TimelineMax} from 'gsap'
export default {
  props: ['post'],
  data () {
    return {
      reveal: false,
      entry: this.post.data
    }
  },
  watch: {
    reveal () {
      this.animateSlices()
    }
  },
  methods: {
    toNewLines (str) {
      return str.split('\n').join('<br>')
    },
    wipe () {
      this.reveal = true
    },
    animateSlices () {
      var loader = this.$refs.imageLoader
      var slices = [...loader.childNodes]
      var imgs = slices.map((slice, i) => {
        return slice.querySelector('.image-slice')
      })
      var tl = new TimelineMax()
      tl.staggerFromTo(imgs, 0.5, {
        x: -200
      }, {
        x: 0
      }, 0.25)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/mixins';

.work-card {
  position: relative;
  margin-bottom: 1rem;
  overflow: hidden;
  @include mobile() {
    height: 75vh;
  }
  .wipe {
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: gray;

    transition: all .66s cubic-bezier(.97,0,.51,1);
  }
  a {
    display: block;
    overflow: hidden;
    .work-quick-info {
      z-index: 10;
      height: 100%;
      margin: 0;
      padding: 6rem;
      align-items: center;
      justify-content: center;

      transition: all 0.5s ease;
      @include mobile() {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .column {
          flex: 0 1 auto;
        }
      }
      @include touch() {
        padding: 3rem;
      }
      h2.quick-title {
        font-size: 1.75rem;
        color: white;
        font-weight: 300;
        transition: all 0.5s ease;
        transform: translate(-50px, 0);
        span {
          display: inline-block;
          margin-left: .5rem;
          font-weight: 200;
          color: rgba(white, 0.6);
          visibility: hidden;
          opacity: 0;
          transform: translate(-100px, 0);
          transition: all 0.5s 0.125s ease;
        }
      }
      .work-quick-involvement {
        color: white!important;
        font-weight: 300;
        font-size: 1.25rem;
        h4 {
          font-size: 1.25rem;
          font-weight: 600;
          transition: all 0.5s ease;
          visibility: hidden;
          opacity: 0;
          transform: translate(300px, 0);
        }
        .quick-involvement {
          white-space: pre-wrap; 
          column-count: 2;
          visibility: hidden;
          opacity: 0;
          transform: translate(300px, 0);
          transition: all 0.5s 0.125s ease;
        }
      }
    }
    img {
      display: block;
      transition: all 15s ease;
      @include mobile() {
        object-fit: cover;
        height: 100%;
        width: auto;
        position: absolute;
      }
    }
  }
  &:hover {
    .work-quick-info {
      background: rgba(black, 0.7);
      .quick-title {
        transform: translate(0,0);
        span {
          opacity: 1;
          visibility: visible;
          transform: translate(0, 0)
        }
      }
      .work-quick-involvement {
        h4, .quick-involvement {
          opacity: 1;
          visibility: visible;
          transform: translate(0,0);
        }
      }
    }
    img {
      transform: scale(1.3);
    }
  }
  &.reveal {
    .wipe {
      left: 100%;
    }
  }

  .image-loader {
    display: flex;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    .slice-wrap {
      flex: 1 0 auto;
      overflow: hidden;
      position: relative;
      .image-slice {
        position: absolute;
        top: 0;
        height: 100%;
        width: 300%;
        background-size: cover;
        background-position: center;
      }
      &:nth-child(1) .image-slice {
        left: 0;
      }
      &:nth-child(2) .image-slice {
        left: -100%;
      }
      &:nth-child(3) .image-slice {
        left: -200%;
      }
    }
  }
}
</style>
