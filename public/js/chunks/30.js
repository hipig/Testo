(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[30],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/admin/views/bank/Form.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/admin/views/bank/Form.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _admin_api_subject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/admin/api/subject */ "./resources/js/admin/api/subject.js");
/* harmony import */ var _admin_api_bank__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/admin/api/bank */ "./resources/js/admin/api/bank.js");
/* harmony import */ var _admin_mixins_Bank__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/admin/mixins/Bank */ "./resources/js/admin/mixins/Bank.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "admin.bank.form",
  mixins: [_admin_mixins_Bank__WEBPACK_IMPORTED_MODULE_2__["default"]],
  data: function data() {
    return {
      id: this.$route.params.id || 0,
      bankForm: {
        title: "",
        subject_pid: "",
        subject_id: "",
        type: 1,
        is_free: true,
        price: null,
        total_score: 0,
        time_limit: 0
      },
      subjectTree: [],
      activeSubject: {}
    };
  },
  computed: {
    isCreate: function isCreate() {
      return this.id === 0;
    },
    isConfigInput: function isConfigInput() {
      return [2, 3].indexOf(parseInt(this.bankForm.type)) > -1;
    },
    subjectSelected: function subjectSelected() {
      return this.bankForm.subject_pid != "";
    }
  },
  mounted: function mounted() {
    this.getSubjectsTree();
  },
  created: function created() {
    if (!this.isCreate) this.showBanks();
  },
  watch: {
    'bankForm.subject_pid': {
      handler: function handler(newValue) {
        this.showSubjects(newValue);
      },
      deep: true
    }
  },
  methods: {
    getSubjectsTree: function getSubjectsTree() {
      var _this = this;

      Object(_admin_api_subject__WEBPACK_IMPORTED_MODULE_0__["getSubjectsTree"])().then(function (res) {
        _this.subjectTree = res;
      });
    },
    showSubjects: function showSubjects(id) {
      var _this2 = this;

      Object(_admin_api_subject__WEBPACK_IMPORTED_MODULE_0__["showSubjects"])(id).then(function (res) {
        _this2.activeSubject = res;
      });
    },
    showBanks: function showBanks() {
      var _this3 = this;

      Object(_admin_api_bank__WEBPACK_IMPORTED_MODULE_1__["showBanks"])(this.id).then(function (res) {
        _this3.bankForm = res;
      });
    },
    selectSubjectParent: function selectSubjectParent() {
      this.bankForm.subject_id = "";
    },
    selectBankType: function selectBankType() {
      this.bankForm.total_score = 0;
      this.bankForm.time_limit = 0;
    },
    toggleIsFree: function toggleIsFree() {
      this.bankForm.price = null;
    },
    handleSubmit: function handleSubmit() {
      var _this4 = this;

      var request = this.isCreate ? Object(_admin_api_bank__WEBPACK_IMPORTED_MODULE_1__["storeBanks"])(this.bankForm) : Object(_admin_api_bank__WEBPACK_IMPORTED_MODULE_1__["updateBanks"])(this.id, this.bankForm);
      request.then(function (_) {
        _this4.$router.push({
          name: 'admin.bank.index'
        });

        _this4.$Message.success('保存成功');
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/admin/views/bank/Form.vue?vue&type=template&id=6c95b5b0&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/admin/views/bank/Form.vue?vue&type=template&id=6c95b5b0& ***!
  \*************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "flex flex-col" }, [
    _c("div", { staticClass: "flex items-center mb-4" }, [
      _c("h1", { staticClass: "text-2xl font-semibold text-gray-900" }, [
        _vm._v("题库 "),
        _c("span", { staticClass: "text-lg font-normal" }, [
          _vm._v(_vm._s(_vm.isCreate ? "添加" : "编辑"))
        ])
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "flex flex-col py-4" }, [
      _c("div", { staticClass: "shadow rounded-md bg-white overflow-hidden" }, [
        _c("div", { staticClass: "px-6 py-8" }, [
          _c("div", { staticClass: "mb-6" }, [
            _c("div", { staticClass: "flex flex-wrap items-center -mx-3" }, [
              _vm._m(0),
              _vm._v(" "),
              _c("div", { staticClass: "w-5/6 px-3" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.bankForm.title,
                      expression: "bankForm.title"
                    }
                  ],
                  staticClass:
                    "form-input w-full max-w-lg text-sm focus:shadow-outline-teal",
                  attrs: { type: "text", placeholder: "请输入名称" },
                  domProps: { value: _vm.bankForm.title },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.bankForm, "title", $event.target.value)
                    }
                  }
                })
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "mb-6" }, [
            _c("div", { staticClass: "flex flex-wrap items-center -mx-3" }, [
              _vm._m(1),
              _vm._v(" "),
              _c("div", { staticClass: "w-5/6 px-3" }, [
                _c(
                  "select",
                  {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.bankForm.subject_pid,
                        expression: "bankForm.subject_pid"
                      }
                    ],
                    staticClass:
                      "form-select w-48 max-w-lg text-sm focus:shadow-outline-teal",
                    on: {
                      change: [
                        function($event) {
                          var $$selectedVal = Array.prototype.filter
                            .call($event.target.options, function(o) {
                              return o.selected
                            })
                            .map(function(o) {
                              var val = "_value" in o ? o._value : o.value
                              return val
                            })
                          _vm.$set(
                            _vm.bankForm,
                            "subject_pid",
                            $event.target.multiple
                              ? $$selectedVal
                              : $$selectedVal[0]
                          )
                        },
                        _vm.selectSubjectParent
                      ]
                    }
                  },
                  [
                    _c("option", { attrs: { value: "", disabled: "" } }, [
                      _vm._v("全部科目")
                    ]),
                    _vm._v(" "),
                    _vm._l(_vm.subjectTree, function(value, key) {
                      return _c(
                        "optgroup",
                        { key: key, attrs: { label: value.title } },
                        _vm._l(value.childrenList, function(v, k) {
                          return _c(
                            "option",
                            { key: k, domProps: { value: v.id } },
                            [_vm._v(_vm._s(v.title))]
                          )
                        }),
                        0
                      )
                    })
                  ],
                  2
                ),
                _vm._v(" "),
                _c(
                  "select",
                  {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.bankForm.subject_id,
                        expression: "bankForm.subject_id"
                      }
                    ],
                    staticClass:
                      "ml-5 form-select w-48 max-w-lg text-sm focus:shadow-outline-teal",
                    class: [
                      _vm.subjectSelected
                        ? ""
                        : "text-gray-400 cursor-not-allowed"
                    ],
                    attrs: { disabled: !_vm.subjectSelected },
                    on: {
                      change: function($event) {
                        var $$selectedVal = Array.prototype.filter
                          .call($event.target.options, function(o) {
                            return o.selected
                          })
                          .map(function(o) {
                            var val = "_value" in o ? o._value : o.value
                            return val
                          })
                        _vm.$set(
                          _vm.bankForm,
                          "subject_id",
                          $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        )
                      }
                    }
                  },
                  [
                    _c("option", { attrs: { value: "", disabled: "" } }, [
                      _vm._v("全部科目")
                    ]),
                    _vm._v(" "),
                    _vm._l(_vm.activeSubject.children_group, function(
                      value,
                      key
                    ) {
                      return _c(
                        "optgroup",
                        {
                          key: key,
                          attrs: { label: key == 1 ? "专业科目" : "公共科目" }
                        },
                        _vm._l(value, function(v, k) {
                          return _c(
                            "option",
                            { key: k, domProps: { value: v.id } },
                            [_vm._v(_vm._s(v.title))]
                          )
                        }),
                        0
                      )
                    })
                  ],
                  2
                )
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "mb-6" }, [
            _c("div", { staticClass: "flex flex-wrap items-center -mx-3" }, [
              _vm._m(2),
              _vm._v(" "),
              _c("div", { staticClass: "w-5/6 px-3" }, [
                _c(
                  "div",
                  { staticClass: "flex items-center" },
                  _vm._l(_vm.bankTypeMap, function(item, index) {
                    return _c(
                      "label",
                      {
                        key: index,
                        staticClass: "flex items-center cursor-pointer mr-5"
                      },
                      [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.bankForm.type,
                              expression: "bankForm.type"
                            }
                          ],
                          staticClass:
                            "form-radio w-4 h-4 text-teal-500 focus:shadow-outline-teal",
                          attrs: { type: "radio" },
                          domProps: {
                            value: index,
                            checked: _vm._q(_vm.bankForm.type, index)
                          },
                          on: {
                            change: [
                              function($event) {
                                return _vm.$set(_vm.bankForm, "type", index)
                              },
                              _vm.selectBankType
                            ]
                          }
                        }),
                        _vm._v(" "),
                        _c("span", { staticClass: "ml-1 leading-none" }, [
                          _vm._v(_vm._s(item))
                        ])
                      ]
                    )
                  }),
                  0
                )
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "mb-6" }, [
            _c("div", { staticClass: "flex flex-wrap items-center -mx-3" }, [
              _vm._m(3),
              _vm._v(" "),
              _c("div", { staticClass: "w-5/6 px-3" }, [
                _c("div", { staticClass: "flex items-center" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.bankForm.total_score,
                        expression: "bankForm.total_score"
                      }
                    ],
                    staticClass:
                      "form-input max-w-lg text-sm focus:shadow-outline-teal rounded-tr-none rounded-br-none",
                    class: [
                      !_vm.isConfigInput ? "opacity-50 cursor-not-allowed" : ""
                    ],
                    attrs: {
                      type: "text",
                      disabled: !_vm.isConfigInput,
                      placeholder: "总分"
                    },
                    domProps: { value: _vm.bankForm.total_score },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(
                          _vm.bankForm,
                          "total_score",
                          $event.target.value
                        )
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.bankForm.time_limit,
                        expression: "bankForm.time_limit"
                      }
                    ],
                    staticClass:
                      "form-input max-w-lg text-sm focus:shadow-outline-teal rounded-tl-none rounded-bl-none border-l-0",
                    class: [
                      !_vm.isConfigInput ? "opacity-50 cursor-not-allowed" : ""
                    ],
                    attrs: {
                      type: "text",
                      disabled: !_vm.isConfigInput,
                      placeholder: "时间"
                    },
                    domProps: { value: _vm.bankForm.time_limit },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(
                          _vm.bankForm,
                          "time_limit",
                          $event.target.value
                        )
                      }
                    }
                  })
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", [
            _c("div", { staticClass: "flex flex-wrap items-center -mx-3" }, [
              _vm._m(4),
              _vm._v(" "),
              _c("div", { staticClass: "w-5/6 px-3" }, [
                _c(
                  "div",
                  { staticClass: "flex items-center" },
                  [
                    _c("label", { staticClass: "flex items-center" }, [
                      _c(
                        "div",
                        {
                          staticClass:
                            "relative w-8 h-3 bg-gray-200 rounded-full shadow-inner"
                        },
                        [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.bankForm.is_free,
                                expression: "bankForm.is_free"
                              }
                            ],
                            staticClass:
                              "appearance-none absolute w-5 h-5 bg-white rounded-full shadow-md inset-y-0 left-0 -mt-1 -ml-1 focus:outline-none transform checked:bg-teal-500 checked:translate-x-full transition-all duration-300 ease-in-out",
                            attrs: { type: "checkbox" },
                            domProps: {
                              value: true,
                              checked: Array.isArray(_vm.bankForm.is_free)
                                ? _vm._i(_vm.bankForm.is_free, true) > -1
                                : _vm.bankForm.is_free
                            },
                            on: {
                              change: [
                                function($event) {
                                  var $$a = _vm.bankForm.is_free,
                                    $$el = $event.target,
                                    $$c = $$el.checked ? true : false
                                  if (Array.isArray($$a)) {
                                    var $$v = true,
                                      $$i = _vm._i($$a, $$v)
                                    if ($$el.checked) {
                                      $$i < 0 &&
                                        _vm.$set(
                                          _vm.bankForm,
                                          "is_free",
                                          $$a.concat([$$v])
                                        )
                                    } else {
                                      $$i > -1 &&
                                        _vm.$set(
                                          _vm.bankForm,
                                          "is_free",
                                          $$a
                                            .slice(0, $$i)
                                            .concat($$a.slice($$i + 1))
                                        )
                                    }
                                  } else {
                                    _vm.$set(_vm.bankForm, "is_free", $$c)
                                  }
                                },
                                _vm.toggleIsFree
                              ]
                            }
                          })
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "ml-3 text-gray-700 font-medium" },
                        [
                          _vm._v(
                            "\n                    是否免费\n                  "
                          )
                        ]
                      )
                    ]),
                    _vm._v(" "),
                    !_vm.bankForm.is_free
                      ? [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.bankForm.price,
                                expression: "bankForm.price"
                              }
                            ],
                            staticClass:
                              "ml-5 form-input leading-tight max-w-lg text-sm focus:shadow-outline-teal",
                            attrs: { type: "text", placeholder: "请输入价格" },
                            domProps: { value: _vm.bankForm.price },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.bankForm,
                                  "price",
                                  $event.target.value
                                )
                              }
                            }
                          })
                        ]
                      : _vm._e()
                  ],
                  2
                )
              ])
            ])
          ])
        ]),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "px-6 py-3 flex justify-center items-center bg-gray-50"
          },
          [
            _c(
              "button",
              {
                staticClass:
                  "inline-flex items-center justify-center font-medium leading-snug border border-teal-500 focus:outline-none focus:shadow-outline-teal rounded-md px-6 py-2 bg-teal-500 text-white mr-5",
                attrs: { type: "button" },
                on: { click: _vm.handleSubmit }
              },
              [_vm._v("确定")]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass:
                  "inline-flex items-center justify-center font-medium leading-snug border focus:outline-none focus:shadow-outline-gray rounded-md px-6 py-2",
                attrs: { type: "button" },
                on: {
                  click: function($event) {
                    return _vm.$router.go(-1)
                  }
                }
              },
              [_vm._v("返回")]
            )
          ]
        )
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "w-1/6 px-3" }, [
      _c("div", { staticClass: "leading-tight text-right text-gray-900" }, [
        _vm._v("名称")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "w-1/6 px-3" }, [
      _c("div", { staticClass: "leading-tight text-right" }, [
        _vm._v("选择科目")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "w-1/6 px-3" }, [
      _c("div", { staticClass: "leading-tight text-right" }, [
        _vm._v("题库类型")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "w-1/6 px-3" }, [
      _c("div", { staticClass: "leading-tight text-right" }, [
        _vm._v("总分及时间")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "w-1/6 px-3" }, [
      _c("div", { staticClass: "leading-tight text-right" }, [
        _vm._v("支付价格")
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/admin/api/bank.js":
/*!****************************************!*\
  !*** ./resources/js/admin/api/bank.js ***!
  \****************************************/
/*! exports provided: getBanks, showBanks, storeBanks, updateBanks, deleteBanks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBanks", function() { return getBanks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showBanks", function() { return showBanks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storeBanks", function() { return storeBanks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateBanks", function() { return updateBanks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteBanks", function() { return deleteBanks; });
/* harmony import */ var _admin_utils_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/admin/utils/request */ "./resources/js/admin/utils/request.js");
/* harmony import */ var _utils_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/util */ "./resources/js/utils/util.js");


var api = {
  banks: '/banks',
  banksShow: '/banks/%s'
};
var getBanks = function getBanks(params) {
  return Object(_admin_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: api.banks,
    method: 'get',
    params: params
  });
};
var showBanks = function showBanks(id) {
  return Object(_admin_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: Object(_utils_util__WEBPACK_IMPORTED_MODULE_1__["sprintf"])(api.banksShow, id),
    method: 'get'
  });
};
var storeBanks = function storeBanks(params) {
  return Object(_admin_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: api.banks,
    method: 'post',
    data: params
  });
};
var updateBanks = function updateBanks(id, params) {
  return Object(_admin_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: Object(_utils_util__WEBPACK_IMPORTED_MODULE_1__["sprintf"])(api.banksShow, id),
    method: 'put',
    data: params
  });
};
var deleteBanks = function deleteBanks(id) {
  return Object(_admin_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: Object(_utils_util__WEBPACK_IMPORTED_MODULE_1__["sprintf"])(api.banksShow, id),
    method: 'delete'
  });
};

/***/ }),

/***/ "./resources/js/admin/api/subject.js":
/*!*******************************************!*\
  !*** ./resources/js/admin/api/subject.js ***!
  \*******************************************/
/*! exports provided: getSubjects, getSubjectsTree, showSubjects, storeSubjects, updateSubjects, deleteSubjects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSubjects", function() { return getSubjects; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSubjectsTree", function() { return getSubjectsTree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showSubjects", function() { return showSubjects; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storeSubjects", function() { return storeSubjects; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSubjects", function() { return updateSubjects; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteSubjects", function() { return deleteSubjects; });
/* harmony import */ var _admin_utils_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/admin/utils/request */ "./resources/js/admin/utils/request.js");
/* harmony import */ var _utils_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/util */ "./resources/js/utils/util.js");


