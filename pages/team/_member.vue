<template>
  <section 
    :data-wio-id="document.id" 
    id="memberPage" 
    class="page" 
    v-show="!loading">
    <div class="team-wrap">
      <section class="hero team-hero is-large">
        <heroLoader class="team-hero-image" :hero-image="entry.member_hero"/>
        <!-- <div class="team-hero-image is-overlay" :style="`background-image: url(${entry.member_hero.url})`"></div> -->

        <!-- Hero content: will be in the middle -->
        <div class="hero-body"></div>
      </section>

      <a class="button" v-if="prevMember" :href="`/team/${prevMember.uid}`">Meet {{$prismic.asText(prevMember.name)}}</a>
      <a class="button" v-if="nextMember" :href="`/team/${nextMember.uid}`">Meet {{$prismic.asText(nextMember.name)}}</a>
      
      <section class="section member-details">
        <div class="container">
          <div class="columns">
            <div class="column is-4">
              <h3 class="position">
                {{$prismic.asText(entry.member_name)}}
              </h3>
              <h4>{{entry.member_position}}</h4>
            </div>
            <div class="column">
              <div class="rich-text" v-html="$prismic.asHtml(entry.member_description)"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
    
    <!-- Repeatable Slices -->
    <component v-for="(slice, index) in entry.body" :key="index" 
      :slice="slice" :is="toCamelCase(slice.slice_type)" />
  </section>
</template>

<script>
import {mapGetters} from 'vuex'
import {TimelineMax, TweenMax} from 'gsap'

if (process.browser) {
  var ScrollMagic = require('ScrollMagic')
  require('animation.gsap')
  // require('debug.addIndicators')
}
export default {
  transition: {
    name: 'page',
    mode: 'out-in',
    css: false,
    beforeEnter (el) {
      let before = new TimelineMax()
      let child = el.querySelector('.team-wrap')
      before.set(child, {
        scale: 0.8
      })
      before.set(el, {
        autoAlpha: 0
      })
    },
    enter (el, done) {
      let child = el.querySelector('.team-wrap')
      let enter = new TimelineMax()
      enter.to(el, 1, {
        autoAlpha: 1
      })
      enter.to(child, 1, {
        scale: 1
      }, 0)
      enter.addCallback(() => {
        done()
      })
    },
    leave (el, done) {
      // let child = el.querySelector('.team-wrap')
      let leave = new TimelineMax()
      leave.to(el, 0.66, {
        autoAlpha: 0
      })

      leave.addCallback(() => {
        window.scrollTo(0, 0)
      })
      leave.addCallback(() => {
        done()
      })
    }
  },
  async asyncData ({ params, app, store }) {
    let [teamPosts, member] = await Promise.all([
      app.$prismic.initApi().then((ctx) => {
        return ctx.api.query(
          app.$prismic.predicates.at('document.type', 'team_posts'),
          {fetch: 'team_posts.member_name'}
        )
      }), app.$prismic.initApi().then((ctx) => {
        return ctx.api.getByUID('team_posts', params.member)
      })
    ])
    return {
      teamPosts: teamPosts.results,
      document: member,
      entry: member.data
    }
  },
  data () {
    return {
      currentIndex: null
    }
  },
  computed: {
    ...mapGetters(['teamSlugs']),
    prevMember () {
      let member = this.teamPosts[this.currentIndex - 1]
      if (member) {
        return {
          uid: member.uid,
          name: member.data.member_name
        }
      }
    },
    nextMember () {
      let member = this.teamPosts[this.currentIndex + 1]
      if (member) {
        return {
          uid: member.uid,
          name: member.data.member_name
        }
      }
    },
    contrast () {
      return {
        'has-text-black': this.entry.page_contrast === 'Dark',
        'has-text-white': this.entry.page_contrast === 'Light'
      }
    }
  },
  created () {
    this.$store.dispatch('toggleLoading', true)
  },
  beforeMount () {
    this.$store.dispatch('setBackgroundColor', this.entry.background_color)
  },
  mounted () {
    if (this.teamPosts) {
      let index = this.teamPosts.findIndex(el => {
        return el.uid === this.document.uid
      })
      this.currentIndex = index
    }

    if (this.document) {
      this.$store.dispatch('toggleLoading', false)
      this.setPageStyle(this.entry.primary_color, '#000000', 'Light')
      this.setHeroUiContrast('Light')

      this.$prismic.initApi().then((api) => {
        api.toolbar()
      })
    }

    /* eslint-disable */
    let controller = new ScrollMagic.Controller()
    
    let slider = new ScrollMagic.Scene({
      duration: '100%',
      triggerHook: 'onEnter'
    })
      .setTween(TweenMax.to('.team-hero-image', 1, {
        autoAlpha: 0,
        y: '200px'
      }))
      // .addIndicators({name:'headline'})
      .addTo(controller)
    /* eslint-enable */
  },
  beforeDestroy () {
    this.setHeroUiContrast()
  }
}
</script>



<style lang="scss" scoped>
.is-light {
  background: white;
}
.hero {
  background-color: black;
  position: relative;
  overflow: hidden;
  min-height: 400px;
}
.team-hero-image {
  background-size: cover;
  background-position: center;
  &::before {
    position: fixed;
    content: '';
  }
}

.member-details {
  padding-top: 8rem;
  padding-bottom: 8rem;
}
</style>
