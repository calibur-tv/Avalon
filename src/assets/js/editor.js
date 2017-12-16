/* eslint-disable */
/**
 * dante.js
 * version: 1.0.14
 * author: liudecai
 * email: liudecai@jianshu.com
 **/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
      (global.Dante = factory());
}(this, (function () { 'use strict';
  /*
   poly-fill
   */

  !function () {
    // Object.assign
    if (typeof Object.assign !== 'function') {
      Object.assign = function (target) {
        if (target == null) {
          throw new TypeError('Cannot convert undefined or null to object');
        }

        target = Object(target);

        for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          rest[_key - 1] = arguments[_key];
        }

        for (var index = 0; index < rest.length; index++) {
          var source = rest[index];
          if (source != null) {
            /* eslint-disable no-restricted-syntax */
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
            /* eslint-disable no-restricted-syntax */
          }
        }
        return target;
      };
    }

    // IE 中兼容 Element.prototype.matches
    // if (!Element.prototype.matches) {
    //   Element.prototype.matches =
    //     Element.prototype.matchesSelector ||
    //     Element.prototype.mozMatchesSelector ||
    //     Element.prototype.msMatchesSelector ||
    //     Element.prototype.oMatchesSelector ||
    //     Element.prototype.webkitMatchesSelector ||
    //     function(s) {
    //       const matches = (this.document || this.ownerDocument).querySelectorAll(s);
    //       let i = matches.length;
    //       /* eslint-disable no-empty */
    //       while (--i >= 0 && matches.item(i) !== this) {}
    //       /* eslint-disable no-empty */
    //       return i > -1;
    //     };
    // }

    if (!Array.prototype.filter) {
      /* eslint-disable no-extend-native */
      Array.prototype.filter = function (func, thisArg) {
        /* eslint-disable valid-typeof */
        if (!(typeof func === 'Function' && this)) {
          throw new TypeError();
        }
        /* eslint-disable valid-typeof */

        var len = this.length >>> 0;
        var res = new Array(len); // preallocate array
        var c = 0;
        var i = -1;
        if (thisArg === undefined) {
          while (++i !== len) {
            // checks to see if the key was set
            if (i in this) {
              if (func(t[i], i, t)) {
                res[c++] = t[i];
              } else {
                while (++i !== len) {
                  // checks to see if the key was set
                  if (i in this) {
                    if (func.call(thisArg, t[i], i, t)) {
                      res[c++] = t[i];
                    }
                  }
                }
              }
            }
          }
        }

        res.length = c; // shrink down array to proper size
        return res;
      };
      /* eslint-disable no-extend-native */
    }
  }();

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };











  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();









  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };











  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };





  var slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  /*
   DOM 操作 API
   */

// 根据 html 代码片段创建 dom 对象
  function createElemByHTML(html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.children;
  }

// 是否是 DOM List
  function isDOMList(domList) {
    if (!domList) {
      return false;
    }
    if (domList instanceof HTMLCollection || domList instanceof NodeList) {
      return true;
    }
    return false;
  }

// 封装 document.querySelectorAll
  function querySelectorAll(selector) {
    var result = document.querySelectorAll(selector);
    if (isDOMList(result)) {
      return result;
    }
    return [result];
  }

// function isWindow(obj) {
//   return obj != null && obj == obj.window;
// }

  function isDocument(obj) {
    return obj !== null && obj.nodeType === obj.DOCUMENT_NODE;
  }
  function matches(element, selector) {
    if (!selector || !element || element.nodeType !== 1) return false;
    var matchesSelector = element.matches || element.webkitMatchesSelector || element.mozMatchesSelector || element.oMatchesSelector || element.matchesSelector;
    if (matchesSelector) return matchesSelector.call(element, selector);
    // fall back to performing a selector:
    var match = false;
    var parent = element.parentNode;
    var temp = !parent;
    var tempParent = document.createElement('div');
    if (temp) (parent = tempParent).appendChild(element);
    /* eslint-disable no-use-before-define */
    $(parent.querySelectorAll(selector)).forEach(function (node) {
      if (node === element) {
        match = true;
      }
    });
    /* eslint-disable no-use-before-define */
    if (temp) {
      tempParent.removeChild(element);
    }
    return match;
  }

// 创建构造函数
  function DomElement(selector) {
    if (!selector) {
      return;
    }

    // selector 本来就是 DomElement 对象，直接返回
    if (selector instanceof DomElement) {
      return selector;
    }

    this.selector = selector;

    // 根据 selector 得出的结果（如 DOM，DOM List）
    var selectorResult = [];
    if (selector.nodeType) {
      // if (selector.nodeType === 1) {
      // 单个 DOM 节点
      selectorResult = [selector];
    } else if (isDOMList(selector)) {
      // DOM List
      selectorResult = selector;
      // 如果是个数组节点
    } else if (selector instanceof Array) {
      selectorResult = selector;
    } else if (typeof selector === 'string') {
      // 字符串
      selector = selector.replace('/\n/mg', '').trim();
      if (selector.indexOf('<') === 0) {
        // 如 <div>
        selectorResult = createElemByHTML(selector);
      } else {
        // 如 #id .class
        selectorResult = querySelectorAll(selector);
      }
    }

    var length = selectorResult.length;
    if (!length) {
      // 空数组
      this.length = 0;
      return this;
    }

    // 加入 DOM 节点
    var i = void 0;
    for (i = 0; i < length; i++) {
      this[i] = selectorResult[i];
    }
    this.length = length;
  }

// 修改原型
  DomElement.prototype = {
    constructor: DomElement,

    // 类数组，forEach
    forEach: function forEach(fn) {
      var i = void 0;
      for (i = 0; i < this.length; i++) {
        var elem = this[i];
        var result = fn.call(elem, elem, i);
        if (result === false) {
          break;
        }
      }
      return this;
    },
    closest: function closest(selector, context) {
      var nodes = [];
      var collection = (typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) === 'object' && $(selector);
      this.forEach(function (node) {
        // console.log('closest::',node)
        while (node && !(collection ? collection.indexOf($(node)) >= 0 : matches(node, selector))) {
          node = node !== context && !isDocument(node) && node.parentNode;
        }
        if (node && nodes.indexOf(node) < 0) nodes.push(node);
      });
      return $(nodes);
    },
    // 获取第几个元素
    get: function get$$1(index) {
      var length = this.length;
      if (index >= length) {
        index %= length;
      }
      return $(this[index]);
    },

    // 第一个
    first: function first() {
      return this.get(0);
    },

    // 最后一个
    last: function last() {
      var length = this.length;
      return this.get(length - 1);
    },
    pre: function pre() {
      var elems = [];
      this.forEach(function (node) {
        elems.push(node.previousElementSibling);
      });
      return $(elems);
    },
    preNode: function preNode() {
      var elems = [];
      this.forEach(function (node) {
        node.previousSibling && elems.push(node.previousSibling);
      });
      return $(elems);
    },
    next: function next() {
      var elems = [];
      this.forEach(function (node) {
        elems.push(node.nextElementSibling);
      });
      return $(elems);
    },
    nextNode: function nextNode() {
      var elems = [];
      this.forEach(function (node) {
        elems.push(node.nextSibling);
      });
      return $(elems);
    },
    // 绑定事件
    on: function on(eventType, selector, fn) {
      // selector 不为空，证明绑定事件要加代理
      if (!fn) {
        fn = selector;
        selector = null;
      }

      // type 是否有多个
      var types = [];
      types = eventType.split(/\s+/);

      return this.forEach(function (elem) {
        types.forEach(function (type) {
          if (!type) {
            return;
          }

          if (!selector) {
            // 无代理
            elem.addEventListener(type, fn, false);
            return;
          }

          // 有代理
          elem.addEventListener(type, function (e) {
            var match = $(e.target).closest(selector, elem).get(0);
            // console.log('delegate event',e,selector,match)
            if (match.length && match !== elem) {
              fn.call(match, e);
            }
          }, false);
        });
      });
    },

    // 取消事件绑定
    off: function off(type, fn) {
      return this.forEach(function (elem) {
        elem.removeEventListener(type, fn, false);
      });
    },
    /* eslint-disable prefer-rest-params */
    data: function data(name, value) {
      var attrName = 'data-' + name.replace(/([A-Z])/, '-$1').toLowerCase();

      var data = 1 in arguments ? this.attr(attrName, value) : this.attr(attrName);

      return data !== null ? data : undefined;
    },
    /* eslint-disable prefer-rest-params */
    // 获取/设置 属性
    attr: function attr(key, val) {
      if (val == null) {
        // 获取值
        return this[0].getAttribute(key);
      }
      // 设置值
      return this.forEach(function (elem) {
        elem.setAttribute(key, val);
      });
    },
    // 支持多个className,只需要包含其中一个即可
    hasClass: function hasClass(className) {
      var result = false;
      if (!className) {
        return result;
      }
      this.forEach(function (elem) {
        var arr = void 0;
        if (elem.className) {
          // 解析当前 className 转换为数组
          arr = elem.className.split(/\s/);
          className = className.split(/\s/);
          arr = arr.filter(function (item) {
            item = item.trim();
            if (item && className.indexOf(item) > -1) {
              return item;
            }
          });
          if (arr.length) {
            result = true;
          }
        }
      });
      return result;
    },
    // 添加 class
    addClass: function addClass(className) {
      if (!className) {
        return this;
      }
      return this.forEach(function (elem) {
        var arr = void 0;
        if (elem.className) {
          // 解析当前 className 转换为数组
          arr = elem.className.split(/\s/);
          arr = arr.filter(function (item) {
            return !!item.trim();
          });
          // 添加 class
          if (arr.indexOf(className) < 0) {
            arr.push(className);
          }
          // 修改 elem.class
          elem.className = arr.join(' ');
        } else {
          elem.className = className;
        }
      });
    },

    // 删除 class
    removeClass: function removeClass(className) {
      if (!className) {
        return this;
      }
      return this.forEach(function (elem) {
        var arr = void 0;
        if (elem.className) {
          // 解析当前 className 转换为数组
          arr = elem.className.split(/\s/);
          arr = arr.filter(function (item) {
            item = item.trim();
            // 删除 class
            if (!item || item === className) {
              return false;
            }
            return true;
          });
          // 修改 elem.class
          elem.className = arr.join(' ');
        }
      });
    },

    // 修改 css
    css: function css(key, val) {
      var currentStyle = key + ':' + val + ';';
      return this.forEach(function (elem) {
        var style = (elem.getAttribute('style') || '').trim();
        var styleArr = void 0;
        var resultArr = [];
        if (style) {
          // 将 style 按照 ; 拆分为数组
          styleArr = style.split(';');
          styleArr.forEach(function (item) {
            // 对每项样式，按照 : 拆分为 key 和 value
            var arr = item.split(':').map(function (i) {
              return i.trim();
            });
            if (arr.length === 2) {
              resultArr.push(arr[0] + ':' + arr[1]);
            }
          });
          // 替换或者新增
          resultArr = resultArr.map(function (item) {
            if (item.indexOf(key) === 0) {
              return currentStyle;
            }
            return item;
          });
          if (resultArr.indexOf(currentStyle) < 0) {
            resultArr.push(currentStyle);
          }
          // 结果
          elem.setAttribute('style', resultArr.join('; '));
        } else {
          // style 无值
          elem.setAttribute('style', currentStyle);
        }
      });
    },
    removeAttr: function removeAttr(name) {
      return this.forEach(function (node) {
        node.removeAttribute(name);
      });
    },
    // 显示
    show: function show() {
      return this.css('display', 'block');
    },

    // 隐藏
    hide: function hide() {
      return this.css('display', 'none');
    },

    // 获取子节点
    children: function children() {
      var elem = this[0];
      if (!elem) {
        return $([]);
      }

      return $(elem.children);
    },

    // 增加子节点
    append: function append($children) {
      return this.forEach(function (elem) {
        $children.forEach(function (child) {
          elem.appendChild(child);
        });
      });
    },
    prepend: function prepend($children) {
      return this.forEach(function (elem) {
        $children.forEach(function (child) {
          elem.insertBefore(child, elem.firstChild);
        });
      });
    },
    // 移除当前节点
    remove: function remove() {
      return this.forEach(function (elem) {
        if (elem.remove) {
          elem.remove();
        } else {
          var parent = elem.parentElement;
          if (parent) {
            parent.removeChild(elem);
          }
        }
      });
    },
    replace: function replace($elem) {
      return this.forEach(function (elem) {
        $elem.insertBefore($(elem));
        $(elem).remove();
      });
    },
    // 是否包含某个子节点
    isContain: function isContain($child) {
      var elem = this[0];
      var child = $child[0];
      return elem.contains(child);
    },

    // 尺寸数据
    getBoundingClientRect: function getBoundingClientRect() {
      var elem = this[0];
      return elem.getBoundingClientRect(); // 可得到 bottom height left right top width 的数据
    },

    // 封装 nodeName
    getNodeName: function getNodeName() {
      var elem = this[0];
      if (!elem) {
        return '';
      }
      return elem.nodeName && elem.nodeName.toUpperCase();
    },
    // 向parent查找，直到遇到utilElem, 没查到返回false
    findReverse: function findReverse(classNames) {
      var utilElem = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : $(document);

      var result = false;
      var elem = this;
      while (!utilElem.equal(elem) && !utilElem.equal($(document))) {
        if (elem.hasClass(classNames)) {
          result = elem;
          break;
        }
        elem = elem.parent();
      }
      return result;
    },
    // 从当前元素查找
    find: function find(selector) {
      var elem = this[0];
      return $(elem.querySelectorAll(selector));
    },
    clone: function clone() {
      var elem = this[0];
      return $(elem.cloneNode(true));
    },
    // 获取当前元素的 text
    text: function text(val) {
      if (!val) {
        // 获取 text
        var elem = this[0];
        // return elem.innerHTML.replace(/<.*?>/g, () => '')
        return elem.textContent || '';
      }
      // 设置 text
      return this.forEach(function (elem) {
        elem.textContent = val;
      });
    },

    // 获取 html
    html: function html(value) {
      var elem = this[0];
      if (value == null) {
        return elem.innerHTML || '';
      }
      elem.innerHTML = value;
      return this;
    },
    contents: function contents() {
      var elem = this[0];
      return $(elem.contentDocument || Array.prototype.slice.call(elem.childNodes));
    },
    // 获取 value
    val: function val() {
      var elem = this[0];
      return elem.value.trim();
    },

    // focus
    focus: function focus() {
      return this.forEach(function (elem) {
        elem.focus();
      });
    },

    // parent
    parent: function parent() {
      var elem = this[0];
      return $(elem.parentElement);
    },

    // 判断两个 elem 是否相等
    equal: function equal($elem) {
      if ($elem.nodeType === 1) {
        return this[0] === $elem;
      }
      return this[0] === $elem[0];
    },
    before: function before(elem) {
      return elem.insertBefore(this);
    },
    after: function after(elem) {
      return elem.insertAfter(this);
    },
    // 将该元素插入到某个元素前面
    insertBefore: function insertBefore(selector) {
      var $referenceNode = $(selector);
      var referenceNode = $referenceNode[0];
      if (!referenceNode) {
        return this;
      }
      return this.forEach(function (elem) {
        var parent = referenceNode.parentNode;
        parent.insertBefore(elem, referenceNode);
      });
    },

    // 将该元素插入到某个元素后面
    insertAfter: function insertAfter(selector) {
      var $referenceNode = $(selector);
      var referenceNode = $referenceNode[0];
      if (!referenceNode) {
        return this;
      }
      return this.forEach(function (elem) {
        var parent = referenceNode.parentNode;
        // console.log("insertAfter:::===",parent,referenceNode,elem)
        if (parent.lastChild === referenceNode) {
          // 最后一个元素
          parent.appendChild(elem);
        } else {
          // 不是最后一个元素
          parent.insertBefore(elem, referenceNode.nextSibling);
        }
      });
    },
    is: function is(selector) {
      return typeof selector === 'string' ? this.length > 0 && matches(this[0], selector) : selector && this.selector === selector.selector;
    },
    wrap: function wrap(structure) {
      return this.forEach(function (elem) {
        if (typeof structure === 'string') {
          $(elem).before(structure = $(structure));
        } else {
          $(elem).before(structure);
        }
        structure.append($(elem));
      });
    },
    unwrap: function unwrap() {
      return this.forEach(function (elem) {
        $(elem).parent().replace($(elem));
      });
    },
    // 把所有的childnodes放到外面
    unpack: function unpack() {
      return this.forEach(function (elem) {
        elem = $(elem);
        elem.contents().forEach(function (child) {
          elem.before($(child));
        });
        elem.remove();
      });
    }
  };

// new 一个对象
  function $(selector) {
    return new DomElement(selector);
  }

