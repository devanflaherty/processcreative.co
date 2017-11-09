export default {
  apiEndpoint: 'https://processcreative.prismic.io/api/v2',
  accessToken: 'MC5XZk9tcGlvQUFKMVlJTXlo.JBfvv73vv73vv73vv70r77-977-977-9X--_vWvvv70uIzFp77-977-977-9VO-_vXpFOu-_vTVJQgRe',

  linkResolver (doc) {
    // Define the url depending on the document type
    if (doc.type === 'work_posts') {
      return '/work/' + doc.uid
    } else if (doc.type === 'blog_posts') {
      return '/blog/' + doc.uid
    } else if (doc.type === 'pages') {
      return '/' + doc.uid
    }
    // Default to homepage
    return '/'
  }
}
