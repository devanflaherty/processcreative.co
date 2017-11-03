<template>
  <article ref="video" class="responsive-video">
    <div class="wistia_responsive_padding" :style="`padding:${aspectRatio}% 0 0 0;position:relative;`">
      <div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;">
        
        <script :src="`//fast.wistia.com/embed/medias/${videoId}.jsonp`" async></script>
        <iframe style="width: 100%; height: 100%;" :src="`//fast.wistia.net/embed/iframe/${videoId}`" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen mozallowfullscreen webkitallowfullscreen oallowfullscreen msallowfullscreen width="620" height="260"></iframe>

      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: ['videoId', 'aspectRatio'],
  data () {
    return {
      videoReady: false
    }
  }
}
</script>