// development测试阶段暴露给test page使用

  var CSS = {
    PLACE_HOLDER: 'PLACE_HOLDER',

    UPLOADING: 'img-uploading-status', // 上传中
    UPLOADING_PANEL: 'image-upload-status-panel', // 上传状态栏
    // UPLOAD_ERROR: 'img-uploading-error-status', // 上传失败
    // UPLOAD_ERROR_TIP: 'img-uploading-error-tip', // 上传失败提示
    UPLOADING_ICON: 'uploading-icon', // 上传loding icon
    UPLOAD_CANCER_BTN: 'upload-btn-cancel', // 取消上传按键
    UPLOAD_RETRY_BTN: 'upload-btn-retry', // 重新上传按键
    UPLOADING_MSG: 'upload-error-msg', // 重新上传按键

    IMG_CONTAINER: 'image-package',
    IMG_TITLE: 'image-caption',
    VIDEO_CONTAINER: 'video-package',
    VIDEO_DESCRIPTION: 'video-description'

    // 为了兼容原来的文章能继续编写，所以只能区别对待，不能统一一个Class名字
    // MEDIA_CONTAINER: 'dante-media-or-img-package', // img or media common class
    // MEDIA_SELF: 'dante-media-or-img', // img or media caption common class
    // MEDIA_CAPTION: 'dante-media-or-img-caption'// img or media caption common class
  };

  var EVENT = {
    ERROR: 'error',

    // capture event
    CAPTRUE: 'CAPTRUE',

    // drag event
    DRAG_ENTER: 'dragenter',
    DRAG_LEAVE: 'dragleave',
    DROP: 'drop',

    // onchang event
    HTML_CONTENT_CHANGE: 'contentChange',

    // upload img event
    IMG_UPLOAD: 'imageUpload',

    // keybord event
    KEY_DOWN: 'KEY_DOWN',
    KEY_UP: 'KEY_UP',
    TAB_KEY_DOWN: 'TAB_KEY_DOWN',
    TAB_KEY_UP: 'TAB_KEY_UP',
    DEL_KEY_DOWN: 'DEL_KEY_DOWN',
    DEL_KEY_UP: 'DEL_KEY_UP',
    ENTER_KEY_DOWN: 'ENTER_KEY_DOWN',
    ENTER_KEY_UP: 'ENTER_KEY_UP'

  };

  /*
   工具
   */

// import EVENT from '@enum/eventname';
// import ERROR from '@enum/error';

  var blockTags = ['address', 'article', 'aside', 'audio', 'blockquote', 'canvas', 'dd', 'div', 'dl', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'hr', 'noscript', 'ol', 'output', 'p', 'pre', 'section', 'table', 'thead', 'tfoot', 'tbody', 'tr', 'ul', 'video', 'li', 'legend'];
  var allowTags = ['blockquote', 'pre', 'code', 'p', 'div', 'ul', 'ol', 'li', 'br', 'hr', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img', 'a', 'b', 'i', 'u', 'del', 'strike', 'strong', 'em'];

// 和 UA 相关的属性
  var UA = {
    ua: navigator.userAgent,

    // 是否 webkit
    isWebkit: function isWebkit() {
      var reg = /webkit/i;
      return reg.test(this.ua);
    },

    // 是否 IE
    isIE: function isIE() {
      return 'ActiveXObject' in window;
    }
  };

  function videoMaker() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : videoInfo,
      url = _ref.url,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? 400 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === undefined ? 400 : _ref$height,
      provider = _ref.provider,
      flash = _ref.flash;

    url = url.replace(/http:|https:/, '');
    var player = '';
    if (provider === 'bilibili') {
      player = '<div class="video-player player">';
      player += '<video width="' + width + '" height="' + height + '" preload="auto" controls="true">';
      player += '<source src="' + url + '" type="video/mp4">';
      player += '<object type="application/x-shockwave-flash" data="http://static.hdslb.com/play.swf" class="flash" style="width:' + width + 'px; height:' + height + 'px;">';
      player += '<param name="bgcolor" value="#ffffff">';
      player += '<param name="allowfullscreeninteractive" value="true">';
      player += '<param name="allowfullscreen" value="true">';
      player += '<param name="quality" value="high">';
      player += '<param name="allowscriptaccess" value="always">';
      player += '<param name="wmode" value="direct">';
      player += '<param name="flashvars" value="' + flash + '">';
      player += '</object>';
      player += '</video>';
      player += '</div>';
    } else {
      player = '<iframe class="player" src="' + url + '" height="' + height + '" width="' + width + '" frameborder=0 allowfullscreen style="width:' + width + 'px; height:' + height + 'px;"></iframe>';
    }

    return player;
  }

// 获取当前node所在的p元素,如果没有，返回自身
  function getPElemByNode(node) {
    while (node && $(node).getNodeName() !== 'P') {
      node = node.parentNode;
    }
    return $(node);
  }

// 编辑区域顶级元素只允许这些 + GapNode(媒体标签和分割线)
  function isContainer(node) {
    var tag = $(node).getNodeName();
    var containerTagArray = ['P', 'BLOCKQUOTE', 'PRE', 'H1', 'H2', 'H3', 'H4'];
    /* eslint-disable no-restricted-syntax */
    for (var i in containerTagArray) {
      if (tag === containerTagArray[i]) {
        return true;
      }
    }
    /* eslint-disable no-restricted-syntax */
    return false;
  }
