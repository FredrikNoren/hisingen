"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/hisingen/index.html","f7e75203a9280b75c5dbe9e1026702d4"],["/hisingen/static/css/main.aff78a54.css","6a65d5b62dbefa8869d49a86ac3ea8bd"],["/hisingen/static/js/main.ae3f236b.js","ff2f8f8adfc7666507beda6ad2d32582"],["/hisingen/static/media/Ashlands1.c50f3816.jpg","c50f3816115787ae0959b25f55fdef78"],["/hisingen/static/media/Character3.b7b7fd67.jpg","b7b7fd67b2596d1f1a69ea2ada610e61"],["/hisingen/static/media/Characters1.eb016aed.jpg","eb016aedc1726c6c9b97a2747d727411"],["/hisingen/static/media/Fakir1.1fab5498.jpg","1fab54988ddf1b31dba86cfb0abf2fb6"],["/hisingen/static/media/Fallen1.b22c5f30.jpg","b22c5f30ad7dd0d853470e5ed9eb915f"],["/hisingen/static/media/Forgotten1.be86253f.jpg","be86253f13677271245b10d27ea5e29c"],["/hisingen/static/media/Ghostcity1.e9832f24.jpg","e9832f2467032fc322d9ec6116f6f773"],["/hisingen/static/media/Gloomcove1.b6a380c2.jpg","b6a380c21bcc9ffae288512d42ab8c21"],["/hisingen/static/media/Green_forest1.89e47852.jpg","89e47852e1863b6b69901d10a611a0db"],["/hisingen/static/media/Highlands2.ff94515c.jpg","ff94515c5a6f34174cdd3cdbeeef0a90"],["/hisingen/static/media/Human2.5deae5d4.jpg","5deae5d46ff22c51a2070941b99d07ce"],["/hisingen/static/media/Human_char1b.94958b63.jpg","94958b6329352233c18da923ad5642d8"],["/hisingen/static/media/Iantucauru1.dca1cd75.jpg","dca1cd753c11665856edd396dd75aa9e"],["/hisingen/static/media/Icegrip_glacier1.9588f491.jpg","9588f491a7d2731ea442c4219f78c81c"],["/hisingen/static/media/Krugel1.1516dc87.jpg","1516dc875563bda4c0deddb15de54bee"],["/hisingen/static/media/Lake1.919e971d.jpg","919e971dc5c84fa3bb714ccd9a0c473c"],["/hisingen/static/media/Landscape2.b01f8397.jpg","b01f8397fd0b7b79f15231b6791d5514"],["/hisingen/static/media/Ogre2.d2ac2a97.jpg","d2ac2a973f2a73c8bbe7b27c1bf3a346"],["/hisingen/static/media/Owlkin1.70386507.jpg","70386507884d37196cbe00942e798fe3"],["/hisingen/static/media/Sentry_char1.f2f64040.jpg","f2f6404004dd2fb66affea939500d1c0"],["/hisingen/static/media/Serenity1.58a69595.jpg","58a69595224e9ded8053c7fe48a6e749"],["/hisingen/static/media/Skypeak1.831843a0.jpg","831843a02871418498f47e8f60faaa37"],["/hisingen/static/media/Temple1.cf35d3c4.jpg","cf35d3c4de2cdd37fdfd4b86011e2de6"],["/hisingen/static/media/Troll1.d2b512f3.jpg","d2b512f38918c184b09ec22f2db42de2"],["/hisingen/static/media/Troll2.ab4f0f8b.jpg","ab4f0f8b1509dee638aacb6397761ad5"],["/hisingen/static/media/Undead1.81f27ad2.jpg","81f27ad2ea15521ed94477318e70971b"],["/hisingen/static/media/Wolfen1.2.ba931e8a.jpg","ba931e8a1f97151776fa887002cbb232"],["/hisingen/static/media/Yppotryll2.27cb66b1.jpg","27cb66b1034315f0958ffe4b5004b209"],["/hisingen/static/media/magnus2.7638449f.jpg","7638449f3a0e1bd00a4ad6bb7df4c626"],["/hisingen/static/media/pepsi.e227da0f.jpg","e227da0fc377bbf66bdadf91c64d7fd8"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=a),n.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,n,t){var i=new URL(e);return t&&i.pathname.match(t)||(i.search+=(i.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(n)),i.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var n=new URL(a).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,a){var n=new URL(e);return n.hash="",n.search=n.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),n.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],n=e[1],t=new URL(a,self.location),i=createCacheKey(t,hashParamName,n,/\.\w{8}\./);return[t.toString(),i]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(n){if(!a.has(n)){var t=new Request(n,{credentials:"same-origin"});return fetch(t).then(function(a){if(!a.ok)throw new Error("Request for "+n+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(n,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(n){return Promise.all(n.map(function(n){if(!a.has(n.url))return e.delete(n)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,n=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,"index.html"),a=urlsToCacheKeys.has(n));!a&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(n=new URL("/hisingen/index.html",self.location).toString(),a=urlsToCacheKeys.has(n)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});