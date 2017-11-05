importScripts('workbox-sw.prod.v1.3.0.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "/_nuxt/app.617c5955bcacd8e80241.js",
    "revision": "9683e8e68c0f3a2abb58062a448361d6"
  },
  {
    "url": "/_nuxt/common.f5dfb8f8881b1a2c7542.js",
    "revision": "4b8b9c489f07a98ef2ff9cfbae084182"
  },
  {
    "url": "/_nuxt/layouts/default.fe7230dba3f344f3664a.js",
    "revision": "95b9d783b6b3027ce0fbcaed9855f0c6"
  },
  {
    "url": "/_nuxt/manifest.d4c7b9eb447b16145eec.js",
    "revision": "4b4cf0977ff19e3024cc996930d28342"
  },
  {
    "url": "/_nuxt/pages/_page.1dddc38107e83b4175c8.js",
    "revision": "437a8e508d1ea41ea14bd5243ede2f1e"
  },
  {
    "url": "/_nuxt/pages/about.92fd221e1bd6811a1f73.js",
    "revision": "a69d58d4a1b586861451daeaa6fc26a3"
  },
  {
    "url": "/_nuxt/pages/index.74e773d464af802042ac.js",
    "revision": "203fdc6fc200232ed0daf68d66a5d0c0"
  },
  {
    "url": "/_nuxt/pages/index.old.08cfc540b7632bf323b2.js",
    "revision": "7715f1a18d883fdea4156a19cc9c0d3f"
  },
  {
    "url": "/_nuxt/pages/preview.d2b187766476249c492d.js",
    "revision": "0c0ecbe204e12978d475193456803faa"
  },
  {
    "url": "/_nuxt/pages/work/_slug.a72855765a47053e9ae3.js",
    "revision": "891cecce7b61374323dc75dce23bce5c"
  },
  {
    "url": "/_nuxt/pages/work/index.5c6308518446eb4c4ec5.js",
    "revision": "b388f7a8bb8ba05d69fe04153a7c5f49"
  }
];

const workboxSW = new self.WorkboxSW({
  "cacheId": "processcreative.com_1.0.0",
  "clientsClaim": true,
  "directoryIndex": "/"
});
workboxSW.precache(fileManifest);
workboxSW.router.registerRoute('/**', workboxSW.strategies.networkFirst({}), 'GET');
workboxSW.router.registerRoute('/_nuxt/**', workboxSW.strategies.cacheFirst({}), 'GET');