// 媒体标签和hr分割线
  function isGapNode(node) {
    return $(node).hasClass(CSS.IMG_CONTAINER) || $(node).hasClass(CSS.VIDEO_CONTAINER) || $(node).getNodeName() === 'HR';
  }


  /* eslint-disable no-prototype-builtins */

  /* eslint-disable no-prototype-builtins */
  function urlParse(url) {
    if (url.indexOf('//') === 0) {
      url = location.protocol + url;
      return url;
    }
    if (/^((https?|ftp):)\/\//.test(url)) {
      return url;
    }
    url = location.protocol + '//' + url;
    return url;
  }

  function getImgTitle() {
    var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return $('<div class=\'' + CSS.IMG_TITLE + '\'></div>');
  }
  function getImgPanel(url) {
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var uploadId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
    var width = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'auto';
    var height = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'auto';
    var minWidth = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    var minHeight = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
    var needLoading = arguments[7];

    var elem = $('\n            <div class=\'' + CSS.IMG_CONTAINER + ' ' + (needLoading ? CSS.UPLOADING : '') + ' ' + (needLoading ? CSS.IMG_CONTAINER + '-' + uploadId : '') + '\'  data-index=\'' + uploadId + '\'>\n              <img class=\'uploaded-img\' src=' + url + ' style="min-height:' + minHeight + ';min-width:' + minWidth + ';" width=' + width + ' height=' + height + ' />\n              <br>\n            </div>\n         ');
    elem.append(getImgTitle(title));
    return elem;
  }

  function getVideoTitle() {
    var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return $('<div class="' + CSS.VIDEO_DESCRIPTION + '">' + title + '</div>');
  }
  function getVideoPanel() {
    var videoInfo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var elem = $('<div\n              class="' + CSS.VIDEO_CONTAINER + ' "\n              data-video-id="' + videoInfo.id + '"\n              data-video-url="' + videoInfo.url + '"\n              data-flash-url="' + videoInfo.flash + '"\n              data-provider="' + videoInfo.provider + '"\n              data-cover-uuid="' + videoInfo.cover_id + '"\n          >\n          ' + videoMaker(videoInfo) + '\n          <br>\n          </div>');
    elem.append(getVideoTitle(videoInfo.description));
    return elem;
  }
  function getLoadingPanel(url, loadingId) {
    return $('<div class="' + CSS.UPLOADING_PANEL + '" contenteditable="false">\n              <img class="preview" src="' + url + '">\n              <div class="status-bar">\n                <span class="' + CSS.UPLOADING_ICON + '"></span>\n                <div class="status-area">\n                  <span class="' + CSS.UPLOADING_MSG + '">\u6B63\u5728\u4E0A\u4F20...</span>\n                  <a class="' + CSS.UPLOAD_CANCER_BTN + '" data-index="' + loadingId + '" href="javascript:void(0)">\u53D6\u6D88</a>\n                  <a class="' + CSS.UPLOAD_RETRY_BTN + '" data-index="' + loadingId + '" href="javascript:void(0)">\u91CD\u65B0\u4E0A\u4F20</a>\n                </div>\n              </div>\n            </div>');
  }




  function dataURI2Blob(data) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    var _data$split = data.split(','),
      _data$split2 = slicedToArray(_data$split, 2),
      bra = _data$split2[0],
      ket = _data$split2[1];

    var byteString = void 0;
    // # convert base64/URLEncoded data component to raw binary data held in a string
    if (~bra.indexOf('base64')) {
      byteString = atob(ket);
    } else {
      byteString = unescape(ket);
    }
    // # separate out the mime component
    var mimeString = bra.split(':')[1].split(';')[0];

    // # write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    var file = new Blob([ia], { type: mimeString });
    file.name = name + '.' + mimeString.replace('image/', '');
    return file;
  }

  var command = function () {
    function command(editor) {
      classCallCheck(this, command);

      this.editor = editor;
      // 这些操作是不需要拍照保存history的
      this.donotCaptureCommandList = ['undo', 'redo'];
      this.bindEvent();


    }
    // 绑定一些代理事件，例如图片上传状态的取消和重试按键


    createClass(command, [{
      key: 'bindEvent',
      value: function bindEvent() {
        var editor = this.editor;
        var selection = editor.selection;
        var $editElem = editor.$editElem;
        var imgUploader = editor.imgUploader;

        // 取消按键
        $editElem.on('click', '.' + CSS.UPLOAD_CANCER_BTN, function (e) {
          var index = $(e.target || e.srcElement).data('index');



          var imgContainerElem = $('.' + CSS.IMG_CONTAINER + '-' + index);
          imgUploader.uploadDataCache[index] = null; // clear cache
          imgContainerElem.remove();
        });

        // 重试按键
        $editElem.on('click', '.' + CSS.UPLOAD_RETRY_BTN, function (e) {
          var index = $(e.target || e.srcElement).data('index');

          var imgContainerElem = $('.' + CSS.IMG_CONTAINER + '-' + index);
          var imgCaptionElem = imgContainerElem.find('.' + CSS.IMG_TITLE);
          selection.setCursorInElem(imgCaptionElem);
          // const uploaddata = JSON.parse(imgContainerElem.data('uploaddata'));
          imgUploader.beginUpload({ id: index });
        });
      }
    }, {
      key: 'exec',
      value: function exec(name, value) {
        var editor = this.editor;
        var selection = editor.selection;
        var isDonotCaptureCommand = this.donotCaptureCommandList.indexOf(name) >= 0;
        if (!isDonotCaptureCommand && !selection.isValidEditSelection()) {
          return null;
        }

        // 如果无选区，忽略
        if (!selection.getRange()) {
          return null;
        }

        // 执行
        var result = void 0;
        var customerName = '_' + name;
        // console.time('commandTIME')
        if (this[customerName]) {


          // 有自定义事件
          result = this[customerName](value);

          // 自定义的command有可能改变选区，所以需要重新保存,恢复光标
          selection.saveRange();
          selection.restoreSelection();
        } else if (!selection.isInsideMediaBox()) {

          selection.restoreSelection();
          // 默认 command
          result = this.execCommand(name, value);
          selection.saveRange();
          // editor.focusNative();
        } else {

          selection.restoreSelection();
        }

        // 触发 onchange
        editor.handleHtmlChange(false);
        if (!isDonotCaptureCommand) {
          // 强制保存快照
          editor.emit(EVENT.CAPTRUE);
        }
        // console.timeEnd('commandTIME')

        return result;
      }

      // 获取编辑内容(已处理干净的)
      // _getContent() {
      //   return this.editor.getContent();
      // }

      // 自定义 insertHTML 事件

    }, {
      key: '_insertHTML',
      value: function _insertHTML(html) {
        var editor = this.editor;
        var range = editor.selection.getRange();

        // 保证传入的参数是 html 代码
        var test = /^<.+>$/.test(html);
        if (!test && !UA.isWebkit()) {
          // webkit 可以插入非 html 格式的文字
          throw new Error('执行 insertHTML 命令时传入的参数必须是 html 格式');
        }

        if (this.queryCommandSupported('insertHTML')) {
          // W3C
          this.execCommand('insertHTML', html);
        } else if (range.insertNode) {
          // IE
          range.deleteContents();
          range.insertNode($(html)[0]);
        } else if (range.pasteHTML) {
          // IE <= 10
          range.pasteHTML(html);
        }
      }

      // 插入 elem

    }, {
      key: '_insertElem',
      value: function _insertElem($elem) {
        var editor = this.editor;
        editor.selection.insertElem($elem);
      }

      // 批量插入

    }, {
      key: '_insertImgs',
      value: function _insertImgs() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ops,
          images = _ref.images;

        // console.log('_insertImgs::',images)
        var owner = this;
        var editor = this.editor;
        var imgUploader = editor.imgUploader;
        // 使用for保证照片顺序
        for (var i = 0; i < images.length; i++) {
          var _images$i = images[i],
            url = _images$i.url,
            file = _images$i.file;

          if (file && imgUploader.checkImgFile(file)) {
            // 检查文件是否合法
            owner.exec('insertImg', { file: file, title: file.name });
          } else if (url) {
            owner.exec('insertImg', { url: url });
          }
        }
      }

      // 单张插入,可以指定插入位置$imgPlaceHolderElem(插入后的图片会替换$imgPlaceHolderElem)
      // file参数可选，如果有说明不是一个网络图片，上传应使用file对象

    }, {
      key: '_insertImg',
      value: function _insertImg() {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ops,
          _ref2$url = _ref2.url,
          url = _ref2$url === undefined ? '' : _ref2$url,
          file = _ref2.file,
          _ref2$title = _ref2.title,
          title = _ref2$title === undefined ? 'image.png' : _ref2$title,
          _ref2$width = _ref2.width,
          width = _ref2$width === undefined ? 'auto' : _ref2$width,
          _ref2$height = _ref2.height,
          height = _ref2$height === undefined ? 'auto' : _ref2$height,
          _ref2$minWidth = _ref2.minWidth,
          minWidth = _ref2$minWidth === undefined ? 0 : _ref2$minWidth,
          _ref2$minHeight = _ref2.minHeight,
          minHeight = _ref2$minHeight === undefined ? 0 : _ref2$minHeight,
          _ref2$$imgPlaceHolder = _ref2.$imgPlaceHolderElem,
          $imgPlaceHolderElem = _ref2$$imgPlaceHolder === undefined ? null : _ref2$$imgPlaceHolder;

        var editor = this.editor;
        var config = editor.config;
        var selection = editor.selection;
        var imgUploader = editor.imgUploader;

        // 必选参数合法判定
        if (!file && !url) {

          return;
        }
        // 检查文件是否合法
        if (file && !imgUploader.checkImgFile(file)) {
          return;
        }
        // 如果图片本身是简书的，就不需要上传了
        var isJianshuImg = config.jianshuImgUrlRegex.test(url);

        // 如果是网路图片，需要设置宽高
        if (!file) {
          minHeight = '200px';
          minWidth = '200px';
        }

        var uploadId = imgUploader.getNewUploadId();
        var imgContainerElem = getImgPanel(url, title, uploadId, width, height, minWidth, minHeight, !isJianshuImg);
        var imgCaptionElem = imgContainerElem.find('.' + CSS.IMG_TITLE);

        // 构造上传参数
        var uploaddata = { id: uploadId };
        if (file) {
          uploaddata.file = file;
        } else {
          uploaddata.url = url;
        }

        if (!isJianshuImg) {
          // add loading
          var loadingPanel = getLoadingPanel(url, uploadId);
          var $cancelBtn = loadingPanel.find('.' + CSS.UPLOAD_CANCER_BTN);
          var $comfirBtn = loadingPanel.find('.' + CSS.UPLOAD_RETRY_BTN);

          imgContainerElem.append(loadingPanel);
        }

        if ($imgPlaceHolderElem) {
          $imgPlaceHolderElem.replace(imgContainerElem);
        } else {
          var rangEndTopElem = selection.getSelectionEndTopContainerElem();
          imgContainerElem.insertAfter(rangEndTopElem);
        }
        // 最后调用beginUpload，确保dom已插入文档
        if (!isJianshuImg) {
          // 如果是file的，需要做好预览功能
          if (file) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (evt) {
              var base64Image = evt.target.result;
              var imgElem = imgContainerElem.find('img');
              imgElem.attr('src', base64Image);
              imgUploader.beginUpload(uploaddata);
            };
          } else {
            imgUploader.beginUpload(uploaddata);
          }
        }
        selection.setCursorInElem(imgCaptionElem);
      }
    }, {
      key: '_insertLink',
      value: function _insertLink() {
        var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ops,
          url = _ref3.url,
          text = _ref3.text;

        var editor = this.editor;
        var selection = editor.selection;
        var rangElem = selection.getSelectionContainerElem();
        // console.log('insertLink::',rangElem)

        url = urlParse(url);

        var urlElem = $('<a href=\'' + url + '\' target=\'_blank\'>' + (text || url) + ' </a>');
        if (rangElem.getNodeName() === 'A') {
          rangElem.replace(urlElem);
        } else {
          // this.cmd.exec('insertHTML', `<a href="${url}" target="_blank">${text}</a>`)
          this._insertElem(urlElem);
          // selection.deleteContents
          // selection.insertNode();
        }
        selection.setCursorAfterElem(urlElem);
      }
    }, {
      key: '_insertTitle',
      value: function _insertTitle(level) {
        var editor = this.editor;
        // const $editElem = editor.$editElem;

        var selection = editor.selection;

        selection.toggleBlockTag('H' + level);
      }
    }, {
      key: '_insertBlockquote',
      value: function _insertBlockquote() {
        var editor = this.editor;
        var selection = editor.selection;
        if (selection.isInsideMediaBox()) {
          return null;
        }
        selection.toggleBlockTag('BLOCKQUOTE');
      }
    }, {
      key: '_insertHRule',
      value: function _insertHRule() {
        var editor = this.editor;
        // const $editElem = editor.$editElem;
        var selection = editor.selection;

        var rangEndTopElem = selection.getSelectionEndTopContainerElem();
        var gaplineElem = $('<hr>');
        var $p = $('<p><br></p>');
        gaplineElem.insertAfter(rangEndTopElem);
        // console.log('_insertHRule::', rangEndTopElem, gaplineElem.next());
        if (gaplineElem[0].nextElementSibling) {
          selection.setCursorInElem(gaplineElem.next());
        } else {
          $p.insertAfter(gaplineElem);
          selection.setCursorInElem($p);
        }
        // const $children = $editElem.children()
        // $editElem.append($p)
      }
    }, {
      key: '_insertVideo',
      value: function _insertVideo() {
        var videoInfo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var editor = this.editor;
        var selection = editor.selection;
        var rangEndTopElem = selection.getSelectionEndTopContainerElem();
        var videoElem = getVideoPanel(videoInfo);
        videoElem.insertAfter(rangEndTopElem);
        selection.setCursorInElem(videoElem.find('.' + CSS.VIDEO_DESCRIPTION));
      }

      // 接管了undo命令

    }, {
      key: '_undo',
      value: function _undo() {
        this.editor.history.undo();
      }

      // 接管了redo命令

    }, {
      key: '_redo',
      value: function _redo() {
        this.editor.history.redo();
      }

      // 获取当前选区中的链接信息，插入链接用
      // _getCurrentLinkInfo(){
      //   return this.editor.selection.getCurrentLinkInfo()
      // }

      // 重新聚焦到编辑器, 注意此方法会重新应用选区
      // _focus(){
      //   this.editor.selection.restoreSelection()
      // }

      /* eslint-disable class-methods-use-this */
      // 封装 execCommand

    }, {
      key: 'execCommand',
      value: function execCommand(name, value) {
        // console.log('execCommand1::',name,value)
        document.execCommand(name, false, value);
      }

      // 封装 document.queryCommandValue

    }, {
      key: 'queryCommandValue',
      value: function queryCommandValue(name) {
        return document.queryCommandValue(name);
      }

      // 封装 document.queryCommandState

    }, {
      key: 'queryCommandState',
      value: function queryCommandState(name) {
        return document.queryCommandState(name);
      }

      // 封装 document.queryCommandSupported

    }, {
      key: 'queryCommandSupported',
      value: function queryCommandSupported(name) {
        return document.queryCommandSupported(name);
      }

      /* eslint-disable class-methods-use-this */

    }]);
    return command;
  }();

  var NODETYPE = {
    ELEMENT_NODE: 1,
    TEXT_NODE: 3,
    CDataSection: 4,
    Comment: 8
  };

  var domselection = function () {
    function domselection(editor) {
      classCallCheck(this, domselection);

      this.editor = editor;
    }
    /* eslint-disable class-methods-use-this */


    createClass(domselection, [{
      key: 'newPlaceHolder',
      value: function newPlaceHolder() {
        return $('<span>').addClass(CSS.PLACE_HOLDER);
      }
      /* eslint-disable class-methods-use-this */

    }, {
      key: 'getSelectionContainerElem',
      value: function getSelectionContainerElem(range) {
        var elem = void 0;
        if (range) {
          elem = range.commonAncestorContainer;
          return $(elem.nodeType === NODETYPE.ELEMENT_NODE ? elem : elem.parentNode);
        }
      }
    }, {
      key: 'getSelectionStartElem',
      value: function getSelectionStartElem(range) {
        // range = range || this._currentRange
        var elem = void 0;
        if (range) {
          elem = range.startContainer;
          return $(elem.nodeType === NODETYPE.ELEMENT_NODE ? elem : elem.parentNode);
        }
      }
    }, {
      key: 'getSelectionEndElem',
      value: function getSelectionEndElem(range) {
        // range = range || this._currentRange
        var elem = void 0;
        if (range) {
          elem = range.endContainer;
          // console.log('getSelectionEndElem::',elem)
          return $(elem.nodeType === NODETYPE.ELEMENT_NODE ? elem : elem.parentNode);
        }
      }
      // 获取当前选区endContainer所在的最顶层的元素

    }, {
      key: 'getSelectionEndTopContainerElem',
      value: function getSelectionEndTopContainerElem(range) {
        var editor = this.editor;
        var $editElem = editor.$editElem;
        // let elem = range.commonAncestorContainer;
        var elem = range.endContainer;
        // console.log('getSelectionEndTopContainerElem::before equal',elem)

        // if ($(elem).equal($editElem) || $(elem).isContain($editElem)) {
        //     elem = range.endContainer
        // }
        // console.log('getSelectionEndTopContainerElem::',elem)
        while (!$(elem).equal($editElem) && !$(elem.parentNode).equal($editElem)) {
          // console.log('getSelectionEndTopContainerElem::parentNode::',elem)
          elem = elem.parentNode;
        }
        return $(elem);
      }
    }, {
      key: 'getTopContainerByNode',
      value: function getTopContainerByNode(node) {
        var editor = this.editor;
        var $editElem = editor.$editElem;
        var elem = node;
        while (!$(elem.parentNode).equal($editElem)) {
          elem = elem.parentNode;
        }
        return $(elem);
      }
    }, {
      key: 'isCharacterDataNode',
      value: function isCharacterDataNode(node) {
        var t = node.nodeType;
        return t === NODETYPE.TEXT_NODE || t === NODETYPE.CDataSection || t === NODETYPE.Comment; // Text, CDataSection or Comment
      }
    }, {
      key: 'getTextNodes',
      value: function getTextNodes(node) {
        var textNodes = [];
        if (!node) return textNodes;

        if (node.nodeType === 3) {
          textNodes.push(node);
        }
        var childNodes = node.childNodes;
        /* eslint-disable no-restricted-syntax */
        for (var k in childNodes) {
          if (childNodes[k].nodeType === 3) {
            textNodes.push(childNodes[k]);
          } else {
            textNodes = textNodes.concat(this.getTextNodes(childNodes[k]));
          }
        }
        /* eslint-disable no-restricted-syntax */
        return textNodes;
      }
    }, {
      key: 'getReverseTextNodes',
      value: function getReverseTextNodes(node) {
        var textNodes = [];
        if (!node) return textNodes;

        if (node.nodeType === 3) {
          textNodes.push(node);
        }
        for (var i = node.childNodes.length - 1; i >= 0; i--) {
          var child = node.childNodes[i];
          if (child.nodeType === 3) {
            textNodes.push(child);
          } else {
            textNodes = textNodes.concat(this.getReverseTextNodes(child));
          }
        }
        return textNodes;
      }
      // 用于从backupRange中从新找出textNode

    }, {
      key: 'getStartNodeFromNodes',
      value: function getStartNodeFromNodes(node, textNode) {
        var textNodes = this.getTextNodes(node);
        var result = null;
        textNodes.map(function (item) {
          if (textNode.isEqualNode(item)) {
            result = item;
          }
          return null;
        });
        return result;
        // for (const k in textNodes) {
        //   if (textNode.isEqualNode(textNodes[k])) {
        //     return textNodes[k];
        //   }
        // }
      }
    }, {
      key: 'getEndNodeFromNodes',
      value: function getEndNodeFromNodes(node, textNode) {
        var textNodes = this.getReverseTextNodes(node);
        var result = void 0;
        textNodes.map(function (item) {
          if (textNode.isEqualNode(item)) {
            result = item;
          }
          return null;
        });
        return result;
        // for (const k in textNodes) {
        //   if (textNode.isEqualNode(textNodes[k])) {
        //     return textNodes[k];
        //   }
        // }
      }
      // 用于从backupRange中恢复光标位置

    }, {
      key: 'findNewRange',
      value: function findNewRange(node, oldRange) {
        var _oldRange = slicedToArray(oldRange, 2),
          oldStart = _oldRange[0],
          oldEnd = _oldRange[1];

        var newStart = this.getStartNodeFromNodes(node, oldStart);
        var newEnd = this.getEndNodeFromNodes(node, oldEnd);
        return [newStart, newEnd];
      }
      // getPElemByNode(node) {
      //   while (node && $(node).getNodeName() !== 'P') {
      //     node = node.parentNode;
      //   }
      //   return $(node);
      // }

      /* eslint-disable class-methods-use-this */

    }, {
      key: 'getCurrentParagraph',
      value: function getCurrentParagraph(range) {
        // debugger
        return getPElemByNode(range.commonAncestorContainer);
      }
      /* eslint-disable class-methods-use-this */

    }, {
      key: 'getSelectedTopNodes',
      value: function getSelectedTopNodes(range) {
        var startTopContainer = this.getTopContainerByNode(range.startContainer);
        var endTopContainer = this.getTopContainerByNode(range.endContainer);
        var selectedNodes = [];

        // console.log('getSelectedTopNodes::',startTopContainer,endTopContainer)

        while (!startTopContainer.equal(endTopContainer)) {
          selectedNodes.push(startTopContainer[0]);
          startTopContainer = startTopContainer.next();
        }
        selectedNodes.push(endTopContainer[0]);
        return selectedNodes;
      }
    }, {
      key: 'detectHasSurrounded',
      value: function detectHasSurrounded(nodes, tagName) {
        var result = true;
        nodes.map(function (node) {
          // console.log('detectHasSurrounded::', node, tagName, isContainer(node), $(node).getNodeName());
          if (isContainer(node) && !($(node).getNodeName() === tagName)) {
            result = false;
          }
          return null;
        });
        return result;
      }
    }, {
      key: 'toggleBlockTag',
      value: function toggleBlockTag(tagName, range) {
        var selectedNodes = this.getSelectedTopNodes(range);
        if (selectedNodes.length === 0) {
          return;
        }
        // console.log('toggleBlockTag::', selectedNodes);
        if (this.detectHasSurrounded(selectedNodes, tagName)) {
          this.removeSurroundBlockTag(selectedNodes, tagName, range);
        } else {
          this.surroundBlockTag(selectedNodes, tagName, range);
        }
      }
    }, {
      key: 'removeSurroundBlockTag',
      value: function removeSurroundBlockTag(nodes, tagName) {
        var editor = this.editor;
        var selection = editor.selection;
        var placeHolder = this.newPlaceHolder();
        $(nodes[0]).before(placeHolder);
        var firstNode = void 0;
        var lastNode = void 0;

        // let len = nodes.length;
        // let restart = false;
        var newContent = void 0;
        if (~['PRE', 'BLOCKQUOTE'].indexOf(tagName)) {
          // 引用的处理

          // 遍历每一个top container
          nodes.map(function (node) {
            node = $(node);
            if (node.getNodeName() === 'BLOCKQUOTE') {
              var children = node.children();
              children.forEach(function (child) {
                node.before($(child));
                // 因为dom变化了，所以需要保存新的起止点，用于applyRange
                if (!firstNode) {
                  firstNode = child;
                }
                lastNode = child;
              });
              // dom删除
              node.remove();
            }
            return null;
          });
          // selection.applyRange(range);
          selection.applyRange({
            startContainer: firstNode,
            endContainer: lastNode,
            startOffset: 0,
            endOffset: $(lastNode).contents().length
          });
        } else if (/H\d/i.test(tagName)) {
          // 标题的处理

          // 遍历每一个top container
          nodes.map(function (node) {
            node = $(node);
            if (node.getNodeName() === tagName) {
              newContent = $('<p>');
              newContent.append(node.contents());
              node.replace(newContent);
              if (!firstNode) {
                firstNode = newContent[0];
              }
              lastNode = newContent[0];
            } else {
              if (!firstNode) {
                firstNode = node[0];
              }
              lastNode = node[0];
            }
            return null; // array-callback-return
          });

          // console.log('removeSurroundBlockTag::title range', firstNode, lastNode);
          selection.applyRange({
            startContainer: firstNode,
            startOffset: 0,
            endContainer: lastNode,
            endOffset: $(lastNode).contents().length
          });
        }
        placeHolder.remove();
      }
    }, {
      key: 'surroundBlockTag',
      value: function surroundBlockTag(nodes, tagName) {
        var editor = this.editor;
        var selection = editor.selection;
        var placeHolder = this.newPlaceHolder();
        $(nodes[0]).before(placeHolder);
        var firstNode = void 0;
        var lastNode = void 0;

        // const lastNode = nodes[nodes.length - 1]
        var len = nodes.length;
        var restart = false;
        var newContent = $('<' + tagName + '>');

        // 引用的处理
        if (~['PRE', 'BLOCKQUOTE'].indexOf(tagName)) {
          // 遍历每一个top container
          for (var i = 0; i < len; i++) {
            var node = $(nodes[i]);
            // console.log('surroundBlockTag::', node);
            // 默认就是最后一个，后面如果修改了dom，需要更改lastNode
            lastNode = node[0];

            if (isGapNode(node[0])) {
              // console.log('surroundBlockTag:isGapNode',newContent)
              // 如果不是一个空的newContent才插入，比如第一个selected node就是isGapNode的话，此时插入的就是一个空newContent
              if (newContent.html()) {
                placeHolder.replace(newContent);
              }
              newContent = $('<' + tagName + '>');
              restart = true;
            } else if (node.getNodeName() === 'BLOCKQUOTE') {
              // 如果本省就是引用，需要合并到新引用中
              if (restart) {
                node.before(placeHolder);
              }
              restart = false;

              var children = node.children();
              children.forEach(function (child) {
                // 因为dom变化了，所以需要保存新的起止点，用于applyRange
                if (!firstNode) {
                  firstNode = child;
                }
                lastNode = child;
                newContent.append($(child));
              });
              node.remove();
            } else {
              if (restart) {
                node.before(placeHolder);
              }
              restart = false;
              if (node.getNodeName() !== 'P') {
                // 此处有dom变化，所以需要记录range的范围
                var newNode = $('<p>').html(node.html());
                if (!firstNode) {
                  firstNode = newNode[0];
                }
                lastNode = newNode[0];
                newContent.append(newNode);
                node.remove();
              } else {
                newContent.append(node);
              }
            }
            if (!firstNode) {
              firstNode = node[0];
            }
          }
          placeHolder.replace(newContent);

          // console.log(nodes, nodes[nodes.length - 1]);
          selection.applyRange({
            startContainer: firstNode,
            startOffset: 0,
            endContainer: lastNode,
            endOffset: $(lastNode).contents().length
          });
        } else if (/H\d/i.test(tagName)) {
          // 标题的处理
          nodes.map(function (node) {
            // console.log('surroundBlockTag::', node);
            if (isGapNode(node)) {
              restart = true;
              return null;
            }
            if (restart) {
              $(node).before(placeHolder);
            }
            if (~['PRE', 'BLOCKQUOTE'].indexOf($(node).getNodeName())) {
              var contents = $(node).contents();
              contents.forEach(function (cnode) {
                newContent = $('<' + tagName + '>');
                newContent.html($(cnode).html() || $(cnode).text());
                placeHolder.before(newContent);
                // save range
                if (!firstNode) {
                  firstNode = newContent[0];
                }
              });
            } else {
              newContent = $('<' + tagName + '>');
              newContent.html($(node).html() || $(node).text());
              placeHolder.before(newContent);
            }
            // remove self
            $(node).remove();

            // save range
            if (!firstNode) {
              firstNode = newContent[0];
            }
            lastNode = newContent[0];
            return null;
          });

          placeHolder.remove();
          // console.log('surroundBlockTag::applyRange', firstNode, lastNode);
          selection.applyRange({
            startContainer: firstNode,
            startOffset: 0,
            endContainer: lastNode,
            endOffset: $(lastNode).contents().length
          });
        }
      }
    }]);
    return domselection;
  }();

  var UA$1 = navigator.userAgent;
  var Detector = {
    isMozilla: function isMozilla() {
      return $('body').hasClass('mozilla') || UA$1.match(/(?:firefox|fxios)\/(\d+)/);
    },
    lessThanIE8: function lessThanIE8() {},
    isEdge: function isEdge() {
      var reg = /Edge/;
      return reg.test(UA$1);
    },
    // 是否 webkit
    isWebkit: function isWebkit() {
      var reg = /webkit/i;
      return reg.test(UA$1);
    },
    // 是否 IE
    isIE: function isIE() {
      return $('body').hasClass('ie') || 'ActiveXObject' in window;
    },
    canPasteImage: function canPasteImage() {
      return window.navigator.userAgent.toLowerCase().indexOf('chrome') > 0 || window.navigator.userAgent.toLowerCase().indexOf('chromium');
    },
    canUseSelection: function canUseSelection() {},
    canInsertHTML: function canInsertHTML() {},
    isMac: function isMac() {
      return (/(MacPPC|MacIntel|Mac_PowerPC|Macintosh|(Mac\sOS\sX))/.test(UA$1)
      );
    }
  };

  var Selection = function () {
    function Selection(editor) {
      classCallCheck(this, Selection);


      this.editor = editor;
      this.currentRange = null;
      this.doms = new domselection(editor);

    }
    // 获取 当前range 对象


    createClass(Selection, [{
      key: 'getRange',
      value: function getRange() {
        return this.currentRange;
      }
    }, {
      key: 'isCollapsed',
      value: function isCollapsed() {
        return this.currentRange.collapsed;
      }

      // 获取选取长度

    }, {
      key: 'getSelectionLength',
      value: function getSelectionLength() {
        return this.currentRange.endOffset - this.currentRange.startOffset;
      }
    }, {
      key: 'isSelectionInEditor',
      value: function isSelectionInEditor() {
        var _range = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getRange();

        var editor = this.editor;
        var $editElem = editor.$editElem;

        // 判断选区内容是否在编辑内容之内
        var $containerElem = this.getSelectionContainerElem(_range);


        if (!$containerElem) {
          return false;
        }
        if ($editElem.isContain($containerElem)) {
          return true;
        }
        return false;
      }

      /*
       * 设置rang对象或者保存当前range对象
       * */

    }, {
      key: 'saveRange',
      value: function saveRange(_range) {


        if (_range) {
          // 保存已有选区
          this.currentRange = _range;
          return;
        }

        // 获取当前的选区
        var selection = window.getSelection();
        // const selection = rangy.getSelection($editElem[0]);
        if (selection.rangeCount === 0) {
          return;
        }
        _range = selection.getRangeAt(0);
        // 判断选区内容是否在编辑内容之内
        if (this.isSelectionInEditor(_range)) {

          this.currentRange = _range;
        }
      }
      // 备份选区

    }, {
      key: 'backupRange',
      value: function backupRange(range) {

        if (!range) {
          range = this.currentRange;

        }

        var editor = this.editor;
        var $editElem = editor.$editElem;

        var doms = this.doms;

        var startContainer = range.startContainer;
        var startOffset = range.startOffset;

        var endContainer = range.endContainer;
        var endOffset = range.endOffset;
        if (startContainer === endContainer && startOffset === endOffset) {
          $(endContainer).after(doms.newPlaceHolder());
        } else {
          // insert placeholder
          $(startContainer).before(doms.newPlaceHolder());
          $(endContainer).after(doms.newPlaceHolder());
        }
        var backupElemTmp = editor.$editElem.clone();
        // clear the placeholder
        $editElem.find('.' + CSS.PLACE_HOLDER).remove();

        return {
          collapsed: range.collapsed,
          backupElem: backupElemTmp,
          startOffset: range.startOffset,
          endOffset: range.endOffset,
          startContainer: $(range.startContainer).clone(),
          endContainer: $(range.endContainer).clone()
        };
      }
    }, {
      key: 'applyRange',
      value: function applyRange(rangeBackup) {


        var editor = this.editor;
        var $editElem = editor.$editElem;
        var newRange = document.createRange();
        // const newRange = rangy.createRange();
        if (!rangeBackup || !rangeBackup.startContainer && !rangeBackup.endContainer) {
          newRange.selectNodeContents($editElem[0]);
          return;
        }
        /* eslint-disable no-empty */
        try {
          if (rangeBackup.startContainer) {
            newRange.setStart(rangeBackup.startContainer, rangeBackup.startOffset || 0);
          } else {
            newRange.setStart(rangeBackup.endContainer, 0);
          }
        } catch (e1) {}

        try {
          if (rangeBackup.endContainer) {
            newRange.setEnd(rangeBackup.endContainer, rangeBackup.endOffset || 0);
          } else {
            newRange.setEnd(rangeBackup.startContainer, $(rangeBackup.startContainer).contents().length);
          }
        } catch (e2) {}

        // try {
        //   rangy.getSelection(window).setSingleRange(newRange);
        // } catch (e3) {}
        /* eslint-disable no-empty */
        this.saveRange(newRange);
        this.restoreSelection();
      }

      // 选区的 $Elem

    }, {
      key: 'getSelectionContainerElem',
      value: function getSelectionContainerElem() {
        var range = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentRange;

        return this.doms.getSelectionContainerElem(range);
      }
    }, {
      key: 'getSelectionStartElem',
      value: function getSelectionStartElem() {
        var range = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentRange;

        return this.doms.getSelectionStartElem(range);
      }

      // 获取选区所在的最后一个元素

    }, {
      key: 'getSelectionEndElem',
      value: function getSelectionEndElem() {
        var range = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentRange;

        return this.doms.getSelectionEndElem(range);
      }

      // 获取当前选区所在的最顶层的元素

    }, {
      key: 'getSelectionEndTopContainerElem',
      value: function getSelectionEndTopContainerElem() {
        return this.doms.getSelectionEndTopContainerElem(this.currentRange);
      }

      // 选中当前光标所在的P标签

    }, {
      key: 'getCurrentParagraph',
      value: function getCurrentParagraph() {
        var range = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentRange;

        return this.doms.getCurrentParagraph(range);
      }
    }, {
      key: 'getTopContainerByNode',
      value: function getTopContainerByNode(node) {
        return this.doms.getTopContainerByNode(node);
      }
      // 获取选中的所有顶部元素

    }, {
      key: 'getSelectedTopElems',
      value: function getSelectedTopElems() {
        var range = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentRange;

        return this.doms.getSelectedTopElems(range);
      }

      // 选中区域是否合法可编辑
      // 有些区域可以点击，但是编辑了会出现不可控的效果，这些区域一律禁止编辑好了

    }, {
      key: 'isValidEditSelection',
      value: function isValidEditSelection() {
        var editor = this.editor;
        var range = this.currentRange;
        var elem = range.endContainer;

        if ($(elem).equal(editor.$editElem) || !elem.parentNode) {

          return false;
        }

        return true;
      }
      // 选区是否为空

    }, {
      key: 'isSelectionEmpty',
      value: function isSelectionEmpty() {
        var range = this.currentRange;
        if (range && range.startContainer) {
          if (range.startContainer === range.endContainer) {
            if (range.startOffset === range.endOffset) {
              return true;
            }
          }
        }
        return false;
      }
      // 删除选区内容

    }, {
      key: 'clearRange',
      value: function clearRange() {
        var range = this.getRange();
        if (!range.collapsed) {
          var placeholder = this.doms.newPlaceHolder();
          this.insertElem(placeholder, true);
          this.saveRange();
        }
      }
      // 恢复选区,显示光标

    }, {
      key: 'restoreSelection',
      value: function restoreSelection() {
        var currentRange = this.currentRange;

        var selection = window.getSelection();
        var $editElem = this.editor.$editElem;
        var range = void 0;
        if (selection.rangeCount > 0) {
          range = selection.getRangeAt(0);
        }
        if (range && range.startContainer === currentRange.startContainer && range.endContainer === currentRange.endContainer && range.startOffset === currentRange.startOffset && range.endOffset === range.endOffset) {
          this.saveRange(range);

        } else {
          selection.removeAllRanges();
          selection.addRange(currentRange);
        }

        // 自动滚动到选区位置
        this.scrollToRange();

        // fire fox cannot auto focus
        this.editor.focusNative();
      }
      // 根据 $Elem 设置选区

    }, {
      key: 'createRangeByElem',
      value: function createRangeByElem($elem, toStart, isContent) {
        // $elem - 经过封装的 elem
        // toStart - true 开始位置，false 结束位置
        // isContent - 是否选中Elem的内容
        if (!$elem.length) {
          return;
        }
        var elem = $elem[0];
        // const range = rangy.createRange();
        var range = document.createRange();
        if (isContent) {
          range.selectNodeContents(elem);
        } else {
          range.selectNode(elem);
        }
        // range.collapseBefore(elem)
        if (typeof toStart === 'boolean') {
          range.collapse(toStart);
        }

        // 存储 range
        this.saveRange(range);
      }
    }, {
      key: 'scrollToRange',
      value: function scrollToRange(range) {
        if (!range) {
          range = this.currentRange;
        }

        var editor = this.editor;
        var start = range.startContainer;
        var end = range.endContainer;
        // console.log('scrollTop::start::end',start,end)
        if (start.nodeType === NODETYPE.TEXT_NODE) {
          start = start.parentNode;
        }
        if (end.nodeType === NODETYPE.TEXT_NODE) {
          end = end.parentNode;
        }
        if (!start.getBoundingClientRect || !end.getBoundingClientRect) return;
        // 注意如果元素本身是display:none的话，getBoundingClientRect方法获取到的结果是0，所以不能准确获取display:none的元素的数据
        var isVisible = false;
        try {
          var style = window.getComputedStyle(this.getSelectionContainerElem()[0]);
          isVisible = style.display === 'none' ? false : true;
        } catch (e) {}
        if (!isVisible) {
          return;
        }
        var startRect = start.getBoundingClientRect();
        var endRect = end.getBoundingClientRect();
        var top = startRect.top < endRect.top ? startRect.top : endRect.top;
        var bottom = startRect.bottom > endRect.bottom ? startRect.bottom : endRect.bottom;

        var editElem = editor.$editElem[0];
        var clientH = editElem.clientHeight;
        var rect = editElem.getBoundingClientRect();
        var verticalDiff = 0;
        // Logger('scrollToRange::BRGIN', editElem.scrollHeight, editElem.clientHeight, startRect, endRect, top, bottom, rect);

        // 不在可视范围内
        if (top + 100 > rect.bottom) {
          // 给一个元素设置超过本身scrollH的scrollTop，会默认滚动到底部
          verticalDiff = bottom - rect.bottom + clientH / 2;
        } else if (bottom - 100 < rect.top) {
          // 给一个元素设置一个负值的scrollTop，会默认滚动到顶部
          verticalDiff = -(rect.top - bottom + clientH / 2);
        }

        if (verticalDiff !== 0) {

          editElem.scrollTop += verticalDiff;
        }
      }
      // TODO delete

    }, {
      key: 'insertNode',
      value: function insertNode(node) {
        var range = this.currentRange;
        range.insertNode(node);
      }
    }, {
      key: 'getTextNodes',
      value: function getTextNodes(elem) {
        return this.doms.getTextNodes(elem[0]);
      }
    }, {
      key: 'selectNodeContents',
      value: function selectNodeContents(node) {
        var range = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.createRange();
        var collapse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (range) {
          range.selectNodeContents(node);
          if (typeof collapse === 'boolean') {
            range.collapse(collapse);
          }
          this.saveRange(range);
          this.restoreSelection();
          // @getSelection()?.setSingleRange(range)
        }
      }

      // 选中全部节点

    }, {
      key: 'selectElem',
      value: function selectElem($elem) {
        var range = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.createRange();

        if (range) {
          range.selectNode($elem[0]);
          this.saveRange(range);
          this.restoreSelection();
          // @getSelection()?.setSingleRange(range)
        }
      }

      // 设置光标

    }, {
      key: 'setCursorInElem',
      value: function setCursorInElem($elm) {
        this.createRangeByElem($elm, false, true);
        this.restoreSelection();
      }
    }, {
      key: 'setCursorBeforeElem',
      value: function setCursorBeforeElem($elem) {
        this.createRangeByElem($elem, true, true);
        this.restoreSelection();
      }
    }, {
      key: 'setCursorAfterElem',
      value: function setCursorAfterElem($elem) {
        this.createRangeByElem($elem, false, false);
        this.restoreSelection();
      }
      // 光标是否在图片或者视屏里

    }, {
      key: 'isInsideMediaBox',
      value: function isInsideMediaBox() {
        if (!this.currentRange) return false; // 如果没有光标，返回false
        var $rangEndTopElem = this.getSelectionEndTopContainerElem();
        // 为了兼容原来的文章能继续编写，所以只能区别对待，不能统一一个Class名字
        return $rangEndTopElem.hasClass(CSS.IMG_CONTAINER) || $rangEndTopElem.hasClass(CSS.VIDEO_CONTAINER);
      }
      // 光标是否在图片或者视屏的标题里

    }, {
      key: 'isInMediaCaption',
      value: function isInMediaCaption() {
        var $editElem = this.editor.$editElem;
        var $rangContainer = this.getSelectionContainerElem();
        var classNames = CSS.IMG_TITLE + ' ' + CSS.VIDEO_DESCRIPTION;
        var result = !!$rangContainer.findReverse(classNames, $editElem);
        return result;
      }
      // 跳至上一行

    }, {
      key: 'jumpToPreLine',
      value: function jumpToPreLine(elem) {
        var preElem = elem.pre();
        if (preElem.getNodeName() !== 'P') {
          preElem = $('<p><br></p>');
          elem.before(preElem);
        } else if (preElem.text() === '') {
          preElem.html('<br>');
        }
        this.setCursorInElem(preElem);
      }
      // 跳至下一行

    }, {
      key: 'jumpToNextLine',
      value: function jumpToNextLine(elem) {
        var nextElem = elem.next();
        // 后面没有元素或者不是P，均新增一行
        if (nextElem.getNodeName() !== 'P') {
          nextElem = $('<p><br></p>');
          elem.after(nextElem);
        } else if (nextElem.text() === '') {
          nextElem.html('<br>');
        }
        this.setCursorInElem(nextElem);
      }
    }, {
      key: 'toggleBlockTag',
      value: function toggleBlockTag(tagName) {
        var range = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.currentRange;

        this.doms.toggleBlockTag(tagName, range);
      }
      // 获取当前选区中的链接信息

    }, {
      key: 'getCurrentLinkInfo',
      value: function getCurrentLinkInfo() {
        var rangContainer = this.getSelectionContainerElem();
        var range = this.getRange();
        var docFrag = range.cloneContents() || document.createDocumentFragment();
        var linkElem = $(docFrag).find('a');
        var linkInfo = {
          url: '',
          text: ''
        };

        if (rangContainer.getNodeName() === 'A') {
          linkInfo.url = rangContainer.attr('href');
          linkInfo.text = rangContainer.text();
        } else if (linkElem.length > 0) {
          linkInfo.url = linkElem.first().attr('href');
          linkInfo.text = linkElem.first().text();
        } else {
          linkInfo.text = $(docFrag).text();
        }

        return linkInfo;
      }

      // 插入 elem

    }, {
      key: 'insertElem',
      value: function insertElem($elem, isCollapsed) {
        var range = this.getRange();
        if (range.insertNode) {
          range.deleteContents();
          range.insertNode($elem[0]);
          isCollapsed && this.setCursorInElem($elem);
        }
      }
      /** 调用这个方法前须确保光标是在p标签中
       * needNewBlankLine 是否需要新空白行（回车键是需要增加，但是复制和黏贴不需要）
       **/

    }, {
      key: 'breakOnePtoTwoP',
      value: function breakOnePtoTwoP(range) {
        var autoFocus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var needNewBlankLine = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        if (!range) {
          range = this.getRange();
        }

        if (!range.collapsed) {
          range.deleteContents();
        }
        var curPElem = this.getCurrentParagraph();
        if (curPElem.length === 0) {
          return;
        }

        // 空行不需要截断
        if (curPElem.text().trim() === '') {
          return;
        }
        var lastElement = curPElem.contents().last();
        var textNodes = this.getTextNodes(lastElement);
        if (textNodes && textNodes.length) {
          var textNode = textNodes[textNodes.length - 1];
          range.setEnd(textNode, textNode.length);
        }
        var contents = $(range.cloneContents());
        var newParagraph = $('<p>');
        if (contents.length > 0) {
          newParagraph.append(contents);
        }
        // 如果不需要增加新的空白行，直接return
        if (!needNewBlankLine && newParagraph.html() === '') {
          return;
        }
        range.deleteContents();
        if (curPElem.html() === '') {
          Detector.isIE() ? curPElem.html('') : curPElem.html('<br>');
        }
        if (newParagraph.html() === '') {
          Detector.isIE() ? newParagraph.html('') : newParagraph.html('<br>');
        }
        curPElem.after(newParagraph);
        autoFocus && this.setCursorBeforeElem(newParagraph);
      }
      // 插入html或者text

    }, {
      key: 'insertHtml',
      value: function insertHtml(html) {
        var next = $('<span>').html(html);
        var lastChild = $(next[0].lastChild);
        this.insertElem(next);
        next.unpack();
        this.setCursorAfterElem(lastChild);
      }
    }, {
      key: 'isInHeader',
      value: function isInHeader() {
        var range = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getRange();

        if (!range.collapsed) {
          return false;
        }
        if (range.startOffset === 0) {
          return true;
        }
        return false;
      }
    }, {
      key: 'isInMediaCaptionHeader',
      value: function isInMediaCaptionHeader() {
        var range = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getRange();

        if (!this.isInHeader(range)) {
          return false;
        }
        if (!this.isInMediaCaption()) {
          return false;
        }
        return true;
      }
    }]);
    return Selection;
  }();

  var KEYCODE = {

    LEFT_KEY: 37,
    UP_KEY: 38,
    RIGHT_KEY: 39,
    DOWN_KEY: 40,
    ESC_KEY: 27,

    C_KEY: 67,
    R_KEY: 82,
    T_KEY: 84,
    Y_KEY: 89, // Y
    Z_KEY: 90, // Z
    S_KEY: 83, // S
    ENTER_KEY: 13, // 回车
    TAB_KEY: 9, // TAB
    BACK_KEY: 8, // 退格
    DEL_KEY: 46 // delete按键
  };

