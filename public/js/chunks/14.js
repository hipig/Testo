(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/common/Breadcrumb.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/common/Breadcrumb.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
  name: "Breadcrumb",
  props: {
    list: {
      type: Array,
      "default": function _default() {
        return [];
      }
    }
  },
  computed: {
    breadcrumbList: function breadcrumbList() {
      var breadcrumbList = [{
        title: '首页',
        href: '/'
      }];
      this.list.forEach(function (item) {
        var i = {
          title: item.title,
          href: item.level == 0 ? '/subjects' : ''
        };
        breadcrumbList.push(i);
      });
      return breadcrumbList;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/quiz/Result.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/quiz/Result.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_common_Breadcrumb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/common/Breadcrumb */ "./resources/js/components/common/Breadcrumb.vue");
/* harmony import */ var _mixins_QuestionType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/mixins/QuestionType */ "./resources/js/mixins/QuestionType.js");
/* harmony import */ var _api_learnRecord__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/api/learnRecord */ "./resources/js/api/learnRecord.js");
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
  name: "quiz.result",
  components: {
    Breadcrumb: _components_common_Breadcrumb__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  mixins: [_mixins_QuestionType__WEBPACK_IMPORTED_MODULE_1__["default"]],
  data: function data() {
    return {
      recordId: this.$route.params.id,
      record: {},
      recordItems: {},
      recordResult: {},
      totalScore: 0,
      doneTimeText: '00:00:00',
      isLoading: null
    };
  },
  mounted: function mounted() {
    this.showRecordsResult();
  },
  watch: {
    record: function record(val) {
      var time = val.done_time;
      var hour = this.formatTime(Math.floor(time / 3600));
      var minutes = this.formatTime(Math.floor(time % 3600 / 60));
      var seconds = this.formatTime(Math.floor(time % 60));
      this.doneTimeText = hour + ':' + minutes + ':' + seconds;
    }
  },
  filters: {
    formatModeName: function formatModeName(val) {
      var name;

      switch (parseInt(val.type)) {
        case 1:
          name = parseInt(val.quiz_mode) === 1 ? '练习模式' : '考试模式';
          break;

        case 2:
          name = '模拟考试';
          break;

        case 3:
          name = '历年真题';
          break;

        case 4:
          name = '每日一练';
          break;
      }

      return name;
    }
  },
  methods: {
    showRecordsResult: function showRecordsResult() {
      var _this = this;

      this.isLoading = true;

      Object(_api_learnRecord__WEBPACK_IMPORTED_MODULE_2__["showRecordsResult"])(this.recordId).then(function (res) {
        _this.record = res;
        _this.recordItems = res.items;
        _this.recordResult = res.result;
        var score = 0;

        _this.recordItems.forEach(function (v, k) {
          score += v.score;
        });

        _this.totalScore = [1, 4].indexOf(parseInt(res.type)) > -1 ? score : res.score;
      })["finally"](function () {
        _this.isLoading = false;
      });
    },
    formatTime: function formatTime(time) {
      if (time < 10) time = '0' + time;
      return time;
    },
    toDetail: function toDetail() {
      this.$router.push({
        name: 'quiz.result.detail',
        params: {
          id: this.recordId
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/common/Breadcrumb.vue?vue&type=template&id=45b4a48c&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/common/Breadcrumb.vue?vue&type=template&id=45b4a48c& ***!
  \********************************************************************************************************************************************************************************************************************/
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
  return _vm.list.length > 0
    ? _c(
        "div",
        { staticClass: "text-sm" },
        [
          _vm._l(_vm.breadcrumbList, function(item, index) {
            return [
              index !== _vm.breadcrumbList.length - 1
                ? [
                    _c("router-link", { attrs: { to: { path: item.path } } }, [
                      _vm._v(_vm._s(item.title))
                    ]),
                    _vm._v(" "),
                    _c("span", [_vm._v(" / ")])
                  ]
                : _c("span", { staticClass: "text-gray-400" }, [
                    _vm._v(_vm._s(item.title))
                  ])
            ]
          })
        ],
        2
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/quiz/Result.vue?vue&type=template&id=340de4f0&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/quiz/Result.vue?vue&type=template&id=340de4f0& ***!
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
  return _c("div", { staticClass: "pt-5 pb-20 px-4" }, [
    _c(
      "div",
      { staticClass: "max-w-6xl mx-auto" },
      [
        _c("breadcrumb", { attrs: { list: _vm.record.breadcrumb } }),
        _vm._v(" "),
        _c("div", { staticClass: "mt-5 flex flex-wrap -mx-3" }, [
          _c("div", { staticClass: "w-2/3 px-3" }, [
            _c("div", { staticClass: "bg-white shadow rounded-lg p-5 mb-6" }, [
              _c("div", { staticClass: "flex items-center" }, [
                _c(
                  "div",
                  {
                    staticClass: "text-2xl text-gray-900 leading-none truncate"
                  },
                  [_vm._v(_vm._s(_vm.record.bank_title))]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "flex-1 ml-3" }, [
                  _c(
                    "div",
                    {
                      staticClass:
                        "flex justify-center text-base text-teal-500 border border-teal-500 rounded-sm w-20"
                    },
                    [_vm._v(_vm._s(_vm._f("formatModeName")(_vm.record)))]
                  )
                ])
              ]),
              _vm._v(" "),
              [2, 3].indexOf(parseInt(_vm.record.type)) > -1
                ? _c(
                    "div",
                    {
                      staticClass:
                        "mt-4 flex flex-warp items-center text-gray-400"
                    },
                    [
                      _c("div", { staticClass: "mr-10" }, [
                        _vm._v(
                          _vm._s(
                            "本卷共" +
                              _vm.recordItems.length +
                              (_vm.record.is_group ? "大" : "小") +
                              "题"
                          )
                        )
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "mr-10" }, [
                        _vm._v(
                          _vm._s("总分：" + (_vm.record.score || 0) + "分")
                        )
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "mr-10" }, [
                        _vm._v(
                          _vm._s(
                            "时间：" + (_vm.record.time_limit || 0) + "分钟"
                          )
                        )
                      ])
                    ]
                  )
                : _vm._e()
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "bg-white shadow rounded-lg" }, [
              _c(
                "div",
                {
                  staticClass:
                    "h-40 flex flex-col items-center justify-center rounded-tl-lg rounded-tr-lg bg-gradient-to-r from-teal-400 via-teal-500 to-teal-400 text-white mb-3"
                },
                [
                  _c("div", { staticClass: "mb-3" }, [
                    _c("span", { staticClass: "text-5xl" }, [
                      _vm._v(_vm._s(_vm.record.result_score))
                    ]),
                    _vm._v(" 分")
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "mb-1 text-xs" }, [
                    _vm._v("总分："),
                    _c("span", { staticClass: "text-sm" }, [
                      _vm._v(_vm._s(_vm.totalScore) + " 分")
                    ])
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "text-xs" }, [
                    _vm._v(_vm._s(_vm.doneTimeText))
                  ])
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "flex flex-col items-center justify-center" },
                [
                  _c(
                    "table",
                    {
                      directives: [
                        {
                          name: "loading",
                          rawName: "v-loading",
                          value: _vm.isLoading,
                          expression: "isLoading"
                        }
                      ],
                      staticClass: "border-b border-gray-100",
                      attrs: { "loading-custom-class": "h-56" }
                    },
                    [
                      _vm._m(0),
                      _vm._v(" "),
                      _c(
                        "tbody",
                        _vm._l(_vm.recordResult, function(item, index) {
                          return _c("tr", { key: index }, [
                            _c(
                              "td",
                              {
                                staticClass: "text-gray-900 font-semibold py-2"
                              },
                              [
                                _vm._v(
                                  _vm._s(_vm.questionTypes[item.type].name)
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "td",
                              {
                                staticClass:
                                  "text-center text-base text-gray-900 font-semibold py-2"
                              },
                              [_vm._v(_vm._s(item.total))]
                            ),
                            _vm._v(" "),
                            _c(
                              "td",
                              {
                                staticClass:
                                  "text-center text-base text-green-500 font-semibold py-2"
                              },
                              [_vm._v(_vm._s(item.right))]
                            ),
                            _vm._v(" "),
                            _c(
                              "td",
                              {
                                staticClass:
                                  "text-center text-base text-red-500 font-semibold py-2"
                              },
                              [_vm._v(_vm._s(item.error))]
                            ),
                            _vm._v(" "),
                            _c("td", { staticClass: "text-center py-2" }, [
                              _vm._v(_vm._s(item.score))
                            ])
                          ])
                        }),
                        0
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "text-gray-400 text-xs py-2" }, [
                    _vm._v("主观题无法判断对错，按正确计分")
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "pt-8 pb-12" }, [
                    _c(
                      "button",
                      {
                        staticClass:
                          "inline-flex justify-center py-3 w-64 leading-tight rounded text-white bg-gradient-to-r from-teal-400 to-teal-500 focus:outline-none",
                        attrs: { type: "button" },
                        on: { click: _vm.toDetail }
                      },
                      [_vm._v("查看解析")]
                    )
                  ])
                ]
              )
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "w-1/3 px-3" })
        ])
      ],
      1
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c(
          "th",
          { staticClass: "w-24 text-left text-gray-400 font-normal py-3" },
          [_vm._v("题型")]
        ),
        _vm._v(" "),
        _c("th", { staticClass: "w-24 text-gray-400 font-normal py-3" }, [
          _vm._v("数量")
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "w-24 text-gray-400 font-normal py-3" }, [
          _vm._v("正确")
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "w-24 text-gray-400 font-normal py-3" }, [
          _vm._v("错误")
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "w-24 text-gray-400 font-normal py-3" }, [
          _vm._v("得分")
        ])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/api/learnRecord.js":
/*!*****************************************!*\
  !*** ./resources/js/api/learnRecord.js ***!
  \*****************************************/
/*! exports provided: getRecords, showRecords, showRecordsResult, storeTestRecords, storeExamRecords, storeDailyTestRecords, storeRecordItems, updateRecords, deleteRecords */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRecords", function() { return getRecords; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showRecords", function() { return showRecords; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showRecordsResult", function() { return showRecordsResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storeTestRecords", function() { return storeTestRecords; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storeExamRecords", function() { return storeExamRecords; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storeDailyTestRecords", function() { return storeDailyTestRecords; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storeRecordItems", function() { return storeRecordItems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateRecords", function() { return updateRecords; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteRecords", function() { return deleteRecords; });
/* harmony import */ var _utils_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/request */ "./resources/js/utils/request.js");
/* harmony import */ var _utils_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/util */ "./resources/js/utils/util.js");


var api = {
  getRecords: '/records',
  showRecords: '/records/%s',
  showRecordsResult: '/records/%s/result',
  testRecords: '/records/test',
  examRecords: '/records/exam',
  dailyTestRecords: '/records/daily-test',
  recordItems: '/records/%s/items',
  updateRecords: '/records/%s'
};
var getRecords = function getRecords(params) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: api.getRecords,
    method: 'get',
    params: params
  });
};
var showRecords = function showRecords(id, params) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: Object(_utils_util__WEBPACK_IMPORTED_MODULE_1__["sprintf"])(api.showRecords, id),
    method: 'get',
    params: params
  });
};
var showRecordsResult = function showRecordsResult(id, params) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: Object(_utils_util__WEBPACK_IMPORTED_MODULE_1__["sprintf"])(api.showRecordsResult, id),
    method: 'get',
    params: params
  });
};
var storeTestRecords = function storeTestRecords(params) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: api.testRecords,
    method: 'post',
    data: params
  });
};
var storeExamRecords = function storeExamRecords(params) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: api.examRecords,
    method: 'post',
    data: params
  });
};
var storeDailyTestRecords = function storeDailyTestRecords(params) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: api.dailyTestRecords,
    method: 'post',
    data: params
  });
};
var storeRecordItems = function storeRecordItems(id, params) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: Object(_utils_util__WEBPACK_IMPORTED_MODULE_1__["sprintf"])(api.recordItems, id),
    method: 'post',
    data: params
  });
};
var updateRecords = function updateRecords(id, params) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: Object(_utils_util__WEBPACK_IMPORTED_MODULE_1__["sprintf"])(api.updateRecords, id),
    method: 'put',
    data: params
  });
};
var deleteRecords = function deleteRecords(id) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: Object(_utils_util__WEBPACK_IMPORTED_MODULE_1__["sprintf"])(api.updateRecords, id),
    method: 'delete'
  });
};

