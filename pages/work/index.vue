<template>
  <h1>Work Page</h1>
</template>

<script>
// import Prismic from 'prismic-javascript'

export default {
  asyncData ({ params, app }) {
    return app.$prismic.initApi().then((ctx) => {
      return ctx.api.query(
        app.$prismic.predicates.at('document.type', 'work_posts')
      ).then((res) => {
        return { document: res }
      })
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
