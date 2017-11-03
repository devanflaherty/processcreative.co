<template>
<transition name="slide-up">
  <footer class="section" v-waypoint.inview @enter="updateBg('#000')">

    <div class="container">
      <div class="columns is-mobile is-multiline">
        
        <div class="column is-6-touch is-2-desktop">
          <h4>Navigation</h4>
          <ul>
            <li v-for="(link, index) in navigationMenu" :key="index">
              <nuxt-link :to="$prismic.asLink(link.link_url)">{{link.link_label}}</nuxt-link>
            </li>
          </ul>
        </div>

        <div class="column is-6-touch is-2-desktop">
          <h4>Connect</h4>
          <ul>
            <li v-for="(link, index) in connectMenu" :key="index">
              <nuxt-link :to="$prismic.asLink(link.link_url)">{{link.link_label}}</nuxt-link>
            </li>
          </ul>
        </div>

        <div class="new-business column is-12-touch is-4-desktop is-offset-4-desktop">
          <h4>New Business</h4>
          <div v-html="$prismic.asHtml(contact.newBusiness)"></div>
        </div>
      </div>
    </div>

    <div id="copyright" class="container">
      <p class="has-text-dark">&copy; 2017 ProcessCreative.<br class="is-hidden-tablet"> All Rights Reserved.</p>
    </div>

  </footer>
</transition>
</template>

<script>
import {mapGetters} from 'vuex'
import Logo from '~/components/Logo'

export default {
  components: {
    Logo
  },
  computed: {
    ...mapGetters(['navigationMenu', 'connectMenu', 'contact'])
  }
}
</script>

<style lang="scss">
@import '~assets/styles/components/settings';
@import "~bulma/bulma";

footer {
  margin-top: 10rem;
  max-height: 100vh;
  min-height: 500px;
  h4 {
    margin-bottom: 1.25rem;
    font-weight: 600;
  }
  ul {
    li {
      a {
        font-size: 1.5rem;
      }
    }
  }
  .new-business {
    @include mobile() {
      margin-top: 2rem;
    }
    p {
      color: $white;
      font-size: 1.5rem;
    }
    a {
      &:hover {
        color: $blue;
      }
    }
  }
}

#copyright {
  padding-top: 10rem;
  p {
    @include mobile() {
      font-size: 1rem;
    }
  }
}
</style>