/***/ }),

/***/ "./resources/js/components/common/Breadcrumb.vue":
/*!*******************************************************!*\
  !*** ./resources/js/components/common/Breadcrumb.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Breadcrumb_vue_vue_type_template_id_45b4a48c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Breadcrumb.vue?vue&type=template&id=45b4a48c& */ "./resources/js/components/common/Breadcrumb.vue?vue&type=template&id=45b4a48c&");
/* harmony import */ var _Breadcrumb_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Breadcrumb.vue?vue&type=script&lang=js& */ "./resources/js/components/common/Breadcrumb.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Breadcrumb_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Breadcrumb_vue_vue_type_template_id_45b4a48c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Breadcrumb_vue_vue_type_template_id_45b4a48c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/common/Breadcrumb.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/common/Breadcrumb.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/common/Breadcrumb.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Breadcrumb_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Breadcrumb.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/common/Breadcrumb.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Breadcrumb_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/common/Breadcrumb.vue?vue&type=template&id=45b4a48c&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/common/Breadcrumb.vue?vue&type=template&id=45b4a48c& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Breadcrumb_vue_vue_type_template_id_45b4a48c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Breadcrumb.vue?vue&type=template&id=45b4a48c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/common/Breadcrumb.vue?vue&type=template&id=45b4a48c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Breadcrumb_vue_vue_type_template_id_45b4a48c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Breadcrumb_vue_vue_type_template_id_45b4a48c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/mixins/QuestionType.js":
/*!*********************************************!*\
  !*** ./resources/js/mixins/QuestionType.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      questionTypes: {
        1: {
          name: '单选题',
          desc: '每小题的备选项中，只有一个符合题意'
        },
        2: {
          name: '多选题',
          desc: '每小题的备选项中，有两个或两个以上符合题意，多选,少选，错选,不选均不得分'
        },
        3: {
          name: '判断题',
          desc: '每小题答对得分，错误不得分'
        },
        4: {
          name: '填空题',
          desc: '有两个或两个以上的空时，少填，错填,不填均不得分'
        },
        5: {
          name: '问答题',
          desc: '主观题仅提供作答，默认得分。'
        }
      }
    };
  }
});

/***/ }),

/***/ "./resources/js/views/quiz/Result.vue":
/*!********************************************!*\
  !*** ./resources/js/views/quiz/Result.vue ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Result_vue_vue_type_template_id_340de4f0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Result.vue?vue&type=template&id=340de4f0& */ "./resources/js/views/quiz/Result.vue?vue&type=template&id=340de4f0&");
/* harmony import */ var _Result_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Result.vue?vue&type=script&lang=js& */ "./resources/js/views/quiz/Result.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Result_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Result_vue_vue_type_template_id_340de4f0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Result_vue_vue_type_template_id_340de4f0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/quiz/Result.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/quiz/Result.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./resources/js/views/quiz/Result.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Result_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Result.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/quiz/Result.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Result_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/quiz/Result.vue?vue&type=template&id=340de4f0&":
/*!***************************************************************************!*\
  !*** ./resources/js/views/quiz/Result.vue?vue&type=template&id=340de4f0& ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Result_vue_vue_type_template_id_340de4f0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Result.vue?vue&type=template&id=340de4f0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/quiz/Result.vue?vue&type=template&id=340de4f0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Result_vue_vue_type_template_id_340de4f0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Result_vue_vue_type_template_id_340de4f0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);