var api = {
  subjectsTree: '/subjects/tree',
  subjects: '/subjects',
  subjectsShow: '/subjects/%s'
};
var getSubjects = function getSubjects(params) {
  return Object(_admin_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: api.subjects,
    method: 'get',
    params: params
  });
};
var getSubjectsTree = function getSubjectsTree() {
  return Object(_admin_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: api.subjectsTree,
    method: 'get'
  });
};
var showSubjects = function showSubjects(id) {
  return Object(_admin_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: Object(_utils_util__WEBPACK_IMPORTED_MODULE_1__["sprintf"])(api.subjectsShow, id),
    method: 'get'
  });
};
var storeSubjects = function storeSubjects(params) {
  return Object(_admin_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: api.subjects,
    method: 'post',
    data: params
  });
};
var updateSubjects = function updateSubjects(id, params) {
  return Object(_admin_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: Object(_utils_util__WEBPACK_IMPORTED_MODULE_1__["sprintf"])(api.subjectsShow, id),
    method: 'put',
    data: params
  });
};
var deleteSubjects = function deleteSubjects(id) {
  return Object(_admin_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: Object(_utils_util__WEBPACK_IMPORTED_MODULE_1__["sprintf"])(api.subjectsShow, id),
    method: 'delete'
  });
};

/***/ }),

