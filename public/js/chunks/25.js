(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[25],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/quiz/Items.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/quiz/Items.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_common_Breadcrumb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/common/Breadcrumb */ "./resources/js/components/common/Breadcrumb.vue");
/* harmony import */ var _components_common_EmptyData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/common/EmptyData */ "./resources/js/components/common/EmptyData.vue");
/* harmony import */ var _components_questions_ExamItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/questions/ExamItem */ "./resources/js/components/questions/ExamItem.vue");
/* harmony import */ var _mixins_QuestionType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/mixins/QuestionType */ "./resources/js/mixins/QuestionType.js");
/* harmony import */ var _api_subject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/api/subject */ "./resources/js/api/subject.js");
/* harmony import */ var _api_userCollect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/api/userCollect */ "./resources/js/api/userCollect.js");
/* harmony import */ var _api_userNote__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/api/userNote */ "./resources/js/api/userNote.js");
/* harmony import */ var _api_userError__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/api/userError */ "./resources/js/api/userError.js");
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
//
//








/* harmony default export */ __webpack_exports__["default"] = ({
  name: "quiz.items",
  components: {
    Breadcrumb: _components_common_Breadcrumb__WEBPACK_IMPORTED_MODULE_0__["default"],
    EmptyData: _components_common_EmptyData__WEBPACK_IMPORTED_MODULE_1__["default"],
    ExamItem: _components_questions_ExamItem__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  mixins: [_mixins_QuestionType__WEBPACK_IMPORTED_MODULE_3__["default"]],
  data: function data() {
    return {
      type: this.$route.params.type,
      form: {
        subject_pid: this.$route.query.subject_pid || "",
        subject_id: this.$route.query.subject_id || "",
        question_type: this.$route.query.question_type || "",
        date: this.$route.query.date || []
      },
      index: this.$route.query.index,
      subject: {},
      items: [],
      page: this.$route.query.page || 1,
      totalPage: 0,
      isLoading: null,
      isScroll: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.getItems();
    this.form.subject_id && this.getSubject();
    this.$nextTick(function () {
      document.addEventListener('scroll', _this.onScroll);
    });
  },
  beforeDestroy: function beforeDestroy() {
    document.removeEventListener('scroll', this.onScroll);
  },
  computed: {
    typeTitle: function typeTitle() {
      var typeTitles = {
        'collect': '收藏集',
        'error': '错题集',
        'note': '我的笔记'
      };
      return typeTitles[this.type];
    }
  },
  methods: {
    onScroll: function onScroll() {
      var _this2 = this;

      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

      if (scrollHeight - scrollTop - clientHeight < 100 && !this.isScroll && this.totalPage > this.page) {
        this.isScroll = true;
        setTimeout(function () {
          _this2.page++;

          _this2.getItems();
        }, 500);
      }
    },
    getSubject: function getSubject() {
      var _this3 = this;

      Object(_api_subject__WEBPACK_IMPORTED_MODULE_4__["getSubjectsShow"])(this.form.subject_id).then(function (res) {
        _this3.subject = res;
      });
    },
    getItems: function getItems() {
      var _this4 = this;

      this.isLoading = true;
      var requests = {
        'collect': _api_userCollect__WEBPACK_IMPORTED_MODULE_5__["getUserCollects"],
        'note': _api_userNote__WEBPACK_IMPORTED_MODULE_6__["getUserNotesDetail"],
        'error': _api_userError__WEBPACK_IMPORTED_MODULE_7__["getUserErrors"]
      };
      var params = this.form;
      params.page = this.page;
      requests[this.type](params).then(function (res) {
        var items = res.data;

        if (_this4.type === 'note') {
          items = items.map(function (item) {
            item.notes = item.notes.map(function (val) {
              val.upload_urls = val.upload_items.map(function (v) {
                return v.url;
              });
              return val;
            });
            return item;
          });
        }

        _this4.items = _this4.items.concat(items);
        _this4.totalPage = res.meta.last_page;
        _this4.index && _this4.toIndex(_this4.index);
        _this4.isScroll = _this4.page === _this4.totalPage;
      })["finally"](function () {
        _this4.isLoading = false;
      });
    },
    handleDelete: function handleDelete(item) {
      var _this5 = this;

      var requests = {
        'collect': _api_userCollect__WEBPACK_IMPORTED_MODULE_5__["destroyUserCollects"],
        'note': _api_userNote__WEBPACK_IMPORTED_MODULE_6__["destroyUserNotes"],
        'error': _api_userError__WEBPACK_IMPORTED_MODULE_7__["destroyUserErrors"]
      };
      this.$Dialog.confirm(this.type === 'collect' ? '是否取消收藏？' : '是否删除？', '温馨提示').then(function (_) {
        requests[_this5.type](item.id).then(function (_) {
          _this5.$Message.success('删除成功');

          _this5.$router.go(0);
        });
      })["catch"](function (_) {});
    },
    toIndex: function toIndex(index) {
      this.$nextTick(function () {
        document.getElementById(index).scrollIntoView({
          behavior: "smooth"
        });
      });
    },
    handleBack: function handleBack() {
      this.$router.go(-1);
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/quiz/Items.vue?vue&type=template&id=05bedaa5&":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/quiz/Items.vue?vue&type=template&id=05bedaa5& ***!
  \********************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "pt-5 pb-20 px-4" }, [
    _c("div", { staticClass: "max-w-6xl mx-auto" }, [
      _c(
        "div",
        { staticClass: "text-sm" },
        [
          _c("router-link", { attrs: { to: { name: "home" } } }, [
            _vm._v("首页")
          ]),
          _vm._v(" "),
          _c("span", [_vm._v(" / ")]),
          _vm._v(" "),
          _c("span", { staticClass: "text-gray-400" }, [
            _vm._v(_vm._s(_vm.typeTitle))
          ])
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "mt-5 flex flex-wrap -mx-3" }, [
        _c(
          "div",
          { staticClass: "w-2/3 px-3" },
          [
            _c("div", { staticClass: "bg-white shadow rounded-lg p-5 mb-5" }, [
              _c("div", { staticClass: "flex items-center" }, [
                _c(
                  "div",
                  {
                    staticClass: "text-2xl text-gray-900 leading-none truncate"
                  },
                  [_vm._v(_vm._s(_vm.typeTitle))]
                )
              ]),
              _vm._v(" "),
              _vm.form.subject_id
                ? _c(
                    "div",
                    {
                      staticClass:
                        "mt-4 flex flex-warp items-center text-gray-400"
                    },
                    [
                      _vm._v(
                        "\n            " +
                          _vm._s(_vm.subject.title) +
                          "\n          "
                      )
                    ]
                  )
                : _vm._e()
            ]),
            _vm._v(" "),
            _vm._l(_vm.items, function(item, index) {
              return _c(
                "exam-item",
                {
                  key: index,
                  attrs: {
                    id: "q-" + item.id,
                    item: _vm.type === "note" ? item : item.bank_item,
                    index: index,
                    answer:
                      _vm.type === "note"
                        ? item.question.answer
                        : item.bank_item.question.answer,
                    "show-parse": true,
                    "show-check-result": false,
                    "show-answer-bar":
                      (_vm.type === "note" ? item : item.bank_item)
                        .question_type !== 5,
                    "show-collect": _vm.type !== "collect"
                  }
                },
                [
                  _vm.type !== "note"
                    ? _c("div", { attrs: { slot: "tool" }, slot: "tool" }, [
                        _c(
                          "div",
                          {
                            staticClass: "flex items-center cursor-pointer",
                            on: {
                              click: function($event) {
                                return _vm.handleDelete(item)
                              }
                            }
                          },
                          [
                            _c(
                              "svg",
                              {
                                staticClass:
                                  "w-6 h-6 stroke-current text-gray-400 mr-1",
                                attrs: { fill: "none", viewBox: "0 0 24 24" }
                              },
                              [
                                _c("path", {
                                  attrs: {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d:
                                      "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  }
                                })
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "span",
                              { staticClass: "text-base text-gray-900" },
                              [
                                _vm._v(
                                  _vm._s(
                                    _vm.type === "collect" ? "取消收藏" : "移除"
                                  )
                                )
                              ]
                            )
                          ]
                        )
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.type === "note" && item.notes
                    ? _c(
                        "div",
                        { attrs: { slot: "footer" }, slot: "footer" },
                        _vm._l(item.notes, function(value, key) {
                          return _c(
                            "div",
                            {
                              key: key,
                              staticClass:
                                "mb-4 px-4 pb-3 border-b border-gray-100"
                            },
                            [
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "flex items-center justify-between text-xs text-gray-400"
                                },
                                [
                                  _c("div", {}, [
                                    _vm._v(_vm._s(value.created_at))
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    {
                                      staticClass: "cursor-pointer",
                                      on: {
                                        click: function($event) {
                                          return _vm.handleDelete(value)
                                        }
                                      }
                                    },
                                    [_vm._v("删除")]
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "flex flex-col text-base" },
                                [
                                  _c("div", {
                                    domProps: {
                                      innerHTML: _vm._s(value.content)
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    {
                                      staticClass:
                                        "flex flex-wrap -mb-2 -mr-2 mt-3"
                                    },
                                    _vm._l(value.upload_items, function(v, k) {
                                      return _c(
                                        "div",
                                        { staticClass: "pr-3 pb-3 flex" },
                                        [
                                          _c("t-image", {
                                            key: k,
                                            staticClass: "w-24 h-24 mr-2",
                                            attrs: {
                                              src: v.url,
                                              "preview-src-list":
                                                value.upload_urls,
                                              fit: "cover",
                                              alt: v.name
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    }),
                                    0
                                  )
                                ]
                              )
                            ]
                          )
                        }),
                        0
                      )
                    : _vm._e()
                ]
              )
            }),
            _vm._v(" "),
            _c("div", {
              directives: [
                {
                  name: "loading",
                  rawName: "v-loading",
                  value: _vm.isLoading,
                  expression: "isLoading"
                }
              ],
              attrs: { "loading-custom-class": "h-56" }
            }),
            _vm._v(" "),
            _c("empty-data", {
              staticClass: "mt-5",
              attrs: { show: _vm.isLoading === false && _vm.items.length === 0 }
            })
          ],
          2
        ),
        _vm._v(" "),
        _c("div", { staticClass: "w-1/3 px-3 relative" }, [
          _c("div", { staticClass: "sticky top-1" }, [
            _c("div", { staticClass: "bg-white shadow rounded-lg mb-5" }, [
              _c(
                "div",
                {
                  staticClass:
                    "px-5 py-3 border-b border-gray-100 text-base text-gray-900 font-semibold"
                },
                [_vm._v("选项卡")]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "px-5 py-4" }, [
                _c(
                  "div",
                  { staticClass: "flex flex-wrap -mx-1" },
                  _vm._l(_vm.items, function(item, index) {
                    return _c(
                      "div",
                      {
                        key: index,
                        staticClass:
                          "w-6 h-6 mx-1 mb-2 leading-none flex items-center justify-center border border-gray-100 hover:border-teal-500 text-gray-500 text-xs rounded-sm cursor-pointer",
                        on: {
                          click: function($event) {
                            return _vm.toIndex("q-" + item.id)
                          }
                        }
                      },
                      [_vm._v(_vm._s(index + 1))]
                    )
                  }),
                  0
                ),
                _vm._v(" "),
                _vm.isLoading === false && _vm.items.length === 0
                  ? _c("div", { staticClass: "text-gray-400" }, [
                      _vm._v("还没有数据哦~")
                    ])
                  : _vm._e()
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "bg-white shadow rounded-lg py-3 mb-5" }, [
              _c("div", { staticClass: "flex justify-center" }, [
                _c(
                  "button",
                  {
                    staticClass:
                      "px-4 h-8 flex items-center justify-center border border-teal-500 text-teal-500 bg-white rounded focus:outline-none",
                    attrs: { type: "button" },
                    on: { click: _vm.handleBack }
                  },
                  [_vm._v("返回上级")]
                )
              ])
            ])
          ])
        ])
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/api/subject.js":
/*!*************************************!*\
  !*** ./resources/js/api/subject.js ***!
  \*************************************/
/*! exports provided: getSubjectsTree, getSubjectsShow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSubjectsTree", function() { return getSubjectsTree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSubjectsShow", function() { return getSubjectsShow; });
/* harmony import */ var _utils_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/request */ "./resources/js/utils/request.js");
/* harmony import */ var _utils_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/util */ "./resources/js/utils/util.js");


var api = {
  subjectsTree: '/subjects/tree',
  subjectsShow: '/subjects/%s'
};
var getSubjectsTree = function getSubjectsTree() {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: api.subjectsTree,
    method: 'get'
  });
};
var getSubjectsShow = function getSubjectsShow(id) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: Object(_utils_util__WEBPACK_IMPORTED_MODULE_1__["sprintf"])(api.subjectsShow, id),
    method: 'get'
  });
};

/***/ }),

/***/ "./resources/js/api/userError.js":
/*!***************************************!*\
  !*** ./resources/js/api/userError.js ***!
  \***************************************/
/*! exports provided: getUserErrors, destroyUserErrors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUserErrors", function() { return getUserErrors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "destroyUserErrors", function() { return destroyUserErrors; });
/* harmony import */ var _utils_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/request */ "./resources/js/utils/request.js");
/* harmony import */ var _utils_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/util */ "./resources/js/utils/util.js");


var api = {
  userErrors: '/user/errors',
  destroyUserErrors: '/user/errors/%s'
};
var getUserErrors = function getUserErrors(params) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: api.userErrors,
    method: 'get',
    params: params
  });
};
var destroyUserErrors = function destroyUserErrors(id) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: Object(_utils_util__WEBPACK_IMPORTED_MODULE_1__["sprintf"])(api.destroyUserErrors, id),
    method: 'delete'
  });
};

/***/ }),

/***/ "./resources/js/views/quiz/Items.vue":
/*!*******************************************!*\
  !*** ./resources/js/views/quiz/Items.vue ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Items_vue_vue_type_template_id_05bedaa5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Items.vue?vue&type=template&id=05bedaa5& */ "./resources/js/views/quiz/Items.vue?vue&type=template&id=05bedaa5&");
/* harmony import */ var _Items_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Items.vue?vue&type=script&lang=js& */ "./resources/js/views/quiz/Items.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Items_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Items_vue_vue_type_template_id_05bedaa5___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Items_vue_vue_type_template_id_05bedaa5___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/quiz/Items.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/quiz/Items.vue?vue&type=script&lang=js&":
/*!********************************************************************!*\
  !*** ./resources/js/views/quiz/Items.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Items_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Items.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/quiz/Items.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Items_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/quiz/Items.vue?vue&type=template&id=05bedaa5&":
/*!**************************************************************************!*\
  !*** ./resources/js/views/quiz/Items.vue?vue&type=template&id=05bedaa5& ***!
  \**************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Items_vue_vue_type_template_id_05bedaa5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Items.vue?vue&type=template&id=05bedaa5& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/quiz/Items.vue?vue&type=template&id=05bedaa5&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Items_vue_vue_type_template_id_05bedaa5___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Items_vue_vue_type_template_id_05bedaa5___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);