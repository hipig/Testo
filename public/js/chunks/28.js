(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[28],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/about/Index.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/about/Index.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_about__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/api/about */ "./resources/js/api/about.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "about.index",
  data: function data() {
    return {
      about: {},
      aboutList: [],
      currentName: '',
      isLoading: null
    };
  },
  mounted: function mounted() {
    this.getAboutList();
  },
  watch: {
    $route: function $route(to, from) {
      this.currentName = to.params.name;
      this.getAbout();
    }
  },
  methods: {
    getAboutList: function getAboutList() {
      var _this = this;

      Object(_api_about__WEBPACK_IMPORTED_MODULE_0__["getAbouts"])().then(function (res) {
        _this.aboutList = res;
        _this.currentName = _this.$route.params.name || res[0].name;

        _this.getAbout();
      });
    },
    getAbout: function getAbout() {
      var _this2 = this;

      this.isLoading = true;
      Object(_api_about__WEBPACK_IMPORTED_MODULE_0__["getAboutsShow"])(this.currentName).then(function (res) {
        _this2.about = res;
      })["finally"](function (_) {
        _this2.isLoading = false;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/about/Index.vue?vue&type=template&id=39cad8fe&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/about/Index.vue?vue&type=template&id=39cad8fe& ***!
  \*********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "py-5 px-4" }, [
    _c("div", { staticClass: "max-w-6xl mx-auto" }, [
      _vm._m(0),
      _vm._v(" "),
      _c("div", { staticClass: "mt-2 pb-20" }, [
        _c("div", { staticClass: "flex flex-wrap -mx-3" }, [
          _c("div", { staticClass: "w-1/4 px-3" }, [
            _c("div", { staticClass: "shadow rounded-lg w-full bg-white" }, [
              _c(
                "div",
                { staticClass: "flex flex-col" },
                _vm._l(_vm.aboutList, function(item, index) {
                  return _c(
                    "router-link",
                    {
                      key: index,
                      staticClass:
                        "block py-3 border-b border-gray-100 flex items-center cursor-pointer",
                      attrs: {
                        to: { name: "about.index", params: { name: item.name } }
                      }
                    },
                    [
                      _c("div", {
                        staticClass: "h-6 w-1",
                        class: [
                          _vm.currentName === item.name
                            ? "bg-teal-500"
                            : "bg-transparent"
                        ]
                      }),
                      _vm._v(" "),
                      _c("div", { staticClass: "pl-5 text-base" }, [
                        _vm._v(_vm._s(item.title))
                      ])
                    ]
                  )
                }),
                1
              )
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "w-3/4 px-3" }, [
            _c("div", { staticClass: "shadow rounded-lg w-full bg-white" }, [
              _c(
                "div",
                {
                  staticClass:
                    "px-5 py-3 border-b border-gray-100 text-gray-900 text-xl"
                },
                [_vm._v(_vm._s(_vm.about.title))]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "loading",
                      rawName: "v-loading",
                      value: _vm.isLoading,
                      expression: "isLoading"
                    }
                  ],
                  staticClass: "px-5 py-6 text-base",
                  attrs: { "loading-custom-class": "h-56" }
                },
                [
                  _c("div", {
                    domProps: { innerHTML: _vm._s(_vm.about.content) }
                  })
                ]
              )
            ])
          ])
        ])
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "text-sm" }, [
      _c("a", { attrs: { href: "/" } }, [_vm._v("首页")]),
      _vm._v(" "),
      _c("span", [_vm._v(" / ")]),
      _vm._v(" "),
      _c("span", { staticClass: "text-gray-400" }, [_vm._v("关于我们")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/api/about.js":
/*!***********************************!*\
  !*** ./resources/js/api/about.js ***!
  \***********************************/
/*! exports provided: getAbouts, getAboutsShow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAbouts", function() { return getAbouts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAboutsShow", function() { return getAboutsShow; });
/* harmony import */ var _utils_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/request */ "./resources/js/utils/request.js");
/* harmony import */ var _utils_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/util */ "./resources/js/utils/util.js");


var api = {
  abouts: '/abouts',
  aboutsShow: '/abouts/%s'
};
var getAbouts = function getAbouts() {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: api.abouts,
    method: 'get'
  });
};
var getAboutsShow = function getAboutsShow(name) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: Object(_utils_util__WEBPACK_IMPORTED_MODULE_1__["sprintf"])(api.aboutsShow, name),
    method: 'get'
  });
};

/***/ }),

/***/ "./resources/js/views/about/Index.vue":
/*!********************************************!*\
  !*** ./resources/js/views/about/Index.vue ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Index_vue_vue_type_template_id_39cad8fe___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Index.vue?vue&type=template&id=39cad8fe& */ "./resources/js/views/about/Index.vue?vue&type=template&id=39cad8fe&");
/* harmony import */ var _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Index.vue?vue&type=script&lang=js& */ "./resources/js/views/about/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Index_vue_vue_type_template_id_39cad8fe___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Index_vue_vue_type_template_id_39cad8fe___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/about/Index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/about/Index.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./resources/js/views/about/Index.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/about/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/about/Index.vue?vue&type=template&id=39cad8fe&":
/*!***************************************************************************!*\
  !*** ./resources/js/views/about/Index.vue?vue&type=template&id=39cad8fe& ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_39cad8fe___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=template&id=39cad8fe& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/about/Index.vue?vue&type=template&id=39cad8fe&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_39cad8fe___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_39cad8fe___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);