var swPrecache = require('sw-precache');
var rootDir = 'build';
/* Callback for the sw-precache results */
function swPrecache_callback(error) { console.log("Error:" + error) }
/* Writes the worker.js service file into the build dir */
swPrecache.write(`${rootDir}/worker.js`, {
  staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff,json}'],
  stripPrefix: rootDir,
  runtimeCaching: [{
  urlPattern: /\/property\//,
  handler: 'fastest',
  options: {
    cache: {
      maxEntries: 10,
      name: 'property-cache'
    }
  }
  }]
}, swPrecache_callback);
