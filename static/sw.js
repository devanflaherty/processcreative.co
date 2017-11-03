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
    "url": "/_nuxt/app.1f385175946e73fef80c.js",
    "revision": "60f278172a2a3a7cc4be18296cab8efd"
  },
  {
    "url": "/_nuxt/common.cf9990a5b7fe1f691e5f.js",
    "revision": "45b5fbb5e2b145138224afc87eca4f03"
  },
  {
    "url": "/_nuxt/layouts/default.5ddf3d0df05ae4b41e0d.js",
    "revision": "1c8132e2853b335a53591968982e6d29"
  },
  {
    "url": "/_nuxt/manifest.2f187b356c4c0508f6ec.js",
    "revision": "e367cf6eef69d7335213b2af17377259"
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
    "url": "/_nuxt/pages/home.956b3b79b1ac10caa754.js",
    "revision": "95690aa6049aa12500f60ccad3ae816c"
  },
  {
    "url": "/_nuxt/pages/index.41cc27a20c4145a2aff6.js",
    "revision": "171487ff70c62c2678e8e8eb7635159a"
  },
  {
    "url": "/_nuxt/pages/preview.9534f2f0c107556afec8.js",
    "revision": "40cff36a10b10afa67662c7f9ace6cd5"
  },
  {
    "url": "/_nuxt/pages/work/_slug.ce5f833c0bc116970baf.js",
    "revision": "aa697c19bbecbdc61b8a5a54f730e932"
  },
  {
    "url": "/_nuxt/pages/work/index.9228213bc7670d27a334.js",
    "revision": "d1c35a61d05b64a5f64c72aace0a5fd1"
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
