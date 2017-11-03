<template>
  <div class="modal" :class="{'is-active' : modalVisible}">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content">
      <slot name="body"></slot>
      <br>
      <a class="is-size-4 is-size-5-mobile close-link" href="#close" @click.prevent="closeModal">Close</a>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: ['color', 'modalVisible', 'header', 'footer'],
  data () {
    return {
      loading: true
    }
  },
  methods: {
    closeModal () {
      this.$emit('changeModalVis', false)
    }
  }
}
</script>

<style lang="scss">
@import '~bulma/bulma';
.modal-background {
  background-color: rgba(white, 0.95)
}
.modal-content {
  padding: 1rem;
}
a.close-link {
  color: $black;
  text-decoration: underline;
}
.modal-close {
  &::before, &::after {
    color: #000;
  }
  @include touch() {
    display: none
  }
}
</style>