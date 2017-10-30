require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = require("nuxt");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

var dev = "development" === 'development';

var api = {
  baseUrl: 'https://api.riuir.com'
};

var qiniu = {
  domain: 'https://cdn.riuir.com',
  access: 'liU4ohXRsbaSB4uQyR5lij97IsP7YT7NcyC2CND7',
  secret: '_Z0oR7NYYgEb_UsJTtTOZ6TPS5il2_l5Zj09vj_l',
  bucket: 'clannader'
};

var host = {
  dev: 'http://www.api.dev/',
  cdn: 'https://cdn.riuir.com/',
  prod: 'https://api.riuir.com/'
};

var script = {
  baiduStat: dev ? '' : 'var _hmt = _hmt || [];\n          (function() {\n            var hm = document.createElement("script");\n            hm.src = "https://hm.baidu.com/hm.js?5c22f3db91001090bfc7d5096c296534";\n            var s = document.getElementsByTagName("script")[0]; \n            s.parentNode.insertBefore(hm, s);\n          })();',
  baiduPush: dev ? '' : '(function(){\n          var bp = document.createElement(\'script\');\n          var curProtocol = window.location.protocol.split(\':\')[0];\n          if (curProtocol === \'https\') {\n            bp.src = \'https://zz.bdstatic.com/linksubmit/push.js\';        \n          }\n          else {\n            bp.src = \'http://push.zhanzhang.baidu.com/push.js\';\n          }\n          var s = document.getElementsByTagName("script")[0];\n          s.parentNode.insertBefore(bp, s);\n        })();'
};

module.exports = {
  api: api,
  qiniu: qiniu,
  host: host,
  script: script
};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

var env = __webpack_require__(1);
var http = __webpack_require__(4);
var loader = __webpack_require__(5);
var webpack = __webpack_require__(8);

module.exports = {
  cache: true,
  plugins: [{ src: '~/plugins/analytics.js', ssr: false }, { src: '~/plugins/helpers.js' }, { src: '~/plugins/share.js' }, { src: '~/plugins/modal.js' }, { src: '~/plugins/imagelazy.js' }, { src: '~/plugins/geetest.js', ssr: false }, { src: '~/plugins/validate.js', ssr: false }],
  modules: [['@nuxtjs/google-analytics', { ua: 'UA-80338273-2' }], ['@nuxtjs/axios', http.config]],
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s | riuir 天下漫友是一家',
    htmlAttrs: {
      lang: 'zh-CN'
    },
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { name: 'renderer', content: 'webkit' }, { hid: 'description', name: 'description', content: 'riuir，兴趣使然的二次元综合网站' }, { hid: 'keywords', name: 'keywords', content: 'riuir，动漫，ACG，二次元，视频，番剧，动画，新番，神作' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [{ src: '//cdn.bootcss.com/social-share.js/1.0.16/js/social-share.min.js' }, { innerHTML: env.script.baiduStat, type: 'text/javascript' }, { innerHTML: env.script.baiduPush, type: 'text/javascript' }],
    __dangerouslyDisableSanitizers: 'script'
  },
  css: ['~/assets/css/global.scss'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#00a1d6' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['js-cookie'],
    extractCSS: true,
    postcss: [__webpack_require__(6)({
      browsers: ['last 3 versions', 'ie >= 9']
    })],
    /*
    ** Run ESLINT on save
    */
    extend: function extend(config, ctx) {
      config.module.rules.forEach(function (rule) {
        if (loader.isVueRule(rule)) {
          rule.options.loaders.sass.push(loader.sassResourcesLoader);
          rule.options.loaders.scss.push(loader.sassResourcesLoader);
        }
        if (loader.isSASSRule(rule)) {
          rule.use.push(loader.sassResourcesLoader);
        }
      });
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  }
};

/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = require("koa");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

var host = __webpack_require__(1).host;
var dev = "development" === 'development';

exports.config = {
  baseURL: dev ? host.dev : 'http://localhost/',
  browserBaseURL: dev ? host.dev : host.prod,
  headers: { Accept: 'application/json' },
  timeout: 10000,
  errorHandler: function errorHandler(err) {
    return Promise.reject(err.response.data);
  }
};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {var resolve = __webpack_require__(7).resolve;

var isVueRule = function isVueRule(rule) {
  return rule.test.toString() === '/\\.vue$/';
};

var isSASSRule = function isSASSRule(rule) {
  return ['/\\.sass$/', '/\\.scss$/'].indexOf(rule.test.toString()) !== -1;
};

var sassResourcesLoader = {
  loader: 'sass-resources-loader',
  options: {
    resources: [resolve(__dirname, '../assets/css/variables.scss'), resolve(__dirname, '../assets/css/mixins.scss')]
  }
};

module.exports = {
  isVueRule: isVueRule,
  isSASSRule: isSASSRule,
  sassResourcesLoader: sassResourcesLoader
};
/* WEBPACK VAR INJECTION */}.call(exports, "config"))

/***/ },
/* 6 */
/***/ function(module, exports) {

module.exports = require("autoprefixer");

/***/ },
/* 7 */
/***/ function(module, exports) {

module.exports = require("path");

/***/ },
/* 8 */
/***/ function(module, exports) {

module.exports = require("webpack");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

var Koa = __webpack_require__(3);
var Nuxt = __webpack_require__(0).Nuxt;
var Builder = __webpack_require__(0).Builder;

var app = new Koa();
var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || 3000;

// Import and Set Nuxt.js options
var config = __webpack_require__(2);
config.dev = !(app.env === 'production');

// Instantiate nuxt.js
var nuxt = new Nuxt(config);

// Build in development
if (config.dev) {
  var builder = new Builder(nuxt);
  builder.build().catch(function (e) {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
}

app.use(function (ctx) {
  ctx.status = 200; // koa defaults to 404 when it sees that status is unset
  return new Promise(function (resolve, reject) {
    ctx.res.on('close', resolve);
    ctx.res.on('finish', resolve);
    nuxt.render(ctx.req, ctx.res, function (promise) {
      // nuxt.render passes a rejected promise into callback on error.
      promise.then(resolve).catch(reject);
    });
  });
});

app.listen(port, host);
console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console

/***/ }
/******/ ]);
//# sourceMappingURL=main.map