// import KeyCode from '@enum/keycode';
// import CSS_NAME from '@enum/cssname';
  function enterKeyHandle(editor) {
    var $editElem = editor.$editElem;
    var selection = editor.selection;

    // 将回车之后生成的非 <p> 的顶级标签，改为 <p>
    function pHandle() {
      // console.log('pHandle:::')
      var $selectionElem = editor.selection.getSelectionContainerElem();
      var $parentElem = $selectionElem.parent();
      if (!$parentElem.equal($editElem)) {
        // 不是顶级标签
        return;
      }
      var nodeName = $selectionElem.getNodeName();
      if (nodeName === 'P') {
        // 当前的标签是 P ，不用做处理
        return;
      }
      if ($selectionElem.text()) {
        // 有内容，不做处理
        return;
      }
      // 插入 <p> ，并将选取定位到 <p>，删除当前标签
      var $p = $('<p>a</p>');
      $p.insertBefore($selectionElem);
      $selectionElem.remove();
      editor.selection.createRangeByElem($p, true, true);
      editor.selection.restoreSelection();
      $p.html('<br>');
    }
    editor.on(EVENT.ENTER_KEY_UP, function (e) {
      pHandle(e);
    });

    // 多媒体元素（图片或者视频）特殊处理
    function mediaHandle(e) {
      // const $rangEndElem = selection.getSelectionEndElem();
      // console.log('mediaHandle:::',$rangEndElem)
      // 图片后面不允许回车
      // 如果是在标题按回车键，在后面新增p标签
      if (selection.isInMediaCaption()) {
        e.preventDefault();
        var $rangTopElem = editor.selection.getSelectionEndTopContainerElem();
        // console.log('mediaHandle:::',$rangTopElem)
        selection.jumpToNextLine($rangTopElem);
      }
    }

    // // <pre><code></code></pre> 回车时 特殊处理
    // function codeHandle(e) {
    //   const $selectionElem = editor.selection.getSelectionContainerElem();
    //   if (!$selectionElem) {
    //     return;
    //   }
    //   const $parentElem = $selectionElem.parent();
    //   const selectionNodeName = $selectionElem.getNodeName();
    //   const parentNodeName = $parentElem.getNodeName();


    //   if (selectionNodeName !== 'CODE' || parentNodeName !== 'PRE') {
    //     // 不符合要求 忽略
    //     return;
    //   }

    //   if (!editor.cmd.queryCommandSupported('insertHTML')) {
    //     // 必须原生支持 insertHTML 命令
    //     return;
    //   }

    //   const startOffset = editor.selection.getRange().startOffset;
    //   editor.cmd.exec('insertHTML', '\n');
    //   editor.selection.saveRange();
    //   if (editor.selection.getRange().startOffset === startOffset) {
    //     // 没起作用，再来一遍
    //     editor.cmd.exec('insertHTML', '\n');
    //   }

    //   // 阻止默认行为
    //   e.preventDefault();
    // }
    // 引用处理
    function blockquoteHandle(e) {
      // shift+enter的话，不做处理
      if (e.shiftKey) {
        return true;
      }
      var range = selection.getRange();
      var $rangEndTopElem = selection.getSelectionEndTopContainerElem();
      if ($rangEndTopElem.getNodeName() === 'BLOCKQUOTE') {
        var paragraphs = $rangEndTopElem.children();
        var curPElem = selection.getCurrentParagraph();
        // 最后一个空P标签，就跳出到新一行
        // console.log('blockquoteHandle:::', paragraphs, paragraphs.last(), curPElem);
        if (curPElem.equal(paragraphs.last()) && curPElem.text() === '') {
          selection.jumpToNextLine($rangEndTopElem);
          curPElem.remove();
          // 如果是空引用直接删除
          // console.log('blockquoteHandle::如果是空引用直接删除',$rangEndTopElem.children())
          if ($rangEndTopElem.children().length === 0) {
            $rangEndTopElem.remove();
          }
        } else {
          selection.breakOnePtoTwoP(null, true);
        }
        e.preventDefault();
      }
    }
    // 标题处理,标题回车默认产生div，不能忍
    editor.on(EVENT.ENTER_KEY_DOWN, function (e) {
      mediaHandle(e);
      blockquoteHandle(e);
      // hTitlehandle(e);
      // codeHandle(e)
    });
  }

