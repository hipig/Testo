(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[19],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/common/Timing.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/common/Timing.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Timing",
  props: {
    second: {
      type: Number,
      "default": 0
    },
    doneSecond: {
      type: Number,
      "default": 0
    },
    isCountdown: {
      type: Boolean,
      "default": false
    }
  },
  computed: {
    isTiming: function isTiming() {
      return this.second === 0;
    },
    timingText: function timingText() {
      var time = this.doneSecond;
      if (this.isCountdown) time = this.second - this.doneSecond;
      var hour = this.formatTime(Math.floor(time / 3600));
      var minutes = this.formatTime(Math.floor(time % 3600 / 60));
      var seconds = this.formatTime(Math.floor(time % 60));
      return hour + ':' + minutes + ':' + seconds;
    }
  },
  methods: {
    formatTime: function formatTime(time) {
      if (time < 10) time = '0' + time;
      return time;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/quiz/mode/Test.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/quiz/mode/Test.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_common_Breadcrumb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/common/Breadcrumb */ "./resources/js/components/common/Breadcrumb.vue");
/* harmony import */ var _components_common_EmptyData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/common/EmptyData */ "./resources/js/components/common/EmptyData.vue");
/* harmony import */ var _components_questions_ExamItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/questions/ExamItem */ "./resources/js/components/questions/ExamItem.vue");
/* harmony import */ var _components_common_Timing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/common/Timing */ "./resources/js/components/common/Timing.vue");
/* harmony import */ var _components_common_modal_Modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/common/modal/Modal */ "./resources/js/components/common/modal/Modal.vue");
/* harmony import */ var _api_learnRecord__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/api/learnRecord */ "./resources/js/api/learnRecord.js");
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
  name: "quiz.mode.test",
  components: {
    Breadcrumb: _components_common_Breadcrumb__WEBPACK_IMPORTED_MODULE_0__["default"],
    EmptyData: _components_common_EmptyData__WEBPACK_IMPORTED_MODULE_1__["default"],
    ExamItem: _components_questions_ExamItem__WEBPACK_IMPORTED_MODULE_2__["default"],
    Timing: _components_common_Timing__WEBPACK_IMPORTED_MODULE_3__["default"],
    TModal: _components_common_modal_Modal__WEBPACK_IMPORTED_MODULE_4__["default"]
  },
  data: function data() {
    return {
      recordId: this.$route.params.id,
      record: {},
      recordItems: [],
      answerList: [],
      isPause: false,
      isLoading: null,
      pauseModalVisible: false,
      submitModalVisible: false,
      doneTime: 0,
      doneCount: 0,
      timer: null
    };
  },
  mounted: function mounted() {
    this.showRecords();
  },
  computed: {
    undoneCount: function undoneCount() {
      return this.answerList.length - this.doneCount;
    }
  },
  watch: {
    isPause: function isPause(val) {
      this.pauseModalVisible = val;
    }
  },
  methods: {
    showRecords: function showRecords() {
      var _this = this;

      this.isLoading = true;

      Object(_api_learnRecord__WEBPACK_IMPORTED_MODULE_5__["showRecords"])(this.recordId).then(function (res) {
        _this.record = res;
        _this.recordItems = res.items;
        _this.doneTime = res.done_time;
        _this.answerList = res.items.map(function (item) {
          return {
            record_id: _this.recordId,
            bank_id: item.bank_id,
            bank_item_id: item.id,
            question_id: item.question.id,
            question_type: item.question.type,
            answer: item.record && item.record.answer || ""
          };
        });
        _this.doneCount = _this.answerList.filter(function (item) {
          return item.answer.length !== 0;
        }).length;
      })["finally"](function () {
        _this.isLoading = false;
        _this.timer = setInterval(_this.intervalEvent, 1000);
      });
    },
    intervalEvent: function intervalEvent() {
      if (!this.isPause) this.doneTime++;
    },
    toIndex: function toIndex(index) {
      this.$nextTick(function () {
        document.getElementById(index).scrollIntoView({
          behavior: "smooth"
        });
      });
    },
    handleAnswer: function handleAnswer(answer, isRight, index) {
      this.answerList[index] = Object.assign({}, this.answerList[index], {
        answer: answer,
        is_right: isRight
      });
      this.doneCount = this.answerList.filter(function (item) {
        return item.answer.length !== 0;
      }).length;
    },
    getDoneTime: function getDoneTime(second) {
      this.doneTime = second;
    },
    submitRecord: function submitRecord() {
      var _this2 = this;

      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'end';
      var params = {
        done_time: this.doneTime,
        type: type,
        items: this.answerList
      };
      Object(_api_learnRecord__WEBPACK_IMPORTED_MODULE_5__["updateRecords"])(this.recordId, params).then(function (res) {
        _this2.submitModalVisible = false;

        _this2.$router.push({
          name: 'quiz.result',
          params: {
            id: _this2.recordId
          }
        });
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/common/Timing.vue?vue&type=template&id=29d449d3&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/common/Timing.vue?vue&type=template&id=29d449d3& ***!
  \****************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "inline-flex" }, [
    _vm._v("\n  " + _vm._s(_vm.timingText) + "\n")
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/quiz/mode/Test.vue?vue&type=template&id=9fddd9ba&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/quiz/mode/Test.vue?vue&type=template&id=9fddd9ba& ***!
  \************************************************************************************************************************************************************************************************************/
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
  return _c(
    "div",
    { staticClass: "pt-5 pb-20 px-4" },
    [
      _c(
        "div",
        { staticClass: "max-w-6xl mx-auto" },
        [
          _c("breadcrumb", { attrs: { list: _vm.record.breadcrumb } }),
          _vm._v(" "),
          _c("div", { staticClass: "mt-5 flex flex-wrap -mx-3" }, [
            _c(
              "div",
              { staticClass: "w-2/3 px-3" },
              [
                _vm.record.id
                  ? _c(
                      "div",
                      { staticClass: "bg-white shadow rounded-lg p-5 mb-5" },
                      [
                        _c("div", { staticClass: "flex items-center" }, [
                          _c(
                            "div",
                            {
                              staticClass:
                                "text-2xl text-gray-900 leading-none truncate"
                            },
                            [_vm._v(_vm._s(_vm.record.bank_title))]
                          ),
                          _vm._v(" "),
                          _vm._m(0)
                        ])
                      ]
                    )
                  : _vm._e(),
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
                    attrs: { "loading-custom-class": "h-56" }
                  },
                  [
                    _vm._l(_vm.recordItems, function(item, index) {
                      return [
                        _c("exam-item", {
                          key: index,
                          attrs: {
                            id: "q-" + index,
                            item: item,
                            answer: _vm.answerList[index].answer,
                            index: index
                          },
                          on: { answer: _vm.handleAnswer }
                        })
                      ]
                    })
                  ],
                  2
                ),
                _vm._v(" "),
                _c("empty-data", {
                  attrs: {
                    show:
                      _vm.isLoading === false && _vm.recordItems.length === 0
                  }
                })
              ],
              1
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
                    [_vm._v("答题卡")]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass:
                        "px-5 py-4 h-36 overflow-auto scrollbar-hover"
                    },
                    [
                      _vm.answerList.length > 0
                        ? _c(
                            "div",
                            { staticClass: "flex flex-wrap -mx-1 -mb-2" },
                            _vm._l(_vm.answerList, function(item, index) {
                              return _c(
                                "div",
                                {
                                  key: index,
                                  staticClass:
                                    "w-6 h-6 mx-1 mb-2 leading-none flex items-center justify-center border text-xs rounded-sm cursor-pointer",
                                  class: [
                                    item.answer.length === 0
                                      ? "text-gray-500 border-gray-100 hover:border-teal-500"
                                      : "text-white bg-gray-400 border-gray-400"
                                  ],
                                  on: {
                                    click: function($event) {
                                      return _vm.toIndex("q-" + index)
                                    }
                                  }
                                },
                                [_vm._v(_vm._s(index + 1))]
                              )
                            }),
                            0
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.isLoading === false && _vm.answerList.length === 0
                        ? _c("div", { staticClass: "text-gray-400" }, [
                            _vm._v("还没有数据哦~")
                          ])
                        : _vm._e()
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass:
                        "mt-1 px-20 py-3 flex justify-between border-t border-gray-100"
                    },
                    [
                      _c(
                        "div",
                        { staticClass: "flex items-center text-gray-900" },
                        [
                          _c("div", {
                            staticClass:
                              "bg-gray-400 border border-gray-400 w-4 h-4 mr-1"
                          }),
                          _vm._v(" "),
                          _c("div", { staticClass: "leading-none" }, [
                            _vm._v("已做 " + _vm._s(_vm.doneCount))
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "flex items-center text-gray-900" },
                        [
                          _c("div", {
                            staticClass:
                              "bg-white border border-gray-200 w-4 h-4 mr-1"
                          }),
                          _vm._v(" "),
                          _c("div", { staticClass: "leading-none" }, [
                            _vm._v("未做 " + _vm._s(_vm.undoneCount))
                          ])
                        ]
                      )
                    ]
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "bg-white shadow rounded-lg mb-5" }, [
                  _c(
                    "div",
                    {
                      staticClass: "border-b border-gray-100 flex leading-none"
                    },
                    [
                      _c("div", { staticClass: "w-2/3 flex items-center" }, [
                        _c(
                          "div",
                          {
                            staticClass:
                              "w-full flex items-center py-2 px-4 border-r border-gray-100"
                          },
                          [
                            _c(
                              "svg",
                              {
                                staticClass:
                                  "w-6 h-6 stroke-current text-gray-400",
                                attrs: { fill: "none", viewBox: "0 0 24 24" }
                              },
                              [
                                _c("path", {
                                  attrs: {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d:
                                      "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                  }
                                })
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "span",
                              { staticClass: "text-teal-500 text-base ml-1" },
                              [
                                _vm.isLoading === false
                                  ? _c("timing", {
                                      attrs: {
                                        second: 0,
                                        "done-second": _vm.doneTime
                                      }
                                    })
                                  : _vm._e()
                              ],
                              1
                            )
                          ]
                        )
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "w-1/3 flex items-center py-2 px-4" },
                        [
                          _c(
                            "div",
                            {
                              staticClass: "cursor-pointer flex items-center",
                              on: {
                                click: function($event) {
                                  _vm.isPause = true
                                }
                              }
                            },
                            [
                              _c(
                                "svg",
                                {
                                  staticClass:
                                    "w-6 h-6 stroke-current text-gray-400",
                                  attrs: { fill: "none", viewBox: "0 0 24 24" }
                                },
                                [
                                  _c("path", {
                                    attrs: {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d:
                                        "M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    }
                                  })
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "span",
                                { staticClass: "text-gray-900 ml-1" },
                                [_vm._v("暂停")]
                              )
                            ]
                          )
                        ]
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "flex justify-center py-3" }, [
                    _c(
                      "button",
                      {
                        staticClass:
                          "w-36 h-8 flex items-center justify-center border border-teal-500 bg-teal-500 text-white rounded-sm focus:outline-none",
                        attrs: { type: "button" },
                        on: {
                          click: function($event) {
                            _vm.submitModalVisible = true
                          }
                        }
                      },
                      [_vm._v("交卷")]
                    )
                  ])
                ])
              ])
            ])
          ])
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "t-modal",
        {
          attrs: {
            title: "结束作答",
            size: "max-w-md",
            "mask-closable": false
          },
          on: {
            close: function($event) {
              _vm.submitModalVisible = false
            }
          },
          model: {
            value: _vm.submitModalVisible,
            callback: function($$v) {
              _vm.submitModalVisible = $$v
            },
            expression: "submitModalVisible"
          }
        },
        [
          _c("div", { staticClass: "flex flex-col" }, [
            _c(
              "div",
              { staticClass: "text-gray-900 text-lg flex justify-center mb-5" },
              [
                _vm.undoneCount > 0
                  ? _c("span", [
                      _vm._v("你还有 "),
                      _c("span", { staticClass: "text-red-500" }, [
                        _vm._v(_vm._s(_vm.undoneCount))
                      ]),
                      _vm._v(" 道题未作答，")
                    ])
                  : _vm._e(),
                _vm._v("是否确认交卷？")
              ]
            )
          ]),
          _vm._v(" "),
          _c("div", { attrs: { slot: "footer" }, slot: "footer" }, [
            _c(
              "div",
              { staticClass: "flex flex-wrap items-center px-5 -mx-5" },
              [
                _c("div", { staticClass: "w-1/2 px-5 flex justify-center" }, [
                  _c(
                    "button",
                    {
                      staticClass:
                        "inline-flex items-center justify-center w-28 py-1 text-base leading-tight border bg-white rounded focus:outline-none",
                      attrs: { type: "button" },
                      on: {
                        click: function($event) {
                          _vm.submitModalVisible = false
                        }
                      }
                    },
                    [_vm._v("继续做题")]
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "w-1/2 px-5 flex justify-center" }, [
                  _c(
                    "button",
                    {
                      staticClass:
                        "inline-flex items-center justify-center w-28 py-1 text-base leading-tight border border-teal-500 bg-teal-500 text-white rounded focus:outline-none",
                      attrs: { type: "button" },
                      on: {
                        click: function($event) {
                          return _vm.submitRecord("end")
                        }
                      }
                    },
                    [_vm._v("交卷")]
                  )
                ])
              ]
            )
          ])
        ]
      ),
      _vm._v(" "),
      _c(
        "t-modal",
        {
          attrs: {
            size: "max-w-md",
            "show-close": false,
            "show-footer": false,
            "mask-closable": false
          },
          model: {
            value: _vm.pauseModalVisible,
            callback: function($$v) {
              _vm.pauseModalVisible = $$v
            },
            expression: "pauseModalVisible"
          }
        },
        [
          _c(
            "div",
            { staticClass: "flex flex-col items-center justify-center py-10" },
            [
              _c(
                "div",
                {
                  staticClass: "cursor-pointer",
                  on: {
                    click: function($event) {
                      _vm.isPause = false
                    }
                  }
                },
                [
                  _c(
                    "svg",
                    {
                      staticClass: "stroke-current text-gray-500",
                      attrs: { fill: "none", viewBox: "0 0 24 24" }
                    },
                    [
                      _c("path", {
                        attrs: {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d:
                            "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        }
                      }),
                      _c("path", {
                        attrs: {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        }
                      })
                    ]
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "mt-2" }, [_vm._v("点击继续")])
                ]
              )
            ]
          )
        ]
      )
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "flex-1 ml-3" }, [
      _c(
        "div",
        {
          staticClass:
            "flex justify-center text-base text-teal-500 border border-teal-500 rounded-sm w-20"
        },
        [_vm._v("考试模式")]
      )
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

/***/ "./resources/js/components/common/Timing.vue":
/*!***************************************************!*\
  !*** ./resources/js/components/common/Timing.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Timing_vue_vue_type_template_id_29d449d3___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Timing.vue?vue&type=template&id=29d449d3& */ "./resources/js/components/common/Timing.vue?vue&type=template&id=29d449d3&");
/* harmony import */ var _Timing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Timing.vue?vue&type=script&lang=js& */ "./resources/js/components/common/Timing.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Timing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Timing_vue_vue_type_template_id_29d449d3___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Timing_vue_vue_type_template_id_29d449d3___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/common/Timing.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/common/Timing.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/common/Timing.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Timing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Timing.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/common/Timing.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Timing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/common/Timing.vue?vue&type=template&id=29d449d3&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/common/Timing.vue?vue&type=template&id=29d449d3& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Timing_vue_vue_type_template_id_29d449d3___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Timing.vue?vue&type=template&id=29d449d3& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/common/Timing.vue?vue&type=template&id=29d449d3&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Timing_vue_vue_type_template_id_29d449d3___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Timing_vue_vue_type_template_id_29d449d3___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/views/quiz/mode/Test.vue":
/*!***********************************************!*\
  !*** ./resources/js/views/quiz/mode/Test.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Test_vue_vue_type_template_id_9fddd9ba___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Test.vue?vue&type=template&id=9fddd9ba& */ "./resources/js/views/quiz/mode/Test.vue?vue&type=template&id=9fddd9ba&");
/* harmony import */ var _Test_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Test.vue?vue&type=script&lang=js& */ "./resources/js/views/quiz/mode/Test.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Test_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Test_vue_vue_type_template_id_9fddd9ba___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Test_vue_vue_type_template_id_9fddd9ba___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/quiz/mode/Test.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/quiz/mode/Test.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/views/quiz/mode/Test.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Test_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Test.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/quiz/mode/Test.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Test_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/quiz/mode/Test.vue?vue&type=template&id=9fddd9ba&":
/*!******************************************************************************!*\
  !*** ./resources/js/views/quiz/mode/Test.vue?vue&type=template&id=9fddd9ba& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Test_vue_vue_type_template_id_9fddd9ba___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Test.vue?vue&type=template&id=9fddd9ba& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/quiz/mode/Test.vue?vue&type=template&id=9fddd9ba&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Test_vue_vue_type_template_id_9fddd9ba___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Test_vue_vue_type_template_id_9fddd9ba___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);