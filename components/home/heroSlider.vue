<template>
<transition name="photo-wipe" appear>
  <section id="heroSlider" class="hero is-fullheight is-paddingless">
    <div class="mask"></div>
    <div class="hero-body is-paddingless">
        
      <div id="slider" class="swiper-container" ref="mySwiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" :class="`slide-ui-${slide.contrast}`" v-for="(slide, index) in gallery" :key="index">
            
            <div class="slide-caption is-overlay">
              <div class="container">
                <div class="caption" 
                  data-swiper-parallax="-300" 
                  data-swiper-parallax-duration="500"
                  data-swiper-parallax-opacity="0.5" v-html="$prismic.asHtml(slide.slide_description)"></div>
              </div>
            </div>

            <div
                data-swiper-parallax
                data-swiper-parallax-duration="500"
                data-swiper-parallax-scale="1.2" class="slide-img" :style="`background-image: url(${slide.slide_image.url})`"></div>
          </div>
        </div>

        <SliderUi 
            ref="pagination" 
            :tabs="gallery" 
            :slideUi="slideUi" 
            :activeSlide="activeSlide" 
            @slideToEmit="slideTo"
            @pauseSliderEmit="pauseSlider()"
            @playSliderEmit="playSlider()"
            />
      </div>
      <!-- close swiper -->
    </div>
  </section>
</transition>
</template>

<script>
// import {TimelineMax, TweenMax, Power4} from 'gsap'
import SliderUi from '~/components/slices/imageGallery/_sliderUi'
import heroTransitions from './_transitions'

export default {
  components: {
    SliderUi
  },
  props: ['gallery', 'ready'],
  mixins: [heroTransitions],
  data () {
    return {
      activeSlide: 0,
      slideUi: 'Light',
      swiperOption: {
        speed: 1000,
        initialSlide: 0,
        loop: true,
        slidesPerView: 1,
        observer: true,
        lazyLoading: true,
        parallax: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        on: {
          slideChange: (swiper) => {
            this.activeSlide = this.$refs.mySwiper.swiper.realIndex
          }
        }
      }
    }
  },
  watch: {
    activeSlide (index) {
      var contrast = this.gallery[index].contrast
      this.slideUi = contrast
    },
    slideUi (style, previousStyle) {
      this.setHeroUiContrast(style, previousStyle)
    }
  },
  methods: {
    slideTo (index) {
      var i = index + 1
      this.$refs.mySwiper.swiper.slideTo(i)
    },
    pauseSlider () {
      this.$refs.mySwiper.swiper.autoplay.stop()
    },
    playSlider () {
      this.$refs.mySwiper.swiper.autoplay.start()
    },
    initSwiper () {
      // if (this.ready) {
      this.$swiper('#slider', this.swiperOption)
      this.$refs.mySwiper.swiper.on('progress', () => {
        var swiper = this.$refs.mySwiper.swiper
        var imgs = document.querySelectorAll('.slide-img')
        var slides = document.querySelectorAll('.swiper-slide')
        slides.forEach((slide, i) => {
          var img = imgs[i]
          var x = (slide.offsetLeft + swiper.translate) * -1 / 3
          img.style.transform = 'translateX(' + x + 'px)'
        })
      })
      this.setHeroUiContrast(this.slideUi)
      // }
    }
  },
  created () {
    this.slideUi = this.gallery[0].contrast
  },
  mounted () {
    this.initSwiper()
  },
  beforeDestroy () {
    this.$refs.mySwiper.swiper.destroy()
  }
}
</script>

<style lang="scss">
@import '~swiper/dist/css/swiper.css';
@import '~bulma/bulma';

#heroSlider {
  position: relative;
  overflow: hidden;
}
#slider {
  position: relative;
  width: 100%;
  &::after {
    content:'';
    z-index: 15;
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 25vh;
    width: 100%;
    box-shadow: inset 0 -80px 50px -40px rgba(0, 0, 0, 1)
  }
  .slide-caption {
    z-index: 5;
    display: flex;
    align-items: center;
    padding: 2rem 3rem;
    color: black;
    line-height: 1;
    p {
      font-size: 1.25rem;
      margin-bottom: 0;
    }
    .caption {
      transition: all 0.5s ease;
    }
  }
}

.swiper-container, .swiper-slide {
  height: 105vh;
}
.swiper-container {
  display: flex;
  .swiper-wrapper {
    // position: fixed;
    .swiper-slide {
      flex: 1 0 100%;
      position: relative;
      overflow: hidden;
      .container {
        @include touch () {
          margin: 0;
        }
      }

      .slide-img {
        height: 105vh;
        width: 100%;
        background-size: cover!important;
        background-position: center;
      }
    }
  }
}

.swiper-arrow {
  background: none;
  color: white;
  font-size: 5rem;
  height: auto;
  transform: scale(0.8);
  transform-orgin: center;
  transition: all 0.5s ease;
  &:hover {
    color: white;
    transform: scale(1);
  }
}

.slide-ui {
  height: 100%;
  width: 100%;
  top: 0; left: 0;
  position: absolute;
  .container {
    height: 100%;
    @include touch() {
      margin: 0 3rem;
    }
  }
}
.swiper-custom-pagination {
  z-index: 15;
  position: absolute;
  width: 100%;
  bottom: 100px;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  .pagination-bullet {
    opacity: 1;
    flex: 1 0 auto;
    display: inline-block;
    position: relative;
    margin: 0 2px;
    padding-bottom: .75rem;
    span {
      display: inline-block;
      color: rgba(white, 0.25);
      transition: all 0.5s ease;
    }
    &:hover span {
      color: rgba(white, 1);
      transform: translate(0, -20px);
    }
    &::after, &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      display: block;
      height: 1px;
    }
    &::after {
      width: 0;
      background: rgba(white, 1);
      transition: width .25s ease;
    }
    &::before {
      width: 100%;
      background: rgba(white, 0.25);
    }
    &.active {
      span {
        color: white;
      }
      &::after {
        width: 100%;
        transition: width 6s ease;
      }
    }
  }
}


// Color themes
.slide-ui-Dark {
  .caption {
    h2, h3, h4, h5 {
      color: black;
    }
    p, a, span {
      color: black;
    }
  }
  .pagination-bullet {
    span {
      color: rgba(black, 0.5);
    }
    &:hover span, &.active span {
      color: rgba(black, 1);
    }
    &::after {
      background: rgba(black, 1);
    }
    &::before {
      background: rgba(black, 0.25);
    }
  }
}

.slide-ui-Light {
  .caption {
    h2, h3, h4, h5 {
      color: white;
    }
    p, a, span {
      color: white;
    }
  }
  .pagination-bullet {
    span {
      color: rgba(white, 0.5);
    }
    &:hover span, &.active span {
      color: rgba(white, 1);
    }
    &::after {
      background: rgba(white, 1);
    }
    &::before {
      background: rgba(white, 0.25);
    }
    &.active {
      color: white;
    }
  }
}

@keyframes progress {
  0% {
    width: 0
  }
  100% {
    width: 100%;
  }
}
</style>
