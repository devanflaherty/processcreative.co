<template>
  <section id="contactPage" 
    class="page section push-top" 
    :data-wio-id="contactPage.id"
    v-show="!loading">
    <div class="container contact-wrap">
      <div class="contact-welcome columns" v-if="contactPage.opening_headline.length">
        <div class="column">
          <div class="opening-headline has-text-white" 
            v-html="$prismic.asHtml(contactPage.opening_headline)"
            v-scroll-reveal="{scale: 1, distance: '100px', origin: 'left'}"></div>
        </div>
        <div class="column" v-if="contactPage.opening_statement">
          <div class="opening-statement" 
            v-html="$prismic.asHtml(contactPage.opening_statement)"
            v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'bottom'}"></div>
        </div>
      </div>

      <div class="columns" style="margin-top: 60px; margin-bottom: 60px">
        <div class="column">
          <h5>General</h5>
          <div class="rich-text" v-html="$prismic.asHtml(contact.general)"></div>
        </div>
        <div class="column">
          <h5>New Business</h5>
          <div class="rich-text" v-html="$prismic.asHtml(contact.newBusiness)"></div>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <h5>Connect</h5>
          <div class="rich-text" v-html="$prismic.asHtml(contact.general)"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {mapGetters} from 'vuex'
import {beforeEnter, enter, leave} from '~/mixins/page-transitions'

export default {
  head () {
    return {
      title: 'contact'
    }
  },
  transition: {
    name: 'contact',
    mode: 'out-in',
    css: false,
    beforeEnter,
    enter,
    leave
  },
  async asyncData ({ params, app, store }) {
    let [contactPage] = await Promise.all([
      app.$prismic.initApi().then((ctx) => {
        return ctx.api.getByUID('pages', 'contact')
      })
    ])
    return {
      contactPage: contactPage.data
    }
  },
  computed: {
    ...mapGetters(['connectMenu', 'contact'])
  },
  created () {
    this.$store.dispatch('toggleLoading', true)
  },
  beforeMount () {
    this.$store.dispatch('setBackgroundColor', this.contactPage.background_color)
  },
  mounted () {
    if (this.contactPage) {
      this.$store.dispatch('toggleLoading', false)
      this.setPageStyle(this.contactPage.primary_color, this.contactPage.background_color, this.contactPage.page_contrast)

      this.$prismic.initApi().then((ctx) => {
        ctx.toolbar()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.push-top {
  padding-top: 11rem;
}
.contact-welcome {
  padding-top: 6rem;
  padding-bottom: 8rem;
}
h5 {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}
</style>