// import KeyCode from '@enum/keycode';
// import CSS_NAME from '@enum/cssname';
  var deleteKeyHandle = function (editor) {
    var $editElem = editor.$editElem;
    var selection = editor.selection;

    var emptyHtml = ['', '<br>', '<p><br></p>', '<p></p><br>'];
    // 确保不会被删除过头，保证有个<p><br></p>
    function ensureLastElem() {

      var $p = void 0;
      // const text = $editElem.text().toLowerCase().trim()
      var html = $editElem.html().toLowerCase().trim();
      // console.log('ensureLastElem::',html)
      // firefox 时用 html === '<br>' 判断，其他用 !html 判断
      if (~emptyHtml.indexOf(html)) {
        // 内容空了
        $p = $('<p><br></p>');
        $editElem.html(''); // 一定要先清空，否则在 firefox 下有问题
        $editElem.append($p);
        editor.selection.setCursorInElem($p);
      }
    }
    editor.on(EVENT.DEL_KEY_DOWN, function (e) {
      selection.saveRange(); // force save for getting the precise selection

      var targetElem = selection.getSelectionEndElem();
      var topElem = selection.getSelectionEndTopContainerElem();
      // 光标在标题头部的话，不允许删除
      if (selection.isInMediaCaptionHeader()) {
        e.preventDefault();
        return;
      }
      // 多媒体元素（图片或者视频）标题不能单独删除
      if (selection.isInMediaCaption()) {
        var text = targetElem.html();
        var selectionLen = selection.getSelectionLength();
        if (text.length <= 1 || selectionLen === text.length) {
          targetElem.html('');
          e.preventDefault();
        }
        return;
      }

      // 开头在标题内，却又选中了其他元素的情况，咔嚓，只选中标题
      var $rangeStartElem = selection.getSelectionStartElem();
      var classNames = CSS.IMG_TITLE + ' ' + CSS.VIDEO_DESCRIPTION;
      var captionElem = $rangeStartElem.findReverse(classNames, $editElem);
      if (captionElem) {
        var placeHolder = selection.doms.newPlaceHolder();
        captionElem.append(placeHolder);
        var range = selection.getRange();
        var lastElm = placeHolder.preNode();
        range.setEnd(lastElm[0], (lastElm.html() || lastElm.text()).length);
        range.deleteContents();
        placeHolder.remove();
        captionElem.html(captionElem.html().trim().replace('\"', ''));

        setTimeout(function () {
          selection.setCursorInElem(captionElem);
        }, 0);
        e.preventDefault();
        return;
      }

      // 删除多媒体元素（图片或者视频）的同时删除标题
      // Logger('DEL_KEY_DOWN::', selection.getSelectionEndTopContainerElem())
      if (selection.isInsideMediaBox()) {
        var $mediaElem = topElem;
        var index = $mediaElem.data('index');
        var imgUploader = editor.imgUploader;
        imgUploader.uploadDataCache[index] = null; // clear cache
        $mediaElem.remove();
        e.preventDefault();
        return;
      }
      // 如果光标在media元素之后一个元素的头部
      // const topElemPre = topElem.pre();
      // if (selection.isInHeader() && (topElemPre.hasClass(CSS.IMG_CONTAINER) || topElemPre.hasClass(CSS.VIDEO_CONTAINER))) {
      //   e.preventDefault();
      // }

      // 最后处理这种情况
      var txtHtml = $editElem.html().toLowerCase().trim();
      if (~emptyHtml.indexOf(txtHtml)) {
        // 最后剩下一个空行，就不再删除了
        e.preventDefault();
      }
    });

    editor.on(EVENT.DEL_KEY_UP, ensureLastElem);
  };

// import $ from '@util/dom';
// import KeyCode from '@enum/keycode';

  var tabKeyHandle = function (editor) {
    // const $editElem = editor.$editElem;

    editor.on(EVENT.TAB_KEY_DOWN, function (e) {
      if (!editor.cmd.queryCommandSupported('insertHTML')) {
        // 必须原生支持 insertHTML 命令
        e.preventDefault();
        return;
      }
      var $selectionElem = editor.selection.getSelectionContainerElem();
      if (!$selectionElem) {
        return;
      }
      var $parentElem = $selectionElem.parent();
      var selectionNodeName = $selectionElem.getNodeName();
      var parentNodeName = $parentElem.getNodeName();

      if (selectionNodeName === 'CODE' && parentNodeName === 'PRE') {
        // <pre><code> 里面
        editor.cmd.exec('insertHTML', '    ');
      } else {
        // 普通文字
        editor.cmd.exec('insertHTML', '&nbsp;&nbsp;&nbsp;&nbsp;');
      }

      e.preventDefault();
    });
  };

  /*
   粘贴信息的处理
   */

  function checkPastedImage(editor) {
    var $editElem = editor.$editElem;
    var selection = editor.selection;
    var cmd = editor.cmd;

    var needToUploadingImgs = $editElem.find('.need-to-insert-img');
    needToUploadingImgs.forEach(function (node) {
      var $elem = $(node);
      var $topContainer = selection.getTopContainerByNode(node);
      if (!$elem.parent().equal($editElem)) {
        $topContainer.after($elem);
      }
      var dataUrl = $elem.data('src');
      // console.log('checkPastedImage::', dataUrl);
      if (dataUrl.substring(0, 5) === 'data:') {
        cmd.exec('insertImg', { url: dataUrl, file: dataURI2Blob(dataUrl), $imgPlaceHolderElem: $elem });
      } else {
        cmd.exec('insertImg', { url: dataUrl, $imgPlaceHolderElem: $elem });
      }
    });
  }

  function changeNBSPSpace(html) {
    if (!html) {
      return '';
    }
    // Use new replace rule, old replace rule here for removing html tag is useless now.
    html = html.replace(/&nbsp;/g, ' ').replace(/[ ]{2}/gi, '&nbsp; ');
    return html;
  }

// Get contents with lines
  function getContents(container) {
    var result = [];
    if (!container.html().match(/<\w+.*?>/)) {
      // console.log('getContents:::text');
      // support Array map func since ie9
      result = container.text().split('\n').map(function (text) {
        return text.trim();
      }).filter(function (text) {
        return text.length > 0;
      });
    } else {
      var nodes = container.contents();
      var text = '';
      var needNewLine = false;
      // console.log('getContents:===', nodes);
      nodes.forEach(function (node) {
        // console.log('getContents::node', node);
        var tag = node.tagName || '#text';
        tag = tag.toLowerCase();
        // for block level tags
        if (blockTags.indexOf(tag) >= 0) {
          if (text.length > 0) {
            result.push(text);
          }
          getContents($(node)).map(function (content) {
            return result.push(content);
          });
          text = '';
          needNewLine = true;
        } else if (tag === 'br' || tag === 'hr') {
          // for line-level tags
          if (text.length > 0) {
            result.push(text);
          }
          result.push('');
          text = '';
          needNewLine = true;
        } else if (tag === '#text') {
          // for text-nodes
          // console.log('text-nodes::', node, node.nodeType);
          if (!node.nodeType) {
            node = document.createTextNode(node);
          }
          text += $(node).text().replace(/[\n\t]*/g, '').trim();
        } else if (tag === 'img') {
          // insert image directly
          if (text.length > 0) {
            result.push(text);
          }
          text = '<div class="need-to-insert-img" data-src=' + node.src + '>need-to-insert-img</div>';
        } else if (~['a', 'b', 'strong', 'i', 'em', 'del', 'strike'].indexOf(tag)) {
          var isLink = tag === 'a';
          var isBold = ~['b', 'strong'].indexOf(tag);
          var isItalic = ~['i', 'em'].indexOf(tag);
          var isDel = ~['del', 'strike'].indexOf(tag);
          var endTag = '';
          if (isLink) {
            text += '<a href="' + node.href + '" target="_blank">';
            endTag = '</a>';
          } else if (isBold) {
            text += '<b>';
            endTag = '</b>';
          } else if (isItalic) {
            text += '<i>';
            endTag = '</i>';
          } else if (isDel) {
            text += '<del>';
            endTag = '</del>';
          }
          var rest = getContents($(node));
          if (rest.length === 1) {
            text = text + rest[0] + endTag;
          } else if (rest.length > 1) {
            rest[0] = text + rest[0];
            text = rest.pop() + endTag;
            rest.map(function (_text) {
              return result.push(_text);
            });
          }
        } else {
          // for the inline tags contains block tags
          var _rest = getContents($(node));
          if (_rest.length === 1) {
            text += _rest[0];
          } else if (_rest.length > 1) {
            _rest[0] = text + _rest[0];
            text = _rest.pop();
            _rest.map(function (_text) {
              return result.push(_text);
            });
          }
        }
      });
      if (text.length > 0) {
        result.push(text);
      }
      if (result.length > 1 && needNewLine) {
        result.push('');
      }
    }
    return result;
  }

// 获取粘贴的纯文本


// 获取粘贴的html


