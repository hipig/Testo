(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/questions/ExamItem.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/questions/ExamItem.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _QuestionTool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./QuestionTool */ "./resources/js/components/questions/QuestionTool.vue");
/* harmony import */ var _mixins_QuestionType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/mixins/QuestionType */ "./resources/js/mixins/QuestionType.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
  name: "ExamItem",
  components: {
    QuestionTool: _QuestionTool__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: {
    index: {
      type: Number | Array,
      "default": 0
    },
    item: Object,
    answer: {
      type: String | Number | Array,
      "default": ""
    },
    showParse: {
      type: Boolean,
      "default": false
    },
    showCheckResult: {
      type: Boolean,
      "default": true
    },
    showAnswerBar: {
      type: Boolean,
      "default": true
    },
    showReport: {
      type: Boolean,
      "default": true
    },
    showNote: {
      type: Boolean,
      "default": true
    },
    showCollect: {
      type: Boolean,
      "default": true
    }
  },
  mixins: [_mixins_QuestionType__WEBPACK_IMPORTED_MODULE_1__["default"]],
  data: function data() {
    return {
      question: this.item.question,
      currentAnswer: this.answer || [],
      fillBlackAnswer: this.answer || [],
      isCollect: this.item.is_collect || false,
      toolForm: {
        subject_id: this.item.subject_id,
        bank_item_id: this.item.id,
        question_id: this.item.question.id,
        question_type: this.item.question.type
      }
    };
  },
  computed: {
    indexText: function indexText() {
      var index = this.index;
      index = parseInt(_typeof(index) === "object" ? index.slice(-1) : index) + 1;
      return index > 9 ? index : '0' + index;
    },
    rightAnswerText: function rightAnswerText() {
      var answer = this.question.answer;
      var type = this.question.type;
      return _typeof(answer) === "object" ? answer.join(type === 4 ? "<br>" : ' ') : answer;
    },
    answerText: function answerText() {
      var answer = this.currentAnswer;
      var type = this.question.type;
      return _typeof(answer) === "object" ? answer.join(type === 4 ? "<br>" : ' ') : answer;
    },
    isRight: function isRight() {
      return this.checkRight(this.currentAnswer, this.question.answer, this.question.type);
    }
  },
  watch: {
    fillBlackAnswer: function fillBlackAnswer(val) {
      this.currentAnswer = val;
    }
  },
  methods: {
    // 提交答案
    submit: function submit() {
      this.$emit('answer', this.currentAnswer, this.isRight, this.index, this.question);
    },
    checkRight: function checkRight(answer, rightAnswer, type) {
      var status = false;

      switch (type) {
        // 单选 判断
        case 1:
        case 3:
          status = answer == rightAnswer;
          break;
        // 多选

        case 2:
          status = JSON.stringify(answer.sort()) == JSON.stringify(rightAnswer.sort());
          break;
        // 填空

        case 4:
          status = true;
          rightAnswer.forEach(function (v, i) {
            if (answer[i] != v) {
              status = false;
            }
          });
          break;

        case 5:
          status = answer.length > 0;
          break;
      }

      return status;
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/questions/ExamItem.vue?vue&type=template&id=158be402&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/questions/ExamItem.vue?vue&type=template&id=158be402& ***!
  \*********************************************************************************************************************************************************************************************************************/
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
    { staticClass: "bg-white shadow rounded-lg px-10 py-5 mb-5" },
    [
      _c(
        "div",
        { staticClass: "flex items-center justify-between mb-5" },
        [
          _c("div", { staticClass: "flex items-start" }, [
            _c("div", { staticClass: "text-gray-400 text-2xl font-semibold" }, [
              _vm._v(_vm._s(_vm.indexText))
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "text-teal-500 text-lg ml-3" }, [
              _vm._v(
                "[" + _vm._s(_vm.questionTypes[_vm.question.type].name) + "]"
              )
            ])
          ]),
          _vm._v(" "),
          _c(
            "question-tool",
            {
              attrs: {
                "show-report": _vm.showReport,
                "show-note": _vm.showNote,
                "show-collect": _vm.showCollect,
                "is-collect": _vm.isCollect,
                "extra-data": _vm.toolForm
              }
            },
            [_vm._t("tool")],
            2
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          class: [
            {
              "border-2 border-dashed border-gray-200 p-4 rounded mb-5":
                _vm.$slots.footer
            }
          ]
        },
        [
          _c("div", { staticClass: "text-gray-900 text-lg mb-5" }, [
            _vm._v(_vm._s(_vm.question.title))
          ]),
          _vm._v(" "),
          _vm.question.type === 1 || _vm.question.type === 3
            ? [
                _c(
                  "div",
                  { staticClass: "flex flex-col mb-3" },
                  _vm._l(_vm.question.option, function(item, index) {
                    return _c(
                      "div",
                      { key: index, staticClass: "mb-2 text-base" },
                      [
                        _c(
                          "label",
                          {
                            staticClass: "inline-flex items-center",
                            class: [_vm.showParse ? "" : "cursor-pointer"]
                          },
                          [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.currentAnswer,
                                  expression: "currentAnswer"
                                }
                              ],
                              staticClass: "form-radio w-5 h-5 border-2",
                              class: [
                                _vm.showParse
                                  ? _vm.isRight
                                    ? "text-green-500 focus:shadow-outline-green"
                                    : "text-red-500 focus:shadow-outline-red"
                                  : "text-teal-500 focus:shadow-outline-teal"
                              ],
                              attrs: { type: "radio", disabled: _vm.showParse },
                              domProps: {
                                value: index,
                                checked: _vm._q(_vm.currentAnswer, index)
                              },
                              on: {
                                change: [
                                  function($event) {
                                    _vm.currentAnswer = index
                                  },
                                  _vm.submit
                                ]
                              }
                            }),
                            _vm._v(" "),
                            _c("span", { staticClass: "ml-3" }, [
                              _vm._v(_vm._s(item))
                            ])
                          ]
                        )
                      ]
                    )
                  }),
                  0
                )
              ]
            : _vm._e(),
          _vm._v(" "),
          _vm.question.type === 2
            ? [
                _c(
                  "div",
                  { staticClass: "flex flex-col mb-3" },
                  _vm._l(_vm.question.option, function(item, index) {
                    return _c(
                      "div",
                      { key: index, staticClass: "mb-2 text-base" },
                      [
                        _c(
                          "label",
                          {
                            staticClass: "inline-flex items-center",
                            class: [_vm.showParse ? "" : "cursor-pointer"]
                          },
                          [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.currentAnswer,
                                  expression: "currentAnswer"
                                }
                              ],
                              staticClass: "form-checkbox w-5 h-5 border-2",
                              class: [
                                _vm.showParse
                                  ? _vm.isRight
                                    ? "text-green-500 focus:shadow-outline-green"
                                    : "text-red-500 focus:shadow-outline-red"
                                  : "text-teal-500 focus:shadow-outline-teal"
                              ],
                              attrs: {
                                type: "checkbox",
                                disabled: _vm.showParse
                              },
                              domProps: {
                                value: index,
                                checked: Array.isArray(_vm.currentAnswer)
                                  ? _vm._i(_vm.currentAnswer, index) > -1
                                  : _vm.currentAnswer
                              },
                              on: {
                                change: [
                                  function($event) {
                                    var $$a = _vm.currentAnswer,
                                      $$el = $event.target,
                                      $$c = $$el.checked ? true : false
                                    if (Array.isArray($$a)) {
                                      var $$v = index,
                                        $$i = _vm._i($$a, $$v)
                                      if ($$el.checked) {
                                        $$i < 0 &&
                                          (_vm.currentAnswer = $$a.concat([
                                            $$v
                                          ]))
                                      } else {
                                        $$i > -1 &&
                                          (_vm.currentAnswer = $$a
                                            .slice(0, $$i)
                                            .concat($$a.slice($$i + 1)))
                                      }
                                    } else {
                                      _vm.currentAnswer = $$c
                                    }
                                  },
                                  _vm.submit
                                ]
                              }
                            }),
                            _vm._v(" "),
                            _c("span", { staticClass: "ml-3" }, [
                              _vm._v(_vm._s(item))
                            ])
                          ]
                        )
                      ]
                    )
                  }),
                  0
                )
              ]
            : _vm._e(),
          _vm._v(" "),
          _vm.question.type === 4
            ? [
                _c(
                  "div",
                  { staticClass: "flex flex-col mb-3" },
                  _vm._l(_vm.question.answer, function(v, i) {
                    return _c("label", { staticClass: "flex w-full mb-2" }, [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.fillBlackAnswer[i],
                            expression: "fillBlackAnswer[i]"
                          }
                        ],
                        staticClass:
                          "w-full px-4 py-3 rounded focus:outline-none",
                        class: [
                          _vm.showParse
                            ? _vm.isRight
                              ? "text-green-500 bg-green-100"
                              : "text-red-500 bg-red-100"
                            : "bg-gray-100"
                        ],
                        attrs: {
                          placeholder: _vm.showParse ? "未填写" : "请输入答案",
                          disabled: _vm.showParse
                        },
                        domProps: { value: _vm.fillBlackAnswer[i] },
                        on: {
                          change: _vm.submit,
                          input: function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.fillBlackAnswer,
                              i,
                              $event.target.value
                            )
                          }
                        }
                      })
                    ])
                  }),
                  0
                )
              ]
            : _vm._e(),
          _vm._v(" "),
          _vm.question.type === 5
            ? [
                _c("div", { staticClass: "mb-2" }, [
                  _c("label", { staticClass: "flex w-full" }, [
                    _c("textarea", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.currentAnswer,
                          expression: "currentAnswer"
                        }
                      ],
                      staticClass:
                        "h-24 w-full px-4 py-3 bg-gray-100 rounded resize-none focus:outline-none",
                      attrs: {
                        placeholder: "请输入答案",
                        disabled: _vm.showParse
                      },
                      domProps: { value: _vm.currentAnswer },
                      on: {
                        input: [
                          function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.currentAnswer = $event.target.value
                          },
                          _vm.submit
                        ]
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "mb-5 text-gray-400" }, [
                  _vm._v("主观题仅提供作答，默认得分，不计入错题集，建议收藏。")
                ])
              ]
            : _vm._e(),
          _vm._v(" "),
          _vm.showParse
            ? _c("div", { staticClass: "mb-3" }, [
                _vm.showAnswerBar
                  ? _c(
                      "div",
                      {
                        staticClass:
                          "py-2 px-5 bg-gray-100 flex leading-tight rounded",
                        class: [
                          _vm.question.type === 4
                            ? "flex-col"
                            : "flex-wrap items-center"
                        ]
                      },
                      [
                        _vm.showCheckResult
                          ? _c(
                              "div",
                              {
                                staticClass: "mr-10 py-1",
                                class: [
                                  _vm.answer.length > 0
                                    ? _vm.isRight
                                      ? "font-semibold text-green-500"
                                      : "font-semibold text-red-500"
                                    : ""
                                ]
                              },
                              [
                                _vm._v(
                                  _vm._s(
                                    _vm.answer.length > 0
                                      ? _vm.isRight
                                        ? "回答正确"
                                        : "回答错误"
                                      : "没有回答"
                                  )
                                )
                              ]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.question.type !== 5
                          ? [
                              _c(
                                "div",
                                {
                                  staticClass: "mr-10 py-1 flex",
                                  class: [
                                    _vm.question.type === 4
                                      ? "items-baseline"
                                      : "items-center"
                                  ]
                                },
                                [
                                  _c("span", { staticClass: "text-gray-500" }, [
                                    _vm._v("正确答案：")
                                  ]),
                                  _vm._v(" "),
                                  _c("span", {
                                    staticClass:
                                      "flex-1 text-green-500 text-base font-semibold leading-tight",
                                    domProps: {
                                      innerHTML: _vm._s(_vm.rightAnswerText)
                                    }
                                  })
                                ]
                              ),
                              _vm._v(" "),
                              _vm.answer.length > 0 && !_vm.isRight
                                ? _c(
                                    "div",
                                    {
                                      staticClass: "mr-10 py-1 flex",
                                      class: [
                                        _vm.question.type === 4
                                          ? "items-baseline"
                                          : "items-center"
                                      ]
                                    },
                                    [
                                      _c(
                                        "span",
                                        { staticClass: "text-gray-500" },
                                        [_vm._v("你的答案：")]
                                      ),
                                      _vm._v(" "),
                                      _c("span", {
                                        staticClass:
                                          "flex-1 text-base font-semibold leading-tight",
                                        domProps: {
                                          innerHTML: _vm._s(_vm.answerText)
                                        }
                                      })
                                    ]
                                  )
                                : _vm._e()
                            ]
                          : _vm._e()
                      ],
                      2
                    )
                  : _vm._e(),
                _vm._v(" "),
                _c("div", { staticClass: "px-5 mt-5" }, [
                  _c("div", { staticClass: "flex flex-wrap items-baseline" }, [
                    _c("div", { staticClass: "text-gray-400" }, [
                      _vm._v("解析：")
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "flex-1 text-base" }, [
                      _vm._v(
                        "\n            " +
                          _vm._s(_vm.question.parse) +
                          "\n          "
                      )
                    ])
                  ])
                ])
              ])
            : _vm._e()
        ],
        2
      ),
      _vm._v(" "),
      _vm._t("footer")
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/questions/ExamItem.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/questions/ExamItem.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ExamItem_vue_vue_type_template_id_158be402___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ExamItem.vue?vue&type=template&id=158be402& */ "./resources/js/components/questions/ExamItem.vue?vue&type=template&id=158be402&");
/* harmony import */ var _ExamItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ExamItem.vue?vue&type=script&lang=js& */ "./resources/js/components/questions/ExamItem.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ExamItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ExamItem_vue_vue_type_template_id_158be402___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ExamItem_vue_vue_type_template_id_158be402___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/questions/ExamItem.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/questions/ExamItem.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/questions/ExamItem.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ExamItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ExamItem.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/questions/ExamItem.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ExamItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/questions/ExamItem.vue?vue&type=template&id=158be402&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/questions/ExamItem.vue?vue&type=template&id=158be402& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ExamItem_vue_vue_type_template_id_158be402___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ExamItem.vue?vue&type=template&id=158be402& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/questions/ExamItem.vue?vue&type=template&id=158be402&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ExamItem_vue_vue_type_template_id_158be402___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ExamItem_vue_vue_type_template_id_158be402___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);