/***/ "./resources/js/admin/mixins/Bank.js":
/*!*******************************************!*\
  !*** ./resources/js/admin/mixins/Bank.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      bankTypeMap: {
        1: '章节练习',
        2: '模拟考试',
        3: '历年真题',
        4: '每日一练'
      }
    };
  }
});

/***/ }),

/***/ "./resources/js/admin/views/bank/Form.vue":
/*!************************************************!*\
  !*** ./resources/js/admin/views/bank/Form.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Form_vue_vue_type_template_id_6c95b5b0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Form.vue?vue&type=template&id=6c95b5b0& */ "./resources/js/admin/views/bank/Form.vue?vue&type=template&id=6c95b5b0&");
/* harmony import */ var _Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Form.vue?vue&type=script&lang=js& */ "./resources/js/admin/views/bank/Form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Form_vue_vue_type_template_id_6c95b5b0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Form_vue_vue_type_template_id_6c95b5b0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/admin/views/bank/Form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/admin/views/bank/Form.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/admin/views/bank/Form.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/admin/views/bank/Form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/admin/views/bank/Form.vue?vue&type=template&id=6c95b5b0&":
/*!*******************************************************************************!*\
  !*** ./resources/js/admin/views/bank/Form.vue?vue&type=template&id=6c95b5b0& ***!
  \*******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_6c95b5b0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=template&id=6c95b5b0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/admin/views/bank/Form.vue?vue&type=template&id=6c95b5b0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_6c95b5b0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_6c95b5b0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);