// 获取粘贴的图片文件

  function createHiddenEditable() {
    return $('<div>').attr('contenteditable', true).attr('aria-hidden', true).attr('tabindex', -1).css('position', 'fixed').css('overflow', 'hidden').css('left', '-10000px');
  }

  function dataURLtoBlob(dataURL, sliceSize) {
    var b64Data, byteArray, byteArrays, byteCharacters, byteNumbers, contentType, i, m, offset, ref, slice;
    if (sliceSize == null) {
      sliceSize = 512;
    }
    if (!(m = dataURL.match(/^data\:([^\;]+)\;base64\,(.+)$/))) {
      return null;
    }
    ref = m, m = ref[0], contentType = ref[1], b64Data = ref[2];
    byteCharacters = atob(b64Data);
    byteArrays = [];
    offset = 0;
    while (offset < byteCharacters.length) {
      slice = byteCharacters.slice(offset, offset + sliceSize);
      byteNumbers = new Array(slice.length);
      i = 0;
      while (i < slice.length) {
        byteNumbers[i] = slice.charCodeAt(i);
        i++;
      }
      byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
      offset += sliceSize;
    }
    return new Blob(byteArrays, {
      type: contentType
    });
  }

  var pasteHandle = function (editor) {
    var $editElem = editor.$editElem;
    var selection = editor.selection;
    var imgUploader = editor.imgUploader;

    function insertPasteContents(clipContent) {
      if (clipContent) {
        var _ret = function () {
          // 清空选区
          selection.clearRange();
          var needCheckForDataURI = false; // 是否有图片
          var container = $('<div>').html(clipContent);

          var imgs = container.find('img');
          if (imgs.length) {
            needCheckForDataURI = true;
          }
          // 获取格式化后的html/text
          var contents = getContents(container);

          var currentContainer = selection.getSelectionEndTopContainerElem();
          var newParagraph = $('<p><br></p>');
          var nodeName = currentContainer.getNodeName();

          // 如果是在blockquote和h1/2/3上复制，简单处理，只取文字
          if (nodeName === 'BLOCKQUOTE' || /H\d/i.test(nodeName)) {
            clipContent = $('<div>').html(clipContent).text();
            selection.insertHtml(clipContent);
            return {
              v: void 0
            };
          }
          // 异常情况
          if (currentContainer.equal(editor.$editElem)) {
            currentContainer.append(newParagraph);
            currentContainer = newParagraph;
            selection.setCursorInElem(newParagraph);
          } else if (isGapNode(currentContainer) || nodeName !== 'P') {
            currentContainer.after(newParagraph);
            currentContainer = newParagraph;
            selection.setCursorInElem(currentContainer);
          }

          var firstNode = contents.shift();
          if (!firstNode) return {
            v: void 0
          };

          /* 复制的首行处理，首行是需要插入到光标处的 begin */
          selection.insertHtml(firstNode);
          /* 复制的首行处理，首行是需要插入到光标处的 end */

          var restNodes = [];

          var lastNode = currentContainer,
            node = void 0;
          for (var i = contents.length - 1; i >= 0; i--) {
            node = contents[i];
            if (node && node.length > 0) {
              node = $('<p>').html(changeNBSPSpace(node));
              if (lastNode === currentContainer) {
                // 第一次进入循环，也是除了首行外第一次添加复制内容
                selection.breakOnePtoTwoP(null, false, false); // 这时候需要把一段P切成两段，在两端之间插入黏贴内容
                lastNode = node;
              }
              if (node.html().trim() !== '') {
                currentContainer.after(node);
                /* eslint-disable no-loop-func */
                node.find('.need-to-insert-img').forEach(function (div) {
                  div = $(div);
                  node.after(div);
                });
                /* eslint-disable no-loop-func */
              }
            }
          }
          /* eslint-disable arrow-body-style */

          if (restNodes.length) {
            restNodes.map(function (item) {
              return lastNode.append($(item));
            });
            node = restNodes[0];

            selection.selectNodeContents(node, null, true);
            /* eslint-disable arrow-body-style */
          } else if (lastNode !== currentContainer) {
            // 复制的内容多余一个节点时需要定位到最后一个元素
            // move the cursor to the bottom of pasted contents
            // node = document.createTextNode('');

            // lastNode.append($(node));
            // selection.selectNodeContents(node, null, true);
            selection.setCursorInElem(lastNode);
            // DONE
          }

          if (needCheckForDataURI) {
            checkPastedImage(editor);
          }

          if (currentContainer.text() === '') currentContainer.remove();
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }
    }

    // 使用canvas获取图片blob
    function handleImage(src, callback) {
      var loader = void 0,
        blob = void 0;
      if (src.match(/^webkit\-fake\-url\:\/\//)) {
        // You are trying to paste an image in Safari, however we are unable to retieve its data.
        callback(null);
        return null;
      }
      loader = new Image();
      loader.crossOrigin = "anonymous";
      loader.onload = function () {
        var canvas = void 0,
          ctx = void 0,
          dataURL = void 0;
        canvas = document.createElement('canvas');
        canvas.width = loader.width;
        canvas.height = loader.height;
        ctx = canvas.getContext('2d');
        ctx.drawImage(loader, 0, 0, canvas.width, canvas.height);
        dataURL = null;
        try {
          dataURL = canvas.toDataURL('image/png');
          blob = dataURLtoBlob(dataURL);
        } catch (error) {}

        callback(blob);
      };
      loader.onerror = function () {

        callback(null);
      };
      loader.src = src;
    }
    // 粘贴文字
    $editElem.on('paste', function (e) {
      // force getting the right selection
      selection.saveRange();
      if (e.clipboardData && e.clipboardData.getData || window.clipboardData) {
        var clipboard = e.clipboardData || window.clipboardData;
        var clipboardTypes = [];
        if (clipboard.types) {
          // clipboard.types are not array in IE.
          clipboardTypes = [].map.call(clipboard.types, function (type) {
            return type;
          });
        }
        // Logger('paste::', clipboardTypes, clipboard);
        // 优先选择文件上传会导致从word、excel等office来源 paste 过来的东西变成图片, 所以需要排除clipboardTypes中会有text/rtf类型
        if (clipboardTypes.indexOf('Files') >= 0 && clipboardTypes.indexOf('text/rtf') < 0) {
          var files = [],
            cFiles = clipboard.files,
            cItems = clipboard.items;
          if (cFiles && cFiles.length) {
            files = [].map.call(cFiles, function (file) {
              return { file: file };
            });
          } else if (cItems && cItems.length) {
            files = [].filter.call(cItems, function (item) {
              return item.kind === 'file';
            }).map(function (item) {
              return { file: item.getAsFile() };
            });
          }
          // Logger('cFiles::', files);
          editor.cmd.exec('insertImgs', { images: files });
        } else if (~clipboardTypes.indexOf('image/tiff')) {
          // Get pasted image in Safari. In Safari you will be informed that the pasted content is an image but no access to get it.
          // But we can use Canvas to read the unreadable webkit-fake-url resource HAHAHA. It is magical.
          var hiddenEditor = createHiddenEditable();
          $editElem.after(hiddenEditor);
          hiddenEditor.focus();
          setTimeout(function () {
            var loader = hiddenEditor.find('img')[0];
            // 重新新建Image是为了获取宽高, 因为直接使用loader画，获取宽高有问题
            handleImage(loader.src, function (blob) {
              // 重新获取焦点
              $editElem.focus();
              if (blob) {
                editor.cmd.exec('insertImgs', { images: [{ file: blob }] });
              }
              hiddenEditor.remove();
            });
          }, 0);
          // 这种情况下不要接管paste事件，让系统在hiddenEditor插入一张img
          return true;
        } else {
          var clipContent = void 0;
          if (window.clipboardData) {
            clipContent = clipboard.getData('text');
          } else if (~clipboardTypes.indexOf('text/html')) {
            clipContent = clipboard.getData('text/html');
          } else if (~clipboardTypes.indexOf('text/plain')) {
            clipContent = clipboard.getData('text/plain');
          }
          // console.log('clipContent::', clipContent);
          if (!clipContent) {
            return;
          }
          // Remove useless html tags | Improved 20141230 for more body and html tag's attributions and comment tags.
          clipContent = clipContent.replace(/<!DOCTYPE.*?>\n?/gi, '').replace(/\n?<head[ >][\w\W]*?<\/head>\n?/gi, '').replace(/\n?<\/?(body|html|meta)[\w\W]*?>\n?/gi, '').replace(/<!--[\w\W]*?-->/gi, '');

          // 如果是在图片或者视频标题，复制的话就只复制一行文本
          if (selection.isInMediaCaption()) {
            clipContent = $('<div>').html(clipContent).text();
            selection.insertHtml(clipContent);
          } else {
            // DONE 复制的是多行html
            insertPasteContents(clipContent);
          }
        }
      }
      // 接管paste 事件
      e.preventDefault();
      return false;
    });
  };

  var dragHandle = function () {
    function dragHandle(editor) {
      classCallCheck(this, dragHandle);

      this.editor = editor;
      this.bindEvent();
    }

    createClass(dragHandle, [{
      key: 'bindEvent',
      value: function bindEvent() {
        var editor = this.editor;
        var selection = editor.selection;
        var imgUploader = editor.imgUploader;
        var $editElem = editor.$editElem;

        $editElem.on('drop', function (ev) {

          $editElem.removeClass('dragging-over');
          var dataTransfer = ev.dataTransfer;
          var dataTransferTypes = [];
          if (dataTransfer.types) {
            // dataTransfer.types are not array in IE.
            dataTransferTypes = [].map.call(dataTransfer.types, function (type) {
              return type;
            });
          }
          if (dataTransfer && ~dataTransferTypes.indexOf('Files')) {
            var files = [];
            var tFiles = dataTransfer.files || [];
            var len = tFiles.length;
            // tFiles is not a array but a obj has length attr
            for (var i = 0; i < len; i++) {
              var file = tFiles[i];
              if (file) {
                files.push({ file: file });
              }
            }
            editor.cmd.exec('insertImgs', { images: files });
          }
          editor.emit(EVENT.DROP, ev);
          ev.preventDefault();
          $editElem.focus();
        });

        var lastenter = null;
        //在有子元素的元素dragenter，会存在多次触发的情况 https://stackoverflow.com/questions/10867506/dragleave-of-parent-element-fires-when-dragging-over-children-elements
        $editElem.on('dragenter', function (ev) {
          lastenter = $(ev.target || ev.srcElement);

          $editElem.addClass('dragging-over');
          editor.emit(EVENT.DRAG_ENTER, ev);
        });
        // dragover也需要阻止默认行为，否则在IE下不会触发drop事件
        // http://www.zhangxinxu.com/wordpress/2011/02/html5-drag-drop-%E6%8B%96%E6%8B%BD%E4%B8%8E%E6%8B%96%E6%94%BE%E7%AE%80%E4%BB%8B/
        $editElem.on('dragover', function (ev) {
          ev.preventDefault();
          return false;
        });
        $editElem.on('dragleave', function (ev) {
          var target = $(ev.target || ev.srcElement);

          if (target.equal(lastenter)) {

            $editElem.removeClass('dragging-over');
            editor.emit(EVENT.DRAG_LEAVE, ev);
            ev.stopPropagation();
            ev.preventDefault();
            return false;
          }
        });
      }
    }]);
    return dragHandle;
  }();

  var DonotHandleKeys = [KEYCODE.DOWN_KEY, // up
    KEYCODE.UP_KEY, // down
    KEYCODE.LEFT_KEY, // left
    KEYCODE.RIGHT_KEY];
// ctr组合件
  var DonotHandleKeyCtrl = [KEYCODE.T_KEY, // c+t 新开tab
    KEYCODE.R_KEY // c+R 刷新
  ];

  var Text = function () {
    function Text(editor) {
      classCallCheck(this, Text);


      this.editor = editor;
      this.bindEvent();

    }

    createClass(Text, [{
      key: 'bindEvent',
      value: function bindEvent() {
        // 鼠标事件总处理
        this.mouseHandle();
        // 按键总处理
        this.keyHandle();
        // 点击事件处理
        this.clickhande();
        // drag事件处理
        this.dragHandle = new dragHandle(this.editor);
      }
    }, {
      key: 'clickhande',
      value: function clickhande() {
        var editor = this.editor;
        var $editElem = editor.$editElem;
        var selection = editor.selection;

        // 图片整体选择的处理
        $editElem.on('click', '.' + CSS.IMG_CONTAINER, function (e) {
          var targetElem = $(e.target || e.srcElement);
          var imgContainerCaption = this.find('.' + CSS.IMG_TITLE); // 事件代理的实现上帮this指向了imgContainer
          // Logger('图片整体选择的处理::clickhande', targetElem);
          // 不是标题，取消/确认按键 就自动选中整张图片
          if (!imgContainerCaption.equal(targetElem) && !imgContainerCaption.isContain(targetElem)) {

            selection.selectElem($(this).children().first());
          }
        });

        // 视屏整体选择的处理
        $editElem.on('click', '.' + CSS.VIDEO_CONTAINER, function (e) {
          var targetElem = $(e.target || e.srcElement);
          var videoContainerCaption = this.find('.' + CSS.VIDEO_DESCRIPTION); // 事件代理的实现上帮this指向了videoContainer
          // 不是标题，取消/确认按键 就自动选中整张图片
          if (!videoContainerCaption.equal(targetElem) && !videoContainerCaption.isContain(targetElem)) {

            selection.selectElem($(this));
          }
        });
      }

      // 多媒体元素（图片或者视频）两边不允许编辑

    }, {
      key: 'mouseHandle',
      value: function mouseHandle() {
        var _this = this;

        var editor = this.editor;
        var $editElem = editor.$editElem;

        var wrapSave = function wrapSave() {

          _this.saveRangeRealTime();
        };

        $editElem.on('mousedown', function () {
          // mousedown 状态下，鼠标滑动到编辑区域外面，也需要保存选区
          $editElem.on('mouseleave', wrapSave);
        });
        $editElem.on('mouseup', function () {
          // 此处使用异步是保证获取到的range是mouseup之后的range, 不然取到的是上一次的range, 浏览器还没有执行完成默认操作
          setTimeout(function () {
            _this.saveRangeRealTime();
          }, 0);
          // 在编辑器区域之内完成点击，取消鼠标滑动到编辑区外面的事件
          $editElem.off('mouseleave', wrapSave);
        });
      }
    }, {
      key: 'keyHandle',
      value: function keyHandle() {
        var _this2 = this;

        var editor = this.editor;
        var selection = editor.selection;
        var $editElem = editor.$editElem;

        // 按回车建时的特殊处理
        enterKeyHandle(editor);

        // 清空时保留 <p><br></p>
        deleteKeyHandle(editor);

        // 粘贴事件（粘贴文字，粘贴图片）
        pasteHandle(editor);

        // tab 特殊处理
        tabKeyHandle(editor);

        var isRedo = false;
        var isUndo = false;
        var isMac = Detector.isMac();
        // 微软的中文输入法在edge下也是奇葩，正在输入的时候backupRange会有问题
        editor.isCompositionOn = false; // 标识用户是否正在输入
        // let shouldEscape = false;
        $editElem.on('compositionstart', function () {
          editor.isCompositionOn = true;

        });
        $editElem.on('compositionend', function () {
          editor.isCompositionOn = false;
          _this2.triggerHtmlChangeEvent(isRedo, isUndo); // edge下compositionend事件晚于keyup事件，蛋疼

        });

        $editElem.on('keydown', function (e) {


          var keyCode = e.keyCode;
          var ctrKey = isMac ? e.metaKey : e.ctrlKey;
          // // 一些不需处理的按键，已提供给外部绑定事件
          if (DonotHandleKeys.indexOf(keyCode) >= 0) {
            return true;
          }
          // ctr+的按键
          if (ctrKey && DonotHandleKeyCtrl.indexOf(keyCode) >= 0) {
            return true;
          }

          // undo redo
          isUndo = keyCode === KEYCODE.Z_KEY && ctrKey;
          isRedo = keyCode === KEYCODE.Y_KEY && ctrKey;
          if (isUndo) {
            e.preventDefault();
            editor.cmd.exec('undo');
            return;
          }

          if (isRedo) {
            // Logger('isRedo::', isRedo);
            e.preventDefault();
            editor.cmd.exec('redo');
            return;
          }

          // DEL_KEY and BACK_KEY aways can do
          if (e.keyCode === KEYCODE.DEL_KEY || e.keyCode === KEYCODE.BACK_KEY) {
            editor.emit(EVENT.DEL_KEY_DOWN, e);
            return;
          }

          // 图片只允许标记标题
          if (selection.isInsideMediaBox() && !selection.isInMediaCaption()) {
            // 允许复制黏贴
            if (keyCode === KEYCODE.C_KEY && ctrKey) {
              return true;
            } else {
              e.preventDefault();
              return false;
            }
          }

          if (e.keyCode === KEYCODE.ENTER_KEY) {
            editor.emit(EVENT.ENTER_KEY_DOWN, e);
            return;
          }
          if (e.keyCode === KEYCODE.TAB_KEY) {
            editor.emit(EVENT.TAB_KEY_DOWN, e);
          }
        });

        $editElem.on('keyup', function (e) {
          var keyCode = e.keyCode;


          // 告知外界内部有keyup事件
          editor.emit(EVENT.KEY_UP, e);

          if (keyCode === KEYCODE.DEL_KEY || e.keyCode === KEYCODE.BACK_KEY) {
            editor.emit(EVENT.DEL_KEY_UP, e);
          }

          if (keyCode === KEYCODE.ENTER_KEY) {
            editor.selection.scrollToRange(); // 保证如果光标在最后一行的话，不会被淹没
            editor.emit(EVENT.ENTER_KEY_UP, e);
            // 强制保存快照
            editor.emit(EVENT.CAPTRUE);
          }
          // 按键后保存, 实时保存选取
          _this2.saveRangeRealTime();

          _this2.triggerHtmlChangeEvent(isRedo, isUndo);
        });
      }
    }, {
      key: 'triggerHtmlChangeEvent',
      value: function triggerHtmlChangeEvent(isRedo, isUndo) {
        var editor = this.editor;
        // 触发HTML_CONTENT_CHANGE事件
        if (!editor.isCompositionOn && !isRedo && !isUndo) {
          editor.handleHtmlChange(true);
        }
      }
    }, {
      key: 'saveRangeRealTime',
      value: function saveRangeRealTime() {
        var editor = this.editor;
        editor.selection.saveRange();
      }
    }]);
    return Text;
  }();

  /* eslint-disable object-shorthand */

  var history = function () {
    function history(editor) {
      var _this = this;

      classCallCheck(this, history);


      this.editor = editor;
      this.curPos = -1; // 当前快照位置
      this.snapshootArray = []; // 快照数组
      this.MAX_HISTORY_LENGTH = 25;
      // 保存最原始记录
      this.capture();
      // 强制保存快照
      editor.on(EVENT.CAPTRUE, function () {
        _this.capture();
      });
      // 有变化就尝试拍照
      // editor.on(EVENT.HTML_CONTENT_CHANGE,()=>{
      //  this.capture()
      // })

    }

    // 拍照


    createClass(history, [{
      key: 'capture',
      value: function capture() {

        var editor = this.editor;
        var selection = editor.selection;
        var snapshootArray = this.snapshootArray;
        var curHtml = editor.getHtml();
        var backupRange = void 0;
        // 非首次拍照
        if (this.curPos >= 0) {
          backupRange = snapshootArray[this.curPos].backupRange;
          //先要移除placeholder, 才能比较
          var backupElem = backupRange.backupElem.clone();
          backupElem.find('.' + CSS.PLACE_HOLDER).remove();
          var snapHtml = backupElem.html();
          // 如果存照里的HTML和现在的HTML无差别，就不要拍了
          // console.log('capture::', snapHtml, curHtml)
          if (snapHtml === curHtml) {
            return;
          }
        }
        // 如果用户正在输入，就不要拍照保存了，不然在edge下有问题
        if (editor.isCompositionOn) {
          return;
        }
        backupRange = selection.backupRange();

        // 裁剪snapshootArray，始终保持拍照时curPos为最后一个
        var length = snapshootArray.length = this.curPos + 1;

        if (length >= this.MAX_HISTORY_LENGTH) {
          snapshootArray.shift();
          this.curPos--;
        }
        this.curPos++;
        // let curRangeElm = selection.getSelectionContainerElem()
        // curRangeElm.addClass('dante_cur_range')
        this.snapshootArray.push({
          backupRange: backupRange
        });


        // curRangeElm.removeClass('dante_cur_range')
        // console.log('capture==============', this.curPos, this.snapshootArray)
      }
    }, {
      key: 'undo',
      value: function undo() {
        // console.log('history::undo:::', this.canUndo(), this.curPos, this.snapshootArray);
        if (!this.canUndo()) {
          return;
        }
        this.setEditorContent(this.snapshootArray[--this.curPos]);
      }
    }, {
      key: 'redo',
      value: function redo() {
        // console.log('history::redo:::', this.canRedo(), this.curPos, this.snapshootArray);
        if (!this.canRedo()) {
          return;
        }
        this.setEditorContent(this.snapshootArray[++this.curPos]);
      }
    }, {
      key: 'canUndo',
      value: function canUndo() {
        return this.curPos > 0;
      }
    }, {
      key: 'canRedo',
      value: function canRedo() {
        return this.curPos < this.snapshootArray.length - 1;
      }

      // 绘制编辑区

    }, {
      key: 'setEditorContent',
      value: function setEditorContent() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : snapshoot,
          backupRange = _ref.backupRange;


        var editor = this.editor;
        var selection = editor.selection;
        var $editElem = editor.$editElem;
        // const doms = selection.doms;
        $editElem.html('');
        // console.log('setEditorContent::',backupElem.html())
        //    console.log('setEditorContent::backupRange',backupRange)
        var backupElem = backupRange.backupElem;
        $editElem.append(backupElem.clone().children());

        var cursorPlaceHolders = $editElem.find('.' + CSS.PLACE_HOLDER);
        var startContainer = void 0;
        var endContainer = void 0;
        var startOffset = 0;
        var endOffset = void 0;
        if (cursorPlaceHolders.length > 1) {
          startContainer = cursorPlaceHolders[0].nextSibling;
          endContainer = cursorPlaceHolders[1].previousSibling;
          endOffset = $(endContainer).contents().length;
        } else if (cursorPlaceHolders.length === 1) {
          startContainer = cursorPlaceHolders[0].previousSibling;
          endContainer = cursorPlaceHolders[0].previousSibling;
          // startContainer = backupRange.startContainer
          // endContainer = backupRange.endContainer
          // startOffset = 0
          startOffset = backupRange.startOffset;
          // endOffset = $(endContainer).contents().length

          endOffset = backupRange.endOffset;
        }

        // console.log('setEditorContent::newRange',newRange,backupRange)
        cursorPlaceHolders.remove();

        selection.applyRange({
          collapsed: backupRange.collapsed,
          startContainer: startContainer,
          startOffset: startOffset,
          endContainer: endContainer,
          endOffset: endOffset
        });

      }
    }]);
    return history;
  }();

  var ERROR = {
    FILE_NOT_EXIST: 1, // 文件不存在
    FILE_NOT_SUPPORT: 2, // 不支持该协议
    FILE_TYPE_ERROR: 3, // 文件类型不对
    FILE_TOO_LARGE: 4, // 文件过大
    NET_WORK_ERROR: 5, // 网络错误
    VIDEO_URL_INVALID: 6, // 视屏链接非法
    OTHER_ERROR: 99 // 其他错误
  };

  /**
   * 本处不做具体上传工作
   * 仅用于对接外部上传组件
   */

// import $ from '@util/dom';
  var ImagUpload = function () {
    function ImagUpload(editor) {
      classCallCheck(this, ImagUpload);

      this.editor = editor;

      this.upLoadId = 0; // 每次从0开始
      this.uploadDataCache = {}; // cache上传的图片，以保证可以重新上传
      // export the success and error api
      editor.imageUploadSuccess = this.imageUploadSuccess.bind(this);
      editor.imageUploadFail = this.imageUploadFail.bind(this);
    }

    createClass(ImagUpload, [{
      key: 'checkImgFile',
      value: function checkImgFile(file) {
        var editor = this.editor;
        var config = editor.config;
        if (!file) {
          editor.emit(EVENT.ERROR, { code: ERROR.FILE_NOT_EXIST, file: file });
          return false;
        }
        // 文件类型不对
        if (file.type.indexOf('image/') < 0) {

          editor.emit(EVENT.ERROR, { code: ERROR.FILE_TYPE_ERROR, file: file });
          return false;
        }

        // 图片过大
        if (file.size > config.fileLimitSize) {

          editor.emit(EVENT.ERROR, { code: ERROR.FILE_TOO_LARGE, file: file });
          return false;
        }
        return true;
      }
    }, {
      key: 'replaceImgUrl',
      value: function replaceImgUrl(elem, url, onloadCb) {
        var editor = this.editor;
        var img = new Image();
        img.onload = function () {
          elem.attr('src', url);
          onloadCb();
          // 触发html变化事件
          editor.handleHtmlChange(true);
        };
        img.src = url;
      }

      // 获取一个新的uploadId

    }, {
      key: 'getNewUploadId',
      value: function getNewUploadId() {
        this.upLoadId = this.upLoadId + 1;
        return this.upLoadId;
      }
    }, {
      key: 'beginUpload',
      value: function beginUpload() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ops,
          id = _ref.id,
          file = _ref.file,
          url = _ref.url;

        // console.log('beginUpload::', id);


        // 优先从cache里找数据
        var cache = this.uploadDataCache[id];
        if (cache) {
          file = cache.file;
          url = cache.url;
        } else {
          this.uploadDataCache[id] = {
            id: id,
            file: file,
            url: url
          };
        }
        var editor = this.editor;
        var $editElem = editor.$editElem;
        var $imgContainerElem = $editElem.find('.' + CSS.IMG_CONTAINER + '-' + id);
        if ($imgContainerElem.length) {
          var $loadingPanel = $imgContainerElem.find('.' + CSS.UPLOADING_PANEL);
          var $loadingIcon = $loadingPanel.find('.' + CSS.UPLOADING_ICON);
          var $comfirBtn = $loadingPanel.find('.' + CSS.UPLOAD_RETRY_BTN);
          var $loadingMsg = $loadingPanel.find('.' + CSS.UPLOADING_MSG);
          // console.log($loadingIcon.html())
          $loadingMsg.html('正在上传...');
          $loadingIcon.show();
          $comfirBtn.hide();
          $loadingPanel.show();

          var evenData = {
            id: id,
            file: file,
            url: url
          };
          editor.emit(EVENT.IMG_UPLOAD, evenData);
        }
      }
    }, {
      key: 'imageUploadSuccess',
      value: function imageUploadSuccess() {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ops,
          id = _ref2.id,
          data = _ref2.data;


        var editor = this.editor;
        var $editElem = editor.$editElem;
        var $imgContainerElem = $editElem.find('.' + CSS.IMG_CONTAINER + '-' + id);
        if ($imgContainerElem.length) {
          // console.log('imageUploadSuccess::',id,data)
          this.uploadDataCache[id] = null; // clear cache
          var $imgElem = $imgContainerElem.find('.uploaded-img');
          var $loadingPanel = $imgContainerElem.find('.' + CSS.UPLOADING_PANEL);
          this.replaceImgUrl($imgElem, data.url, function () {
            $imgContainerElem.removeAttr('data-index');
            $imgContainerElem.removeAttr('data-uploaddata');
            $imgContainerElem.removeClass(CSS.IMG_CONTAINER + '-' + id);
            $loadingPanel.remove();
            $imgContainerElem.removeClass(CSS.UPLOADING);

          });
        }
      }
    }, {
      key: 'imageUploadFail',
      value: function imageUploadFail() {
        var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ops,
          id = _ref3.id,
          data = _ref3.data;


        if (data.msg && data.msg.length > 13) {
          data.msg = data.msg.substring(0, 13) + '...'; // 限制显示的信息长度
        }
        var editor = this.editor;
        var $editElem = editor.$editElem;
        var code = data.code;
        var $imgContainerElem = $editElem.find('.' + CSS.IMG_CONTAINER + '-' + id);
        if ($imgContainerElem.length) {
          var $loadingPanel = $imgContainerElem.find('.' + CSS.UPLOADING_PANEL);
          // const $loadingIcon = $loadingPanel.find(`.${CSS.UPLOADING_ICON}`);
          var $comfirBtn = $loadingPanel.find('.' + CSS.UPLOAD_RETRY_BTN);
          var $loadingMsg = $loadingPanel.find('.' + CSS.UPLOADING_MSG);

          $comfirBtn.show();
          // $loadingIcon.hide();
          switch (code) {
            case ERROR.FILE_TOO_LARGE:
              $loadingMsg.html(data.msg || '文件过大');
              $comfirBtn.hide();
              break;
            case ERROR.FILE_TYPE_ERROR:
              $loadingMsg.html(data.msg || '文件类型不对');
              $comfirBtn.hide();
              break;
            case ERROR.NET_WORK_ERROR:
              $loadingMsg.html(data.msg || '网络错误');
              break;
            default:
              $loadingMsg.html(data.msg || '未知错误');
              break;
          }
          // console.log('upload error-----', id);
        }
      }
    }]);
    return ImagUpload;
  }();

  var event = function () {
    function event() {
      classCallCheck(this, event);

      this.events = {};
    }

    createClass(event, [{
      key: 'on',
      value: function on(eventname, listener) {
        var listeners = this.events[eventname];
        if (!listeners) {
          listeners = [];
          this.events[eventname] = listeners;
        }
        if (listeners.indexOf(listener) < 0) {
          listeners.push(listener);
        }
      }
    }, {
      key: 'off',
      value: function off(eventname, listener) {
        var listeners = this.events[eventname] || [];
        var pos = listeners.indexOf(listener);
        var start = pos > -1 ? pos : 0,
          end = listener ? 1 : listeners.length;
        listeners.splice(start, end);
      }
    }, {
      key: 'emit',
      value: function emit(eventname) {
        var listeners = this.events[eventname];
        if (listeners) {
          for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            rest[_key - 1] = arguments[_key];
          }

          for (var i = 0; i < listeners.length; i += 1) {
            if (typeof listeners[i] === 'function') {
              listeners[i].apply(null, rest);
            }
          }
        }
      }
    }]);
    return event;
  }();

  /*无法完全控制用户的编辑行为，所以需要定期整理dom，使之保持我们所需要的结构*/

  var Clear = function () {
    function Clear(editor) {
      classCallCheck(this, Clear);

      this.editor = editor;
    }
    /**
     * 清除不合理标签，整顿dom，
     * 这个是直接在$editElem上操作的，所以会影响当前用户看到的dom
     * 设置isInit参数，是因为，文章第一次加载在editor的时候也需要清洗dom，这时候还没有初始化光标, range为undefined
     */


    createClass(Clear, [{
      key: 'clearTmpElement',
      value: function clearTmpElement() {
        var isInit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;


        var editor = this.editor;
        var selection = editor.selection;
        var range = selection.getRange();
        var $editElem = editor.$editElem;
        var children = $editElem.contents();
        var changed = false; // 如果有dom变化，需要重新应用range
        children.forEach(function (child) {
          if ($(child).getNodeName() === 'BR') {
            $(child).remove();
            changed = true;
            return;
          }
          if (child.nodeType === 3 || ['B', 'A', 'I', 'STRIKE'].indexOf((child.tagName || '').toUpperCase()) > 0) {
            $(child).wrap($('<p>'));
            changed = true;
          } else if (!isContainer(child) && !isGapNode(child)) {
            // for all others that not a container 不是所允许的标签一律转化成p标签
            if (!isInit && range && range.startContainer === range.endContainer && range.startContainer === child) {
              var content = $(child).contents().unwrap().wrap('<p></p>');
              selection.setCursorInElem(content.parent());
              range = selection.getRange(); // 重新获取
            } else {
              // console.log('clearTmpElement::', child, $(child).contents())
              $(child).contents().unwrap().wrap('<p></p>');
            }
            changed = true;
          }
        });

        // 粗体命令，对于H标签内的内容，浏览器会直接用span包裹并在上style="font-weight: normal;", 要做的好不容易啊，事无巨细的处理
        $editElem.find('[style]').forEach(function (node) {

          var topContainer = selection.getTopContainerByNode(node);
          node = $(node);
          // console.log('clearTmpElement::', node,topContainer)
          if (!topContainer.hasClass(CSS.IMG_CONTAINER) && !topContainer.hasClass(CSS.VIDEO_CONTAINER)) {
            node.removeAttr('style');
          }
          if (node.is('span') && !node.attr('class')) {
            // const content = node.contents()
            // if ( !isInit && range ) {
            //   if (range.startContainer === ) {
            //     range.startContainer = content.first()[0];
            //     range.startOffset = 0
            //   }
            //   if (range.endContainer === content.last()[0]) {

            //   }
            // }
            node.unpack();
            changed = true;
          }
        });
        $editElem.find("br[type='_moz']").removeAttr('type');

        var pElems = $editElem.find('p');

        pElems.forEach(function (node) {
          node = $(node);

          // Empty Line, remove it.
          if (node.html().length === 0) {
            if (!Detector.isIE()) {
              node.remove();
            }
          } else if (/^\s*$/.test(node.text())) {
            // Line with enters
            if (node.children().length < 1) {
              //  Enters are not BR-node
              if (Detector.isIE()) {
                node.html('');
              } else {
                node.html('<br>');
              }
            }
          }
          var html = node.html();
          // 删除有文字的段落中头部和尾部br
          if (html !== '' && html !== '<br>') {
            var contents = node.contents();
            if (contents.length) {
              if (contents.last().getNodeName() === 'BR') {
                contents.last().remove();
              } else if (contents.first().getNodeName() === 'BR') {
                contents.first().remove();
              }
            }
          }
        });

        // 初始化时处理链接
        if (isInit) {
          $editElem.find('a').forEach(function (link) {
            link = $(link);
            // 移除空连接
            if (link.text().trim() === '') {
              link.remove();
              return;
            }
            var target = link.attr('target');
            if (target !== '_blank') {
              link.attr('target', '_blank');
            }
          });
        }
        // remove from block elements 需要在p标签处理之后处理，因为block元素里也是p标签
        var blockquoteElems = $editElem.find('blockquote');
        blockquoteElems.forEach(function (blockquote) {
          blockquote = $(blockquote);
          blockquote.contents().forEach(function (child) {
            child = $(child);
            if (child.getNodeName() !== 'P') {
              if (child.text().length < 1 && child.contents() < 1) {
                child.remove();
              } else {
                child.wrap('<p></p>');
              }
            }
          });
          // remove the empty blockquote
          if (blockquote.children().length === 0) {
            blockquote.remove();
          }
        });

        this.clearMediaElement();

        if (!isInit && changed) {
          selection.applyRange(range);
          // selection.scrollToRange(range)
        }


      }
    }, {
      key: 'clearMediaElement',
      value: function clearMediaElement() {


        var editor = this.editor;
        var selection = editor.selection;
        // const selection = editor.selection;
        var $editElem = editor.$editElem;
        $editElem.find('.' + CSS.IMG_CONTAINER).forEach(function (node) {
          var $rangEndElem = selection.getSelectionContainerElem();
          node = $(node);
          var isInBox = $rangEndElem === node; // 如果光标在标签里，定位到标题

          // 图片标签必须要在最顶级元素
          var topContainer = selection.getTopContainerByNode(node[0]);
          if (!topContainer.equal(node)) {
            topContainer.after(node);
          }

          // 如果是没有图片就直接移除掉
          if (node.find('img').length === 0) {
            node.remove();
            return;
          }
          var textCache = []; // 保留里面的不合规的文字信息，并插入到标题中
          // 清洗里面无关的dom
          node.contents().forEach(function (content) {
            content = $(content);
            var tagName = content.getNodeName();
            // 删除br,最后加一个保证只有一个
            if (tagName == "BR") {
              content.remove();
            } else if (['IMG', 'DIV'].indexOf(tagName) < 0) {
              content.text().length && textCache.push(content.text());
              content.remove();
            }
          });
          // 如果没有图片标题就添加标题
          var captionElem = node.find('.' + CSS.IMG_TITLE);
          if (captionElem.length === 0) {
            captionElem = getImgTitle();
            node.append(captionElem);
          }
          captionElem.before($('<br>'));
          // 恢复不合规的文字
          if (textCache.length) {
            captionElem.html('' + captionElem.html() + textCache.join(''));
            // const newP = $('<p>').html(textCache.join(''));
            // node.after(newP);
          }

          if (isInBox) {
            selection.setCursorInElem(captionElem);
          }
        });

        $editElem.find('.' + CSS.VIDEO_CONTAINER).forEach(function (node) {
          var $rangEndElem = selection.getSelectionContainerElem();
          node = $(node);
          var isInBox = $rangEndElem === node; // 如果光标在标签里，定位到标题

          // 视屏标签必须要在最顶级元素
          var topContainer = selection.getTopContainerByNode(node[0]);
          if (!topContainer.equal(node)) {
            topContainer.after(node);
          }

          // 如果没有播放器的视屏元素直接删除
          if (node.find('.player').length === 0) {
            node.remove();
            return;
          }
          var textCache = []; // 保留里面的不合规的文字信息，并插入到标题中
          // 清洗里面无关的dom
          node.contents().forEach(function (content) {
            content = $(content);
            var tagName = content.getNodeName();
            // 删除br,最后加一个保证只有一个
            if (tagName == "BR") {
              content.remove();
            } else if (['IMG', 'DIV', 'IFRAME'].indexOf(tagName) < 0) {
              content.text().length && textCache.push(content.text());
              content.remove();
            }
          });
          // 如果没有视屏标题就添加标题
          var captionElem = node.find('.' + CSS.VIDEO_DESCRIPTION);
          if (captionElem.length === 0) {
            captionElem = getVideoTitle();
            node.append(captionElem);
          }
          captionElem.before($('<br>'));

          if (textCache.length) {
            captionElem.html('' + captionElem.html() + textCache.join(''));
            // const newP = $('<p>').html(textCache.join(''));
            // node.after(newP);
          }

          if (isInBox) {
            selection.setCursorInElem(captionElem);
          }
        });

      }
      // 清洗html,删除正在上传的图片dom

    }, {
      key: 'getContent',
      value: function getContent() {
        var isInit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        var editor = this.editor;
        var $editElem = editor.$editElem;
        if (this.preHtml === editor.getHtml()) {
          return this.editorContent;
        }


        // remove placeholder
        var placeholder = $('.' + CSS.PLACE_HOLDER);
        placeholder.forEach(function (node) {
          node = $(node);
          if (node.html() !== '') {
            node.unpack();
          } else {
            node.remove();
          }
        });

        this.clearTmpElement(isInit);

        // Logger('getContent::after::clearTmpElement',this.getHtml())
        var container = $editElem.clone(true);

        // let contents = container.contents();
        var contents = void 0;

        // Remove Empty Chars in end of paragraphs
        container.find('p').forEach(function (p) {
          var html = p.innerHTML;
          html = html.replace(/\s+$/, '');
          // 如果是有内容的话 删除烦人的 头部和尾部br标签
          if (html !== '<br>') {
            html = html.replace(/^<br>|<br>$/g, '');
          }
          p.innerHTML = html;
        });
        // 处理图片
        container.find('img').forEach(function (image) {
          var $image = $(image);
          // $image.removeAttr('height').removeAttr('width')
          var src = $image.attr('src');
          var parent = $image.parent();
          // Remove local image and blob file
          if (~src.indexOf('file://') || ~src.indexOf('blob:') || ~src.indexOf('data:')) {
            if ($editElem.equal(parent)) {
              $image.remove();
            } else {
              parent.remove();
            }
            return;
          } else if (src.match(/^http:\/\/(\w+\.)?qpic\.cn/)) {
            var newSrc = src.split('?');
            if (newSrc.length > 1) {
              newSrc[2] = [];
              newSrc[1].split('&').map(function (p) {
                if (p !== 'tp=webp') {
                  newSrc[2].push(p);
                }
                return null;
              });
              if (newSrc[2].length > 0) {
                newSrc[1] = newSrc[2].join('&');
                newSrc = newSrc[0] + '?' + newSrc[1];
                $image.attr('src', newSrc);
              }
            }
          }
          // get again
          src = $image.attr('src');

          if (parent.hasClass(CSS.UPLOADING)) {
            // 正在上传的img不需要保存
            parent.remove();
          } else if (!parent.hasClass(CSS.IMG_CONTAINER)) {
            // 一些意外的img全部包裹到正确的img container中
            var $newImgPanel = getImgPanel(src, '', null, null, null, null, null, false);
            if ($editElem.equal(parent)) {
              $image.replace($newImgPanel);
            } else {
              parent.replace($newImgPanel);
            }
          }
        });
        // 处理链接
        container.find('a').forEach(function (link) {
          link = $(link);
          // 移除空连接
          if (link.text().trim() === '') {
            link.remove();
            return;
          }
          var target = link.attr('target');
          if (target !== '_blank') {
            link.attr('target', '_blank');
          }
        });
        // 整理图片
        container.find('.' + CSS.IMG_CONTAINER).forEach(function (imgContainer) {
          var imgCaption = $(imgContainer).find('.' + CSS.IMG_TITLE);
          // 如果图片标题没有文字，直接清空，有可能存在没有标题的情况
          if (imgCaption.length && imgCaption.text().trim() === '') {
            imgCaption.html('');
          }
        });
        // 整理视频
        container.find('.' + CSS.VIDEO_CONTAINER).forEach(function (video) {
          video = $(video);
          video.removeAttr('contenteditable');
          video.removeAttr('flag-generated');
          video.find('.player').remove(); // 视频播放器和视频截图都移除
        });
        // Logger('getContent::after::处理链接',container.html());

        // get again
        contents = container.contents();

        // 去除结尾空行
        for (var i = contents.length - 1; i >= 0; i--) {
          var elem = $(contents[i]);
          if (elem.getNodeName() === 'P' && elem.text().replace(/[\n ]/gi, '').length === 0) {
            elem.remove();
          } else {
            break;
          }
        }

        // 去除开头空行
        for (var _i = 0; _i < contents.length; _i++) {
          var _elem = $(contents[_i]);
          if (_elem.getNodeName() === 'P' && _elem.text().replace(/[\n ]/gi, '').length === 0) {
            _elem.remove();
          } else {
            break;
          }
        }
        // Remove invalid tags inside paragraphs
        contents = container.html();
        // Logger('getContent::after::去除开头空行',container.html());

        // 这里会把非allowTags里的标签去除，比如iframe
        contents = contents.replace(/<(\/?)(.*?)>/gi, function (match, isEnd, tag) {
          tag = tag.trim();
          if (tag.indexOf(' ') > 0) {
            tag = tag.split(' ')[0];
          }
          tag = tag.toLowerCase();
          if (allowTags.indexOf(tag) < 0) {
            return '';
          }
          return match;
        });
        container.html(contents);
        // Logger('getContent::after::去除开头空行',container.html());

        this.preHtml = editor.getHtml();
        this.editorContent = container.html();

        // console.timeEnd('GetContent')

        return this.editorContent;
      }
    }]);
    return Clear;
  }();

  /* eslint-disable no-useless-escape */

  var Config = {
    contentChangeDelay: 500, //contentChange事件触发延时ms 200的话太快了
    content: '<p><br></p>', // editor的初始化content
    autoFillParentSize: true, // 自动撑满父元素
    videoFetchUrl: 'http://www.jianshu.com/videos.json',
    // 长宽大小，前端判断
    fileLimitSize: 2 * 1024 * 1024, // M
    jianshuImgUrlRegex: /^(https?:)?\/\/(([\w-]+\.jianshu\.(io|com))|(jianshu\-(dev\.u|staging)\.qiniudn\.com))\//,
    // jianshuImgUrlRegex: /^https?:\/\/([\w-]+\.jianshu\.(?:io|com)|jianshu\-(?:dev\.u|staging)\.qiniudn\.com)\/upload_images\//,
    availableVideoUrlRegex: /^https?:\/\/(?:[\w\.]*?\.(?:youku|tudou|qq|bilibili)\.com|[\w\.-]*?\.acgvideo\.com)\//i
  };

