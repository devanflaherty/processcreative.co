<template>
  <section class="container" id="page">
    
  </section>
</template>

<script>
import {beforeEnter, enter, leave} from '~/mixins/page-transitions'

export default {
  name: 'page',
  asyncData ({ app, params, error }) {
    return app.$prismic.initApi().then((ctx) => {
      return ctx.api.getByUID('page', params.slug).then((res) => {
        return {
          document: res,
          entry: res.data
        }
      })
    }).catch(err => {
      console.error(err)
      if (err) {
        error({statusCode: 404, message: 'The page you are looking for does not exist.'})
      }
    })
  },
  transition: {
    name: 'page',
    mode: 'out-in',
    css: false,
    beforeEnter,
    enter,
    leave
  },
  head () {
    return {
      title: `Page`
    }
  }
}
</script>

<style scoped>
.title
{
  margin-top: 30px;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.button
{
  margin-top: 30px;
}
</style>
