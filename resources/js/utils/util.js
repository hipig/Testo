import Vue from "Vue"

const SPECIAL_CHARS_REGEXP = /([:\-_]+(.))/g
const MOZ_HACK_REGEXP = /^moz([A-Z])/
const isServer = Vue.prototype.$isServer

export function str_repeat(i, m) {
  for (var o = []; m > 0; o[--m] = i)
  return o.join('')
}

export function sprintf() {
  var i = 0, a, f = arguments[i++], o = [], m, p, c, x, s = ''
  while (f) {
    if (m = /^[^\x25]+/.exec(f)) {
      o.push(m[0])
    }
    else if (m = /^\x25{2}/.exec(f)) {
      o.push('%')
    }
    else if (m = /^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(f)) {
      if (((a = arguments[m[1] || i++]) == null) || (a == undefined)) {
        throw('Too few arguments.')
      }
      if (/[^s]/.test(m[7]) && (typeof(a) != 'number')) {
        throw('Expecting number but found ' + typeof(a))
      }
      switch (m[7]) {
        case 'b': a = a.toString(2); break
        case 'c': a = String.fromCharCode(a); break
        case 'd': a = parseInt(a); break
        case 'e': a = m[6] ? a.toExponential(m[6]) : a.toExponential(); break
        case 'f': a = m[6] ? parseFloat(a).toFixed(m[6]) : parseFloat(a); break
        case 'o': a = a.toString(8); break
        case 's': a = ((a = String(a)) && m[6] ? a.substring(0, m[6]) : a); break
        case 'u': a = Math.abs(a); break
        case 'x': a = a.toString(16); break
        case 'X': a = a.toString(16).toUpperCase(); break
      }
      a = (/[def]/.test(m[7]) && m[2] && a >= 0 ? '+'+ a : a)
      c = m[3] ? m[3] == '0' ? '0' : m[3].charAt(1) : ' '
      x = m[5] - String(a).length - s.length
      p = m[5] ? str_repeat(c, x) : ''
      o.push(s + (m[4] ? a + p : p + a))
    }
    else {
      throw('Huh ?!')
    }
    f = f.substring(m[0].length)
  }
  return o.join('')
}

export function camelCase (name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter
  }).replace(MOZ_HACK_REGEXP, 'Moz$1')
}

export function getStyle (element, styleName) {
  if (!element || !styleName) return null

  styleName = camelCase(styleName)
  if (styleName === 'float') {
    styleName = 'cssFloat'
  }

  try {
    const computed = document.defaultView.getComputedStyle(element, '')
    return element.style[styleName] || computed ? computed[styleName] : null
  } catch (e) {
    return element.style[styleName]
  }
}

function typeOf (obj) {
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  }
  return map[Object.prototype.toString.call(obj)]
}

export function hasClass (el, cls) {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.')
  if (el.classList) {
    return el.classList.contains(cls)
  }
  return (` ${el.className} `).indexOf(` ${cls} `) > -1
}

export function addClass (el, cls) {
  if (!el) return

  const classes = (cls || '').split(' ')
  let curClass = el.className

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.add(clsName)
    } else if (!hasClass(el, clsName)) {
      curClass += ` ${clsName}`
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
}

export function removeClass (el, cls) {
  if (!el || !cls) return
  const classes = cls.split(' ')
  let curClass = ` ${el.className} `

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.remove(clsName)
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(` ${clsName} `, ' ')
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
}

export function on(element, event, handler) {
  if (element && event && handler) {
    if (!isServer && document.addEventListener)
      element.addEventListener(event, handler, false)
    else
      element.attachEvent('on' + event, handler)
  }
}

export function off(element, event, handler) {
  if (element && event && handler) {
    if (!isServer && document.addEventListener)
      element.removeEventListener(event, handler, false)
    else
      element.detachEvent('on' + event, handler)
  }
}

export function once(el, event, fn) {
  var listener = function() {
    if (fn) {
      fn.apply(this, arguments)
    }
    off(el, event, listener)
  }
  on(el, event, listener)
}

export function isScroll(el, vertical) {
  if (isServer) return

  const determinedDirection = vertical !== null || vertical !== undefined
  const overflow = determinedDirection
    ? vertical
      ? getStyle(el, 'overflow-y')
      : getStyle(el, 'overflow-x')
    : getStyle(el, 'overflow')

  return overflow.match(/(scroll|auto)/)
}

export function getScrollContainer(el, vertical) {
  if (isServer) return

  let parent = el
  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) {
      return window
    }
    if (isScroll(parent, vertical)) {
      return parent
    }
    parent = parent.parentNode
  }

  return parent
}

export function isInContainer(el, container) {
  if (isServer || !el || !container) return false

  const elRect = el.getBoundingClientRect()
  let containerRect

  if ([window, document, document.documentElement, null, undefined].includes(container)) {
    containerRect = {
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0
    }
  } else {
    containerRect = container.getBoundingClientRect()
  }

  return elRect.top < containerRect.bottom &&
    elRect.bottom > containerRect.top &&
    elRect.right > containerRect.left &&
    elRect.left < containerRect.right
}

export function afterLeave(instance, callback, speed = 300, once = false) {
  if (!instance || !callback) throw new Error('instance & callback is required')
  let called = false
  const afterLeaveCallback = function() {
    if (called) return
    called = true
    if (callback) {
      callback.apply(null, arguments)
    }
  }
  if (once) {
    instance.$once('after-leave', afterLeaveCallback)
  } else {
    instance.$on('after-leave', afterLeaveCallback)
  }
  setTimeout(() => {
    afterLeaveCallback()
  }, speed + 100)
}

export function kebabCase(str) {
  const hyphenateRE = /([^-])([A-Z])/g
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
}

export function rafThrottle(fn) {
  let locked = false
  return function(...args) {
    if (locked) return
    locked = true
    window.requestAnimationFrame(_ => {
      fn.apply(this, args)
      locked = false
    })
  }
}

export const isIE = function() {
  return !isServer && !isNaN(Number(document.documentMode))
}

export const isEdge = function() {
  return !isServer && navigator.userAgent.indexOf('Edge') > -1
}

export const isFirefox = function() {
  return !isServer && !!window.navigator.userAgent.match(/firefox/i)
}

export const isObject = function(input) {
  return Object.prototype.toString.call(input) === '[object Object]';
}
export const isArray = function (input) {
  return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
}
export const isDate = function (input) {
  return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
}
export const isNumber = function (input) {
  return input instanceof Number || Object.prototype.toString.call(input) === '[object Number]';
}
export const isString = function (input) {
  return input instanceof String || Object.prototype.toString.call(input) === '[object String]';
}
export const isBoolean = function (input) {
  return typeof input == 'boolean';
}
export const isFunction = function (input) {
  return typeof input == 'function';
}
export const isNull = function (input) {
  return input === undefined || input === null;
}

export function isHtmlElement(node) {
  return node && node.nodeType === Node.ELEMENT_NODE
}
