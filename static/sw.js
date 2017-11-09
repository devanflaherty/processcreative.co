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
    "url": "/_nuxt/app.a00ae20d74f3dc2c5da8.js",
    "revision": "bd81f0b4f754337732cf47c2d4640027"
  },
  {
    "url": "/_nuxt/common.f5dfb8f8881b1a2c7542.js",
    "revision": "4b8b9c489f07a98ef2ff9cfbae084182"
  },
  {
    "url": "/_nuxt/layouts/default.e5488ed0afb9a706a6eb.js",
    "revision": "802883229657dc77944c79c3f70d9025"
  },
  {
    "url": "/_nuxt/manifest.36405cc023fe39cdceae.js",
    "revision": "03955ca05e9371ea8c06de43a73c9e11"
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
    "url": "/_nuxt/pages/index.456203600ef8f9673e28.js",
    "revision": "97107f49d1f46d509ddc9d5e8d437b84"
  },
  {
    "url": "/_nuxt/pages/index.old.e16e7ae7645defdaf5e8.js",
    "revision": "d8ce8eba97f09128b2725a71d1c2b770"
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
