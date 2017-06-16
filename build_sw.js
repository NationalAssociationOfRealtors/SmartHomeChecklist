var swPrecache = require('sw-precache');
var rootDir = 'build';
function swPrecache_callback(error) { console.log("Error:" + error) }
swPrecache.write(`${rootDir}/worker.js`, {
  staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff,json}'],
  stripPrefix: rootDir
}, swPrecache_callback);
