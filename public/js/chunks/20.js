(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[20],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/questions/ExerciseItem.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/questions/ExerciseItem.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
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
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: "ExerciseItem",
  components: {
    QuestionTool: _QuestionTool__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: {
    index: {
      type: Number,
      "default": 0
    },
    item: Object,
    answer: {
      type: String | Number | Array,
      "default": []
    },
    bankItemId: Number
  },
  mixins: [_mixins_QuestionType__WEBPACK_IMPORTED_MODULE_1__["default"]],
  data: function data() {
    return {
      question: this.item.question,
      currentAnswer: this.answer || [],
      fillBlackAnswer: this.answer || [],
      showAnswer: false,
      isAnswered: false,
      isCollect: this.item.is_collect || false,
      toolForm: {
        subject_id: this.item.subject_id,
        bank_item_id: this.item.id,
        question_id: this.item.question.id,
        question_type: this.item.question.type
      }
    };
  },
  created: function created() {
    if (this.answer.length !== 0) this.isAnswered = true;
  },
  computed: {
    indexText: function indexText() {
      var index = this.index + 1;
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
    },
    showAnswerBar: function showAnswerBar() {
      var type = this.question.type;
      return type !== 5;
    }
  },
  watch: {
    isAnswered: function isAnswered(val) {
      this.showAnswer = val;
    },
    fillBlackAnswer: function fillBlackAnswer(val) {
      this.currentAnswer = val;
    }
  },
  methods: {
    // 提交答案
    submit: function submit() {
      if (this.showAnswer) return false;
      if (!this.checkAnswer()) return false;
      this.isAnswered = true;
      this.$emit('answer', this.currentAnswer, this.isRight, this.index, this.question);
    },
    // 校验答案
    checkAnswer: function checkAnswer() {
      var questionType = this.question.type;
      var answer = this.currentAnswer;

      switch (questionType) {
        case 2:
          if (answer.length === 0) {
            this.$Message.error('至少选择一个选项。');
            return false;
          }

          break;

        case 4:
          if (answer.length === 0) {
            this.$Message.error('内容不能为空。');
            return false;
          }

          break;

        case 5:
          if (answer.length === 0) {
            this.$Message.error('内容不能为空。');
            return false;
          }

          break;
      }

      return true;
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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/quiz/mode/Exercise.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/quiz/mode/Exercise.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_common_Breadcrumb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/common/Breadcrumb */ "./resources/js/components/common/Breadcrumb.vue");
/* harmony import */ var _components_common_EmptyData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/common/EmptyData */ "./resources/js/components/common/EmptyData.vue");
/* harmony import */ var _components_questions_ExerciseItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/questions/ExerciseItem */ "./resources/js/components/questions/ExerciseItem.vue");
/* harmony import */ var _components_common_modal_Modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/common/modal/Modal */ "./resources/js/components/common/modal/Modal.vue");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _api_learnRecord__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/api/learnRecord */ "./resources/js/api/learnRecord.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "quiz.mode.exercise",
  components: {
    Breadcrumb: _components_common_Breadcrumb__WEBPACK_IMPORTED_MODULE_0__["default"],
    EmptyData: _components_common_EmptyData__WEBPACK_IMPORTED_MODULE_1__["default"],
    ExerciseItem: _components_questions_ExerciseItem__WEBPACK_IMPORTED_MODULE_2__["default"],
    TModal: _components_common_modal_Modal__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  data: function data() {
    return {
      recordId: this.$route.params.id,
      bankType: this.$route.query.type || 'chapter',
      record: {},
      questions: [],
      answerList: [],
      activeIndex: 0,
      autoNext: this.$store.getters['user/config'].autoNext || false,
      rightCount: 0,
      errorCount: 0,
      doneCount: 0,
      isLoading: null,
      submitModalVisible: false,
      submitActionShow: false,
      timer: null,
      doneTime: 0
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.showRecords();
    this.timer = setInterval(function () {
      _this.doneTime++;
    }, 1000);
  },
  computed: {
    activeAnswer: function activeAnswer() {
      return this.answerList[this.activeIndex];
    },
    questionsLength: function questionsLength() {
      return this.questions.length;
    },
    undoneCount: function undoneCount() {
      return this.answerList.length - this.doneCount;
    },
    rightRate: function rightRate() {
      return (this.questionsLength > 0 ? Math.round(this.rightCount / this.questionsLength * 100) : 0) + '%';
    },
    isFirst: function isFirst() {
      return this.activeIndex === 0;
    },
    isLast: function isLast() {
      return this.questionsLength === 0 || this.activeIndex === this.questionsLength - 1;
    }
  },
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_4__["mapActions"])({
    'setConfig': 'user/setConfig'
  })), {}, {
    showRecords: function showRecords() {
      var _this2 = this;

      this.isLoading = true;

      Object(_api_learnRecord__WEBPACK_IMPORTED_MODULE_5__["showRecords"])(this.recordId, {
        bank_type: this.bankType
      }).then(function (res) {
        _this2.record = res;
        _this2.questions = res.items;
        _this2.answerList = res.items.map(function (item) {
          return {
            record_id: _this2.recordId,
            bank_id: item.bank_id,
            bank_item_id: item.id,
            question_id: item.question.id,
            question_type: item.question.type,
            answer: item.record && item.record.answer || "",
            is_right: item.record && item.record.is_right
          };
        });
        _this2.rightCount = _this2.answerList.filter(function (item) {
          return item.is_right;
        }).length;
        _this2.errorCount = _this2.answerList.filter(function (item) {
          return item.is_right === false;
        }).length;
        _this2.doneCount = _this2.answerList.filter(function (item) {
          return item.answer.length !== 0;
        }).length;
        if (_this2.undoneCount === 0) _this2.submitActionShow = true;
      })["finally"](function () {
        _this2.isLoading = false;
      });
    },
    toIndex: function toIndex(index) {
      this.activeIndex = index;
    },
    prevItem: function prevItem() {
      if (this.activeIndex > 0) this.activeIndex--;
    },
    nextItem: function nextItem() {
      if (this.activeIndex < this.questions.length - 1) this.activeIndex++;
    },
    handleAnswer: function handleAnswer(answer, isRight) {
      var _this3 = this;

      this.answerList[this.activeIndex] = Object.assign({}, this.answerList[this.activeIndex], {
        answer: answer,
        is_right: isRight
      }); // 生成答题记录

      Object(_api_learnRecord__WEBPACK_IMPORTED_MODULE_5__["storeRecordItems"])(this.recordId, this.answerList[this.activeIndex]);

      if (isRight) {
        this.autoNext && setTimeout(this.nextItem, 300);
        this.rightCount++;
      } else {
        this.errorCount++;
      }

      this.doneCount = this.answerList.filter(function (item) {
        return item.answer.length !== 0;
      }).length;

      if (this.undoneCount === 0) {
        this.submitActionShow = true;
        setTimeout(function () {
          _this3.submitModalVisible = true;
        }, 800);
      }
    },
    submitRecord: function submitRecord() {
      var _this4 = this;

      var params = {
        done_time: this.doneTime,
        type: 'end',
        items: []
      };
      Object(_api_learnRecord__WEBPACK_IMPORTED_MODULE_5__["updateRecords"])(this.recordId, params).then(function (_) {
        _this4.submitModalVisible = false;

        _this4.$router.push({
          name: 'quiz.result',
          params: {
            id: _this4.recordId
          }
        });
      });
    },
    switchAutoNext: function switchAutoNext() {
      this.autoNext = !this.autoNext;
      this.setConfig({
        autoNext: this.autoNext
      });
    },
    handleBack: function handleBack() {
      this.$router.go(-1);
    }
  })
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/questions/ExerciseItem.vue?vue&type=template&id=49c03c38&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/questions/ExerciseItem.vue?vue&type=template&id=49c03c38& ***!
  \*************************************************************************************************************************************************************************************************************************/
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
          _c("question-tool", {
            attrs: { "is-collect": _vm.isCollect, "extra-data": _vm.toolForm }
          })
        ],
        1
      ),
      _vm._v(" "),
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
                        class: [
                          _vm.showAnswer
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer"
                        ]
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
                            _vm.isAnswered
                              ? _vm.isRight
                                ? "text-green-500 focus:shadow-outline-green"
                                : "text-red-500 focus:shadow-outline-red"
                              : "text-teal-500 focus:shadow-outline-teal"
                          ],
                          attrs: { type: "radio", disabled: _vm.showAnswer },
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
                        class: [
                          _vm.showAnswer
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer"
                        ]
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
                            _vm.isAnswered
                              ? _vm.isRight
                                ? "text-green-500 focus:shadow-outline-green"
                                : "text-red-500 focus:shadow-outline-red"
                              : "text-teal-500 focus:shadow-outline-teal"
                          ],
                          attrs: { type: "checkbox", disabled: _vm.showAnswer },
                          domProps: {
                            value: index,
                            checked: Array.isArray(_vm.currentAnswer)
                              ? _vm._i(_vm.currentAnswer, index) > -1
                              : _vm.currentAnswer
                          },
                          on: {
                            change: function($event) {
                              var $$a = _vm.currentAnswer,
                                $$el = $event.target,
                                $$c = $$el.checked ? true : false
                              if (Array.isArray($$a)) {
                                var $$v = index,
                                  $$i = _vm._i($$a, $$v)
                                if ($$el.checked) {
                                  $$i < 0 &&
                                    (_vm.currentAnswer = $$a.concat([$$v]))
                                } else {
                                  $$i > -1 &&
                                    (_vm.currentAnswer = $$a
                                      .slice(0, $$i)
                                      .concat($$a.slice($$i + 1)))
                                }
                              } else {
                                _vm.currentAnswer = $$c
                              }
                            }
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
              _vm._l(_vm.question.answer, function(_, i) {
                return _c(
                  "label",
                  { key: i, staticClass: "flex w-full mb-2" },
                  [
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
                        _vm.isAnswered
                          ? _vm.isRight
                            ? "text-green-500 bg-green-100"
                            : "text-red-500 bg-red-100"
                          : "bg-gray-100"
                      ],
                      attrs: {
                        placeholder: _vm.isAnswered ? "未填写" : "请输入答案",
                        disabled: _vm.showAnswer
                      },
                      domProps: { value: _vm.fillBlackAnswer[i] },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.fillBlackAnswer, i, $event.target.value)
                        }
                      }
                    })
                  ]
                )
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
                    placeholder: _vm.isAnswered ? "未填写" : "请输入答案",
                    disabled: _vm.showAnswer
                  },
                  domProps: { value: _vm.currentAnswer },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.currentAnswer = $event.target.value
                    }
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "mb-5 text-gray-400" }, [
              _vm._v("此类型的题目暂不支持判断对错，你可以点击下方查看答案解析")
            ])
          ]
        : _vm._e(),
      _vm._v(" "),
      _vm.question.type === 2 ||
      _vm.question.type === 4 ||
      _vm.question.type === 5
        ? _c("div", { staticClass: "mb-5" }, [
            _c(
              "button",
              {
                staticClass:
                  "inline-flex items-center py-2 px-8 border border-teal-500 text-teal-500 rounded bg-white focus:outline-none",
                class: [_vm.showAnswer && "opacity-50 cursor-not-allowed"],
                attrs: { type: "button", disabled: _vm.showAnswer },
                on: { click: _vm.submit }
              },
              [_vm._v("确认")]
            )
          ])
        : _vm._e(),
      _vm._v(" "),
      _c("div", { staticClass: "mb-3" }, [
        !_vm.isAnswered
          ? _c(
              "div",
              {
                staticClass: "flex items-center cursor-pointer py-1 mb-2",
                on: {
                  click: function($event) {
                    _vm.showAnswer = !_vm.showAnswer
                  }
                }
              },
              [
                _vm.showAnswer
                  ? _c(
                      "svg",
                      {
                        staticClass:
                          "w-5 h-5 stroke-current text-gray-400 mr-1",
                        attrs: { fill: "none", viewBox: "0 0 24 24" }
                      },
                      [
                        _c("path", {
                          attrs: {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d:
                              "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          }
                        })
                      ]
                    )
                  : _c(
                      "svg",
                      {
                        staticClass:
                          "w-5 h-5 stroke-current text-gray-400 mr-1",
                        attrs: { fill: "none", viewBox: "0 0 24 24" }
                      },
                      [
                        _c("path", {
                          attrs: {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d:
                              "M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
                          }
                        })
                      ]
                    ),
                _vm._v(" "),
                _c("span", { staticClass: "text-gray-900 leading-none" }, [
                  _vm._v(_vm._s(_vm.showAnswer ? "隐藏答案" : "查看答案"))
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
                name: "show",
                rawName: "v-show",
                value: _vm.showAnswer,
                expression: "showAnswer"
              }
            ]
          },
          [
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
                    _vm.isAnswered
                      ? _c(
                          "div",
                          {
                            staticClass: "mr-10 py-1",
                            class: _vm.isRight
                              ? "font-semibold text-green-500"
                              : "font-semibold text-red-500"
                          },
                          [
                            _vm._v(
                              _vm._s(_vm.isRight ? "回答正确" : "回答错误")
                            )
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
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
                          domProps: { innerHTML: _vm._s(_vm.rightAnswerText) }
                        })
                      ]
                    ),
                    _vm._v(" "),
                    _vm.isAnswered && !_vm.isRight
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
                            _c("span", { staticClass: "text-gray-500" }, [
                              _vm._v("你的答案：")
                            ]),
                            _vm._v(" "),
                            _c("span", {
                              staticClass:
                                "flex-1 text-base font-semibold leading-tight",
                              domProps: { innerHTML: _vm._s(_vm.answerText) }
                            })
                          ]
                        )
                      : _vm._e()
                  ]
                )
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "px-5 mt-5" }, [
              _c("div", { staticClass: "flex flex-wrap items-baseline" }, [
                _c("div", { staticClass: "text-gray-400" }, [_vm._v("解析：")]),
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
          ]
        )
      ])
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/quiz/mode/Exercise.vue?vue&type=template&id=30da98e9&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/quiz/mode/Exercise.vue?vue&type=template&id=30da98e9& ***!
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
                          _c("div", { staticClass: "flex-1 ml-3" }, [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "flex justify-center text-base text-teal-500 border border-teal-500 rounded-sm w-20"
                              },
                              [
                                _vm._v(
                                  _vm._s(
                                    parseInt(_vm.record.type) === 4
                                      ? "每日一练"
                                      : "练习模式"
                                  )
                                )
                              ]
                            )
                          ])
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "text-base mt-4" }, [
                          _c("label", { staticClass: "flex items-center" }, [
                            _c("input", {
                              staticClass:
                                "form-checkbox w-5 h-5 border-2 text-teal-500 focus:shadow-outline-teal",
                              attrs: { type: "checkbox" },
                              domProps: { checked: _vm.autoNext },
                              on: { change: _vm.switchAutoNext }
                            }),
                            _vm._v(" "),
                            _c("span", { staticClass: "ml-2" }, [
                              _vm._v("做对自动下一题")
                            ])
                          ])
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
                    _vm._l(_vm.questions, function(item, index) {
                      return [
                        _vm.activeIndex === index
                          ? _c("exercise-item", {
                              key: index,
                              attrs: {
                                item: item,
                                answer: _vm.activeAnswer.answer,
                                index: index
                              },
                              on: { answer: _vm.handleAnswer }
                            })
                          : _vm._e()
                      ]
                    })
                  ],
                  2
                ),
                _vm._v(" "),
                _c("empty-data", {
                  attrs: {
                    show: _vm.isLoading === false && _vm.questionsLength === 0
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "w-1/3 px-3" }, [
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
                    staticClass: "px-5 py-4 h-36 overflow-auto scrollbar-hover"
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
                                    ? _vm.activeIndex === index
                                      ? "text-gray-500 border-teal-500"
                                      : "text-gray-500 border-gray-100 hover:border-teal-500"
                                    : item.is_right
                                    ? "text-white bg-green-500 border-green-500"
                                    : "text-white bg-red-500 border-red-500"
                                ],
                                on: {
                                  click: function($event) {
                                    return _vm.toIndex(index)
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
                      "mt-1 px-8 py-3 flex justify-between border-t border-gray-100"
                  },
                  [
                    _c(
                      "div",
                      { staticClass: "flex items-center text-gray-900" },
                      [
                        _c("div", { staticClass: "bg-green-500 w-4 h-4 mr-1" }),
                        _vm._v(" "),
                        _c("div", { staticClass: "leading-none" }, [
                          _vm._v("正确 " + _vm._s(_vm.rightCount))
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "flex items-center text-gray-900" },
                      [
                        _c("div", { staticClass: "bg-red-500 w-4 h-4 mr-1" }),
                        _vm._v(" "),
                        _c("div", { staticClass: "leading-none" }, [
                          _vm._v("错误 " + _vm._s(_vm.errorCount))
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "flex items-center text-gray-900" },
                      [
                        _c("div", { staticClass: "leading-none" }, [
                          _vm._v("正确率 "),
                          _c("span", { staticClass: "text-green-500" }, [
                            _vm._v(_vm._s(_vm.rightRate))
                          ])
                        ])
                      ]
                    )
                  ]
                )
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "bg-white shadow rounded-lg" }, [
                _c(
                  "div",
                  { staticClass: "flex justify-center py-3 px-5 -mx-2" },
                  [
                    _c(
                      "div",
                      { staticClass: "w-1/2 px-2 flex justify-center" },
                      [
                        _c(
                          "button",
                          {
                            staticClass:
                              "w-full h-8 flex items-center justify-center border border-teal-500 text-teal-500 rounded focus:outline-none",
                            attrs: { type: "button" },
                            on: { click: _vm.handleBack }
                          },
                          [_vm._v("返回章节练习")]
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _vm.submitActionShow
                      ? _c(
                          "div",
                          { staticClass: "w-1/2 px-2 flex justify-center" },
                          [
                            _c(
                              "button",
                              {
                                staticClass:
                                  "w-full h-8 flex items-center justify-center border border-teal-500 bg-teal-500 text-white rounded focus:outline-none",
                                attrs: { type: "button" },
                                on: {
                                  click: function($event) {
                                    _vm.submitModalVisible = true
                                  }
                                }
                              },
                              [_vm._v("查看解析")]
                            )
                          ]
                        )
                      : _vm._e()
                  ]
                )
              ])
            ])
          ])
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "fixed bottom-0 left-0 right-0 px-4 z-30" }, [
        _c("div", { staticClass: "max-w-6xl mx-auto" }, [
          _c("div", { staticClass: "flex" }, [
            _c("div", { staticClass: "w-2/3 px-8" }, [
              _c(
                "div",
                {
                  staticClass:
                    "flex justify-between py-3 px-10 bg-white rounded-lg shadow-lg mb-5"
                },
                [
                  _c(
                    "button",
                    {
                      staticClass:
                        "inline-flex items-center px-8 py-2 text-white rounded focus:outline-none",
                      class: [
                        _vm.isFirst
                          ? "bg-gray-400 opacity-50 cursor-not-allowed"
                          : "bg-teal-500"
                      ],
                      attrs: { type: "button" },
                      on: { click: _vm.prevItem }
                    },
                    [_vm._v("上一题")]
                  ),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass:
                        "inline-flex items-center px-8 py-2 text-white rounded focus:outline-none",
                      class: [
                        _vm.isLast
                          ? "bg-gray-400 opacity-50 cursor-not-allowed"
                          : "bg-teal-500"
                      ],
                      attrs: { type: "button" },
                      on: { click: _vm.nextItem }
                    },
                    [_vm._v("下一题")]
                  )
                ]
              )
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c(
        "t-modal",
        {
          attrs: {
            title: "查看解析",
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
              [_vm._v("你已作答完毕，是否查看解析？")]
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
                    [_vm._v("取消")]
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
                      on: { click: _vm.submitRecord }
                    },
                    [_vm._v("查看解析")]
                  )
                ])
              ]
            )
          ])
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
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

/***/ "./resources/js/components/questions/ExerciseItem.vue":
/*!************************************************************!*\
  !*** ./resources/js/components/questions/ExerciseItem.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ExerciseItem_vue_vue_type_template_id_49c03c38___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ExerciseItem.vue?vue&type=template&id=49c03c38& */ "./resources/js/components/questions/ExerciseItem.vue?vue&type=template&id=49c03c38&");
/* harmony import */ var _ExerciseItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ExerciseItem.vue?vue&type=script&lang=js& */ "./resources/js/components/questions/ExerciseItem.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ExerciseItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ExerciseItem_vue_vue_type_template_id_49c03c38___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ExerciseItem_vue_vue_type_template_id_49c03c38___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/questions/ExerciseItem.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/questions/ExerciseItem.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/questions/ExerciseItem.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ExerciseItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ExerciseItem.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/questions/ExerciseItem.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ExerciseItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/questions/ExerciseItem.vue?vue&type=template&id=49c03c38&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/questions/ExerciseItem.vue?vue&type=template&id=49c03c38& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ExerciseItem_vue_vue_type_template_id_49c03c38___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ExerciseItem.vue?vue&type=template&id=49c03c38& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/questions/ExerciseItem.vue?vue&type=template&id=49c03c38&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ExerciseItem_vue_vue_type_template_id_49c03c38___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ExerciseItem_vue_vue_type_template_id_49c03c38___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/views/quiz/mode/Exercise.vue":
/*!***************************************************!*\
  !*** ./resources/js/views/quiz/mode/Exercise.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Exercise_vue_vue_type_template_id_30da98e9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Exercise.vue?vue&type=template&id=30da98e9& */ "./resources/js/views/quiz/mode/Exercise.vue?vue&type=template&id=30da98e9&");
/* harmony import */ var _Exercise_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Exercise.vue?vue&type=script&lang=js& */ "./resources/js/views/quiz/mode/Exercise.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Exercise_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Exercise_vue_vue_type_template_id_30da98e9___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Exercise_vue_vue_type_template_id_30da98e9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/quiz/mode/Exercise.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/quiz/mode/Exercise.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/views/quiz/mode/Exercise.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Exercise_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Exercise.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/quiz/mode/Exercise.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Exercise_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/quiz/mode/Exercise.vue?vue&type=template&id=30da98e9&":
/*!**********************************************************************************!*\
  !*** ./resources/js/views/quiz/mode/Exercise.vue?vue&type=template&id=30da98e9& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Exercise_vue_vue_type_template_id_30da98e9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Exercise.vue?vue&type=template&id=30da98e9& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/quiz/mode/Exercise.vue?vue&type=template&id=30da98e9&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Exercise_vue_vue_type_template_id_30da98e9___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Exercise_vue_vue_type_template_id_30da98e9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);