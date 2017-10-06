<template>
  <section class="container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      Home
    </h1>
    <div>
      <component :blok="story.content" :is="story.content.component"></component>
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  async asyncData ({env, params, error}) {
    let { data } = await axios.get(`https://api.storyblok.com/v1/cdn/stories/home?token=bL8HDLSioQh11WCJtX5SBQtt&version=published`)
    return { story: data.story }
  },
  head () {
    return {
      title: 'Home'
    }
  },
  methods: {
    getStory (version) {
      window.storyblok.get({
        slug: 'home',
        version: version
      }, (data) => {
        this.story = {
          content: {
            body: []
          }
        }
        this.$nextTick(() => {
          this.story = data.story
        })
      })
    }
  },
  mounted () {
    window.storyblok.on('change', () => {
      this.getStory('draft')
    })
    window.storyblok.pingEditor(() => {
      if (window.storyblok.isInEditor()) {
        this.getStory('draft')
      } else {
        this.getStory('published')
      }
    })
  }
}
</script>

<style scoped>
.title
{
  margin: 30px 0;
}
.users
{
  list-style: none;
  margin: 0;
  padding: 0;
}
.user
{
  margin: 10px 0;
}
</style>