// import fetch from '@edit/fetch'
  var Editor$1 = function (_EventEmitter) {
    inherits(Editor, _EventEmitter);

    function Editor(selector, customConfig) {
      classCallCheck(this, Editor);

      var _this = possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).call(this));

      if (!selector) {
        throw new Error('please give a valid selector when create Dante Editor');
      }


      _this.selector = selector;
      _this.config = Object.assign({}, Config, customConfig || {});
      // 延迟触发onchange事件
      _this.curOnChangeTimeoutId = 0;
      // this._beforeChangeHtml = '';

      // 初始化 DOM
      _this.initDom();

      _this.initSelectionAPI();

      _this.initClear();

      // this.bindEvent();
      _this.initUploaders();

      // 封装 API
      _this.initCommand();
      _this.initText();

      // 初始化选区，将光标定位到内容尾部
      _this.initSelection();

      // 在初始化之后确保存在有效range
      _this.initHistory();

      // 初始化curContent，并且顺便规整下dom
      _this.curContent = _this.clear.getContent(true);

      _this.focusNative();


      return _this;
    }

    createClass(Editor, [{
      key: 'initClear',
      value: function initClear() {
        this.clear = new Clear(this);
      }
    }, {
      key: 'setConfig',
      value: function setConfig(customConfig) {
        this.config = Object.assign({}, this.config, customConfig);
      }

      // 由于保存的文章中视频dom没有了iframe元素，初始化时需要修复，html()方法是获取不到iframe的内容的

    }, {
      key: 'rebuildVideo',
      value: function rebuildVideo() {
        var $editElem = this.$editElem;
        $editElem.find('.' + CSS.VIDEO_CONTAINER).forEach(function (node) {
          node = $(node);
          var videoInfo = {};
          videoInfo.id = node.data('video-id') || '';
          videoInfo.url = node.data('video-url') || '';
          videoInfo.provider = node.data('video-provider') || '';
          videoInfo.cover_id = node.data('cover-uuid') || '';
          var playerElem = $(videoMaker(videoInfo));
          node.prepend(playerElem);
        });
      }
    }, {
      key: 'initDom',
      value: function initDom() {
        var config = this.config;
        var selector = this.selector;
        var $editContainerElem = void 0;
        var $editElem = void 0;
        // let $children;

        this.$editContainerElem = $editContainerElem = $(selector);
        // 编辑区域
        this.$editElem = $editElem = $('<div>' + config.content + '</div>');
        this.rebuildVideo();

        $editElem.attr('contenteditable', 'true');

        if (config.autoFillParentSize) {
          $editElem.css('width', '100%').css('height', '100%').css('box-sizing', 'border-box');
        }

        $editContainerElem.append($editElem);

        // 是否使用Dante的默认主题，如果你需要使用黑夜模式，估计就不能使默认主题了
        if (config.defaultTheme) {
          $editContainerElem.addClass('dante-editor-container');
          $editElem.addClass('dante-editor');
        }
        // 设置配置的 class
        if (config.editorClass) {
          $editElem.addClass(config.editorClass);
        }
      }
      // 参数needCapture 是否需要发出保存快照事件，因为redo和undo指令是不需要的

    }, {
      key: 'handleHtmlChange',
      value: function handleHtmlChange(needCapture) {
        var _this2 = this;

        // trigger onchange event
        if (this.curOnChangeTimeoutId) {
          clearTimeout(this.curOnChangeTimeoutId);
        }
        this.curOnChangeTimeoutId = setTimeout(function () {
          // 用户正在输入的话，就skip这次保存
          if (_this2.isCompositionOn) {
            return;
          }
          var curContent = _this2.clear.getContent();
          var preContent = _this2.curContent;
          if (curContent === preContent) {
            return;
          }
          // 触发HTML_CONTENT_CHANGE事件

          _this2.curContent = curContent;
          _this2.emit(EVENT.HTML_CONTENT_CHANGE, preContent, curContent);
          if (needCapture) {
            _this2.emit(EVENT.CAPTRUE);
          }
        }, this.config.contentChangeDelay);
      }
      // bindEvent() {

      // }

      // 封装 command

    }, {
      key: 'initCommand',
      value: function initCommand() {
        this.cmd = new command(this);
      }

      // 封装 selection range API

    }, {
      key: 'initSelectionAPI',
      value: function initSelectionAPI() {
        this.selection = new Selection(this);
      }
    }, {
      key: 'initText',
      value: function initText() {
        this.txt = new Text(this);
      }
    }, {
      key: 'initHistory',
      value: function initHistory() {
        this.history = new history(this);
      }
    }, {
      key: 'initUploaders',
      value: function initUploaders() {
        this.imgUploader = new ImagUpload(this);
      }
      // 初始化选区，将光标定位到内容尾部

    }, {
      key: 'initSelection',
      value: function initSelection() {
        var $editElem = this.$editElem;
        var $children = $editElem.children();
        var selection = this.selection;
        if (!$children.length) {
          // 如果编辑器区域无内容，添加一个空行，重新设置选区
          $editElem.append($('<p><br></p>'));
          this.initSelection();
          return;
        }

        var $first = $children.first();

        try {
          // 如果是图片或者视屏，定位到标题
          if ($first.hasClass(CSS.IMG_CONTAINER)) {
            selection.setCursorInElem($first.find('.' + CSS.IMG_TITLE));
          } else if ($first.hasClass(CSS.VIDEO_CONTAINER)) {
            selection.setCursorInElem($first.find('.' + CSS.VIDEO_DESCRIPTION));
          } else if ($first.getNodeName() === 'P') {
            selection.setCursorInElem($first);
          } else {
            var $newP = $('<p><br></p>');
            $editElem.append($newP);
            selection.setCursorInElem($newP);
          }
        } catch (e) {
          var _$newP = $('<p><br></p>');
          $editElem.append(_$newP);
          selection.setCursorInElem(_$newP);
        }
      }
    }, {
      key: 'getVideoCount',
      value: function getVideoCount() {
        return this.$editElem.find('.' + CSS.VIDEO_CONTAINER).length;
      }
    }, {
      key: 'isUploadingImage',
      value: function isUploadingImage() {

        return this.$editElem.find('.' + CSS.UPLOADING).length > 0;
      }
    }, {
      key: 'getContent',
      value: function getContent() {

        return this.curContent || '';
      }
      // 获取当前选区中的链接信息，插入链接用

    }, {
      key: 'getCurrentLinkInfo',
      value: function getCurrentLinkInfo() {
        return this.selection.getCurrentLinkInfo();
      }
      // 重新聚焦到编辑器, 注意此方法不会重新应用选区

    }, {
      key: 'focusNative',
      value: function focusNative() {
        this.$editElem.focus();
      }
      // 重新聚焦到编辑器, 注意此方法会重新应用选区

    }, {
      key: 'focus',
      value: function focus() {
        this.selection.restoreSelection();
      }
      // 为了和markdown的编辑器统一对外接口

    }, {
      key: 'onEvent',
      value: function onEvent(name, func) {
        this.on(name, func);
      }
    }, {
      key: 'offEvent',
      value: function offEvent(name, func) {
        this.off(name, func);
      }
    }, {
      key: 'exec',
      value: function exec(name, value) {
        return this.cmd.exec(name, value);
      }
    }, {
      key: 'getHtml',
      value: function getHtml() {
        return this.$editElem.html();
      }
    }, {
      key: 'getText',
      value: function getText() {
        return this.$editElem.text();
      }
    }]);
    return Editor;
  }(event);

  Editor$1.Events = EVENT;
  Editor$1.Errors = ERROR;

// import 'babel-polyfill'

  return Editor$1;

})));
//# sourceMappingURL=dante.min.js.map