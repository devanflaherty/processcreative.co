<template>
  <div id="slider" v-swiper:mySwiper="swiperOption" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(slide, index) in gallery" :key="index">
        <transition name="fade-in">
          <div v-if="slide.slide_caption" class="slide-caption is-overlay">
            <div class="lower-caption">
              <div v-html="$prismic.asHtml(slide.slide_description)"></div>
              <h1>{{slide.slide_title}}</h1>
              <span class="caption">{{slide.slide_caption}}</span>
            </div>
          </div>
        </transition>
        <div class="slide-img" :style="`background-image: url(${slide.slide_image.url})`"></div>
      </div>
    </div>

    <div class="swiper-button-prev swiper-arrow"><i class="fa fa-angle-left"></i></div>
    <div class="swiper-button-next swiper-arrow"><i class="fa fa-angle-right"></i></div>
    <div ref="pagination" class="swiper-custom-pagination">
      <a :class="{'active': activeSlide == index}" class="pagination-bullet" @click="slideTo(index)" :href="`#${index}`" v-for="(slide, index) in gallery" :key="index">
        {{slide.slide_title}}<br>
        {{slide.slide_caption}}
      </a>
    </div>
  </div>
  <!-- close swiper -->
</template>

<script>
export default {
  props: ['gallery'],
  data () {
    return {
      activeSlide: 0,
      swiperOption: {
        autoplay: 5000,
        initialSlide: 0,
        loop: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        observer: true,
        lazyLoading: true,
        autoplayDisableOnInteraction: false,
        onSlideChangeEnd: swiper => {
          this.activeSlide = swiper.realIndex
          console.log('onSlideChangeEnd', this.activeSlide)
        }
      }
    }
  },
  methods: {
    slideTo (index) {
      this.mySwiper.slideTo(index)
    }
  },
  mounted () {
    this.mySwiper.on('slideChange', function () {
      console.log('hi')
    })
    // 
    // console.log(this.mySwiper.activeIndex)
  }
}
</script>

<style lang="scss" scoped>
@import '~swiper/dist/css/swiper.css';
@import '~bulma/sass/utilities/mixins';
#slider {
  position: relative;
  width: 100%;
  &::before {
    content: '';
    display: block;
    position: absolute;
    z-index: 10;
    left: 0; top: 0;
    width: 100%;
    height: 100%;
    box-shadow: inset 0px -160px 80px -85px rgba(black, 1);
  }
  .slide-caption {
    z-index: 5;
    display: flex;
    align-items: center;
    padding: 2rem 3rem;
    color: black;
    line-height: 1;
    .title {
      font-size: 1rem;
      font-weight: 700;
      color: white;
      margin-bottom: 0;
    }
    .caption {
      font-size: 1rem;
    }
  }
}

.swiper-container, .swiper-slide {
  height: 105vh;
}
.swiper-container {
  display: flex;
  .swiper-wrapper {
    position: fixed;
    .swiper-slide {
      flex: 1 0 100%;
      position: relative;

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

.swiper-custom-pagination {
  z-index: 8;
  position: fixed;
  width: 100%;
  bottom: 100px;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  .pagination-bullet {
    opacity: 1;
    max-width: 33%;
    flex: 1 0 auto;
    display: inline-block;
    position: relative;
    margin: 0 2px;
    color: rgba(white, 0.25);
    &::after, &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      display: block;
      height: 2px;
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
@keyframes progress {
  0% {
    width: 0
  }
  100% {
    width: 100%;
  }
}
</style>
