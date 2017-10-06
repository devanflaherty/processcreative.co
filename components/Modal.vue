<template>
  <div class="modal" :class="{'is-active' : modalVisible}">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content">
      <slot name="body"></slot>
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
.modal {
  z-index: 200;
}
.modal-content {
  border-radius: 15px;
  background: white;
  padding: 1rem;
}
</style>