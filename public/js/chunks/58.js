(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[58],{

/***/ "./resources/js/utils/util.js":
/*!************************************!*\
  !*** ./resources/js/utils/util.js ***!
  \************************************/
/*! exports provided: str_repeat, sprintf, camelCase, getStyle, hasClass, addClass, removeClass, on, off, once, isScroll, getScrollContainer, isInContainer, afterLeave, kebabCase, rafThrottle, isIE, isEdge, isFirefox, isObject, isArray, isDate, isNumber, isString, isBoolean, isFunction, isNull, isHtmlElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str_repeat", function() { return str_repeat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sprintf", function() { return sprintf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "camelCase", function() { return camelCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyle", function() { return getStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasClass", function() { return hasClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addClass", function() { return addClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeClass", function() { return removeClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "on", function() { return on; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "off", function() { return off; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "once", function() { return once; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isScroll", function() { return isScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScrollContainer", function() { return getScrollContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInContainer", function() { return isInContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "afterLeave", function() { return afterLeave; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kebabCase", function() { return kebabCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rafThrottle", function() { return rafThrottle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIE", function() { return isIE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEdge", function() { return isEdge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFirefox", function() { return isFirefox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return isArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDate", function() { return isDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return isNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isString", function() { return isString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBoolean", function() { return isBoolean; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return isFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNull", function() { return isNull; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isHtmlElement", function() { return isHtmlElement; });
/* harmony import */ var Vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Vue */ "./node_modules/Vue/dist/vue.runtime.esm.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }


var SPECIAL_CHARS_REGEXP = /([:\-_]+(.))/g;
var MOZ_HACK_REGEXP = /^moz([A-Z])/;
var isServer = Vue__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.$isServer;
function str_repeat(i, m) {
  for (var o = []; m > 0; o[--m] = i) {
    return o.join('');
  }
}
function sprintf() {
  var i = 0,
      a,
      f = arguments[i++],
      o = [],
      m,
      p,
      c,
      x,
      s = '';

  while (f) {
    if (m = /^[^\x25]+/.exec(f)) {
      o.push(m[0]);
    } else if (m = /^\x25{2}/.exec(f)) {
      o.push('%');
    } else if (m = /^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(f)) {
      if ((a = arguments[m[1] || i++]) == null || a == undefined) {
        throw 'Too few arguments.';
      }

      if (/[^s]/.test(m[7]) && typeof a != 'number') {
        throw 'Expecting number but found ' + _typeof(a);
      }

      switch (m[7]) {
        case 'b':
          a = a.toString(2);
          break;

        case 'c':
          a = String.fromCharCode(a);
          break;

        case 'd':
          a = parseInt(a);
          break;

        case 'e':
          a = m[6] ? a.toExponential(m[6]) : a.toExponential();
          break;

        case 'f':
          a = m[6] ? parseFloat(a).toFixed(m[6]) : parseFloat(a);
          break;

        case 'o':
          a = a.toString(8);
          break;

        case 's':
          a = (a = String(a)) && m[6] ? a.substring(0, m[6]) : a;
          break;

        case 'u':
          a = Math.abs(a);
          break;

        case 'x':
          a = a.toString(16);
          break;

        case 'X':
          a = a.toString(16).toUpperCase();
          break;
      }

      a = /[def]/.test(m[7]) && m[2] && a >= 0 ? '+' + a : a;
      c = m[3] ? m[3] == '0' ? '0' : m[3].charAt(1) : ' ';
      x = m[5] - String(a).length - s.length;
      p = m[5] ? str_repeat(c, x) : '';
      o.push(s + (m[4] ? a + p : p + a));
    } else {
      throw 'Huh ?!';
    }

    f = f.substring(m[0].length);
  }

  return o.join('');
}
function camelCase(name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
}
function getStyle(element, styleName) {
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);

  if (styleName === 'float') {
    styleName = 'cssFloat';
  }

  try {
    var computed = document.defaultView.getComputedStyle(element, '');
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
}

function typeOf(obj) {
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  return map[Object.prototype.toString.call(obj)];
}

function hasClass(el, cls) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');

  if (el.classList) {
    return el.classList.contains(cls);
  }

  return " ".concat(el.className, " ").indexOf(" ".concat(cls, " ")) > -1;
}
function addClass(el, cls) {
  if (!el) return;
  var classes = (cls || '').split(' ');
  var curClass = el.className;

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += " ".concat(clsName);
    }
  }

  if (!el.classList) {
    el.className = curClass;
  }
}
function removeClass(el, cls) {
  if (!el || !cls) return;
  var classes = cls.split(' ');
  var curClass = " ".concat(el.className, " ");

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(" ".concat(clsName, " "), ' ');
    }
  }

  if (!el.classList) {
    el.className = trim(curClass);
  }
}
function on(element, event, handler) {
  if (element && event && handler) {
    if (!isServer && document.addEventListener) element.addEventListener(event, handler, false);else element.attachEvent('on' + event, handler);
  }
}
function off(element, event, handler) {
  if (element && event && handler) {
    if (!isServer && document.addEventListener) element.removeEventListener(event, handler, false);else element.detachEvent('on' + event, handler);
  }
}
function once(el, event, fn) {
  var listener = function listener() {
    if (fn) {
      fn.apply(this, arguments);
    }

    off(el, event, listener);
  };

  on(el, event, listener);
}
function isScroll(el, vertical) {
  if (isServer) return;
  var determinedDirection = vertical !== null || vertical !== undefined;
  var overflow = determinedDirection ? vertical ? getStyle(el, 'overflow-y') : getStyle(el, 'overflow-x') : getStyle(el, 'overflow');
  return overflow.match(/(scroll|auto)/);
}
function getScrollContainer(el, vertical) {
  if (isServer) return;
  var parent = el;

  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) {
      return window;
    }

    if (isScroll(parent, vertical)) {
      return parent;
    }

    parent = parent.parentNode;
  }

  return parent;
}
function isInContainer(el, container) {
  if (isServer || !el || !container) return false;
  var elRect = el.getBoundingClientRect();
  var containerRect;

  if ([window, document, document.documentElement, null, undefined].includes(container)) {
    containerRect = {
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0
    };
  } else {
    containerRect = container.getBoundingClientRect();
  }

  return elRect.top < containerRect.bottom && elRect.bottom > containerRect.top && elRect.right > containerRect.left && elRect.left < containerRect.right;
}
function afterLeave(instance, callback) {
  var speed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 300;
  var once = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (!instance || !callback) throw new Error('instance & callback is required');
  var called = false;

  var afterLeaveCallback = function afterLeaveCallback() {
    if (called) return;
    called = true;

    if (callback) {
      callback.apply(null, arguments);
    }
  };

  if (once) {
    instance.$once('after-leave', afterLeaveCallback);
  } else {
    instance.$on('after-leave', afterLeaveCallback);
  }

  setTimeout(function () {
    afterLeaveCallback();
  }, speed + 100);
}
function kebabCase(str) {
  var hyphenateRE = /([^-])([A-Z])/g;
  return str.replace(hyphenateRE, '$1-$2').replace(hyphenateRE, '$1-$2').toLowerCase();
}
function rafThrottle(fn) {
  var locked = false;
  return function () {
    var _this = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (locked) return;
    locked = true;
    window.requestAnimationFrame(function (_) {
      fn.apply(_this, args);
      locked = false;
    });
  };
}
var isIE = function isIE() {
  return !isServer && !isNaN(Number(document.documentMode));
};
var isEdge = function isEdge() {
  return !isServer && navigator.userAgent.indexOf('Edge') > -1;
};
var isFirefox = function isFirefox() {
  return !isServer && !!window.navigator.userAgent.match(/firefox/i);
};
var isObject = function isObject(input) {
  return Object.prototype.toString.call(input) === '[object Object]';
};
var isArray = function isArray(input) {
  return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
};
var isDate = function isDate(input) {
  return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
};
var isNumber = function isNumber(input) {
  return input instanceof Number || Object.prototype.toString.call(input) === '[object Number]';
};
var isString = function isString(input) {
  return input instanceof String || Object.prototype.toString.call(input) === '[object String]';
};
var isBoolean = function isBoolean(input) {
  return typeof input == 'boolean';
};
var isFunction = function isFunction(input) {
  return typeof input == 'function';
};
var isNull = function isNull(input) {
  return input === undefined || input === null;
};
function isHtmlElement(node) {
  return node && node.nodeType === Node.ELEMENT_NODE;
}

/***/ })

}]);