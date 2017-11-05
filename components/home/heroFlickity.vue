<template>
<section id="heroSlider" class="hero is-fullheight is-paddingless"
  v-waypoint.down="{offset: '-50%'}"
  @collision="scrollTo('#welcome')">
  <div class="hero-body is-paddingless">

    <Flickity ref="flickity" id="flick" :options="sliderOptions">
      <div class="flick-slide slide-style" :class="`slide-ui-${slide.contrast}`" v-for="(slide, index) in gallery" :key="index">
        <div class="slide-caption is-overlay">
          <div class="container">
            <div class="caption" 
                v-html="$prismic.asHtml(slide.slide_description)"></div>
          </div>
        </div>

        <div
            class="slide-img" :style="`background-image: url(${slide.slide_image.url})`" >
        </div>
      </div>

      <div class="slide-ui" ref="slideUi">
        <div class="container">
          <div ref="pagination" class="swiper-custom-pagination" :class="`slide-ui-${slideUi}`">
            <a :class="{'active': activeSlide == index}" class="pagination-bullet" @click="slideTo(index)" :href="`#${index}`" v-for="(slide, index) in gallery" :key="index">
              {{slide.slide_title}}<br>
              {{slide.slide_caption}}
            </a>
          </div>
        </div>
      </div>
    </Flickity>

  </div>
</section>
</template>

<script>
// import {TimelineMax, TweenMax, Power4} from 'gsap'
import heroTransitions from './_transitions'

export default {
  props: ['gallery'],
  mixins: [heroTransitions],
  data () {
    return {
      activeSlide: 0,
      slideUi: 'Light',
      sliderOptions: {
        cellSelector: '.flick-slide',
        initialIndex: 0,
        setGallerySize: false,
        resize: true,
        draggable: true,
        wrapAround: true,
        autoPlay: 5000,
        pauseAutoPlayOnHover: false,
        // selectedAttraction: 0.01,
        // friction: 0.15,
        prevNextButtons: false,
        pageDots: false
        // on: {
        //   reachEnd: function () {
        //   },
        //   slideChange: (swiper) => {
        //     // this.activeSlide = this.$refs.mySwiper.swiper.realIndex
        //   }
        // }
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
      this.$refs.flickity.selectCell(index)
    },
    setHeroUiContrast (style, previousStyle) {
      var body = document.querySelector('body')
      if (previousStyle) {
        body.classList.remove(`hero-ui-${previousStyle}`)
      }
      body.classList.add(`hero-ui-${style}`)
    }
  },
  created () {
    this.slideUi = this.gallery[0].contrast
  },
  mounted () {
    this.setHeroUiContrast(this.slideUi)

    this.$refs.flickity.on('select', () => {
      this.activeSlide = this.$refs.flickity.selectedIndex()
    })

    var flkty = this.$refs.flickity.data('flickity')
    var imgs = document.querySelectorAll('.slide-img')
    this.$refs.flickity.on('scroll', function (event, progress) {
      flkty.slides.forEach(function (slide, i) {
        var img = imgs[i]
        var x = (slide.target + flkty.x) * -1 / 2
        console.log(slide.target + flkty.x)
        console.log(x)
        img.style.transform = 'translateX(' + x + 'px)'
      })
    })
  }
}
</script>

<style lang="scss">
// @import '~swiper/dist/css/swiper.css';
@import '~bulma/bulma';

#heroSlider {
  position: relative;
  overflow: hidden;
}
#flick {
  position: relative;
  width: 100%;
  &::after {
    content: '';
    display: block;
    position: absolute;
    z-index: 15;
    left: 0;
    width: 100%;
    height: 100%;
    bottom: -100vh;
    background: black;
    transition: all 1s ease;
  }
  &.wipe {
    &::after {
      bottom: 0;
    }
  }
  &::before {
    content: '';
    display: block;
    position: absolute;
    z-index: 10;
    left: 0; bottom: 0;
    width: 100%;
    height: 25%;
    box-shadow: inset 0px -160px 80px -85px rgba(black, 1);
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

.flickity-slider {
  height: 105vh;
  width: 100%;
}

.flickity-slider {
  // position: fixed;
  // display: flex;
  .slide-style {
    width: 100%;
    height: 100%;
    // flex: 1 0 100%;
    // position: relative;
    overflow: hidden;
    .container {
      @include touch () {
        margin: 0;
      }
    }

    .slide-img {
      height: 100vh;
      width: 100%;
      background-size: cover!important;
      background-position: center;
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
    color: rgba(white, 0.25);
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
      color: white;
      &::after {
        width: 100%;
        transition: width 5s ease;
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
    color: rgba(black, 0.25);
    &::after {
      background: rgba(black, 1);
    }
    &::before {
      background: rgba(black, 0.25);
    }
    &.active {
      color: black;
      &::after {
        width: 100%;
        transition: width 5s ease;
      }
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
    color: rgba(white, 0.25);
    &::after {
      background: rgba(white, 1);
    }
    &::before {
      background: rgba(white, 0.25);
    }
    &.active {
      color: white;
      &::after {
        width: 100%;
        transition: width 5s ease;
      }
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
