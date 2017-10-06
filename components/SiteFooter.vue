<template>
<transition name="slide-up">
  <footer class="section">
    <div class="container">
      <div class="columns is-centered is-mobile is-multiline">
        <div class="column is-half-desktop is-9-tablet is-11-mobile">
          <h2><strong>Full Service</strong></h2>
          <p>
            Something about us offering a new and full service offering and a contact button.  We believe that honesty and friendships are at the heart of successful collaboration. We build long lasting relationships with our  clients and invest ourselves into each opportunity we are given. Here are some of our clients.
          </p>
        </div>
        <div class="column contact-info is-half-desktop is-9-tablet is-11-mobile">
          <a href="mailto:newbusiness@ProcessCreative.co?subject=New Business Inquiry">newbusiness@ProcessCreative.co</a>
          <a href="tel:949-412-6944">949 412 6944</a>
        </div>
      </div>
    </div>

    <div id="footerBar" class="container">
      <div class="columns is-centered is-mobile is-multiline">
        <div class="column is-11-touch is-narrow-desktop flex-center-h-mobile">
          <div class="footer-logo-wrap">
            <Logo color="#ffffff"/>
          </div>
        </div>
        <div class="column is-11-touch">
          <p class="has-text-dark is-size-6 has-text-centered-touch">&copy; 2017 ProcessCreative. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</transition>
</template>

<script>
import Logo from '~/components/Logo'
export default {
  components: {
    Logo
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/components/settings';
@import "~bulma/bulma";

footer {
  h2 {
    margin-bottom: 2rem;
  }
  .contact-info {
    a {
      display: block;
      color: $white;
      font-size: 2rem;
      @include mobile() {
        font-size: 1.5rem;
      }
      &:hover {
        color: $blue;
      }
      &:first-child {
        margin-top: 1.25rem;
      }
    }
  }
}

#footerBar {
  padding: 18rem 0;
  .footer-logo-wrap {
    width: 40px; 
    height: 34px;
  }
}
</style>


