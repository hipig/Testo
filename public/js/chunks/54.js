(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[54],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/subject/tabs/ExamList.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/subject/tabs/ExamList.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_bank__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/api/bank */ "./resources/js/api/bank.js");
/* harmony import */ var _api_learnRecord__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/api/learnRecord */ "./resources/js/api/learnRecord.js");
/* harmony import */ var _components_common_EmptyData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/common/EmptyData */ "./resources/js/components/common/EmptyData.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "ExamList",
  components: {
    EmptyData: _components_common_EmptyData__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  props: {
    subjectId: {
      type: Number | String,
      "default": 0
    },
    type: {
      type: String,
      "default": 'mock'
    }
  },
  data: function data() {
    return {
      list: [],
      isLoading: null
    };
  },
  mounted: function mounted() {
    this.getExamList();
  },
  watch: {
    type: function type(val) {
      this.getExamList();
    },
    subjectId: function subjectId(val) {
      this.getExamList();
    }
  },
  methods: {
    getExamList: function getExamList() {
      var _this = this;

      this.isLoading = true;
      var request = this.type === 'mock' ? _api_bank__WEBPACK_IMPORTED_MODULE_0__["getMockExams"] : _api_bank__WEBPACK_IMPORTED_MODULE_0__["getOldExams"];
      request(this.subjectId).then(function (res) {
        _this.list = res;
      })["finally"](function () {
        _this.isLoading = false;
      });
    },
    handle: function handle(id) {
      var _this2 = this;

      Object(_api_learnRecord__WEBPACK_IMPORTED_MODULE_1__["storeExamRecords"])({
        bank_id: id
      }).then(function (res) {
        _this2.$router.push({
          name: 'mode.exam',
          params: {
            id: res.id
          }
        });
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/subject/tabs/ExamList.vue?vue&type=template&id=8c2eef48&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/subject/tabs/ExamList.vue?vue&type=template&id=8c2eef48& ***!
  \*******************************************************************************************************************************************************************************************************************/
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
    [
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
          staticClass: "flex flex-wrap -mx-3",
          attrs: { "loading-custom-class": "h-48" }
        },
        _vm._l(_vm.list, function(item, index) {
          return _c("div", { key: index, staticClass: "w-1/2 px-3 mb-5" }, [
            _c("div", { staticClass: "bg-white shadow rounded-lg p-5" }, [
              _c("div", { staticClass: "mb-8 flex justify-between" }, [
                _c(
                  "div",
                  { staticClass: "text-base text-gray-900 pr-5 truncate" },
                  [_vm._v(_vm._s(item.title))]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "text-gray-400" }, [
                  _c("span", { staticClass: "text-teal-500" }, [
                    _vm._v(_vm._s(item.record_count || 0))
                  ]),
                  _vm._v("/" + _vm._s(item.total_count))
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "flex items-center justify-between" }, [
                _c("div", { staticClass: "text-gray-400" }, [
                  _c("span", { staticClass: "mr-5" }, [
                    _vm._v("总分： " + _vm._s(item.total_score) + "分")
                  ]),
                  _vm._v(" "),
                  _c("span", [
                    _vm._v("时间：" + _vm._s(item.time_limit) + "分")
                  ])
                ]),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass:
                      "px-3 h-8 flex items-center justify-center border-2 border-yellow-500 text-yellow-500 bg-yellow-50 rounded focus:outline-none",
                    attrs: { type: "button" },
                    on: {
                      click: function($event) {
                        return _vm.handle(item.id)
                      }
                    }
                  },
                  [_vm._v("开始考试")]
                )
              ])
            ])
          ])
        }),
        0
      ),
      _vm._v(" "),
      _c("empty-data", {
        attrs: { show: _vm.isLoading === false && _vm.list.length === 0 }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/api/bank.js":
/*!**********************************!*\
  !*** ./resources/js/api/bank.js ***!
  \**********************************/
/*! exports provided: getChapterTests, getMockExams, getOldExams, getDailyTests, geCountTypeTotal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getChapterTests", function() { return getChapterTests; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMockExams", function() { return getMockExams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOldExams", function() { return getOldExams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDailyTests", function() { return getDailyTests; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "geCountTypeTotal", function() { return geCountTypeTotal; });
/* harmony import */ var _utils_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/request */ "./resources/js/utils/request.js");
/* harmony import */ var _utils_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/util */ "./resources/js/utils/util.js");


var api = {
  chapterTests: '/subjects/%s/chapter-tests',
  mockExams: '/subjects/%s/mock-exams',
  oldExams: '/subjects/%s/old-exams',
  dailyTests: '/subjects/%s/daily-tests',
  countTypeTotal: '/banks/%s/count-type-total'
};
var getChapterTests = function getChapterTests(id) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: Object(_utils_util__WEBPACK_IMPORTED_MODULE_1__["sprintf"])(api.chapterTests, id),
    method: 'get'
  });
};
var getMockExams = function getMockExams(id) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: Object(_utils_util__WEBPACK_IMPORTED_MODULE_1__["sprintf"])(api.mockExams, id),
    method: 'get'
  });
};
var getOldExams = function getOldExams(id) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: Object(_utils_util__WEBPACK_IMPORTED_MODULE_1__["sprintf"])(api.oldExams, id),
    method: 'get'
  });
};
var getDailyTests = function getDailyTests(id) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: Object(_utils_util__WEBPACK_IMPORTED_MODULE_1__["sprintf"])(api.dailyTests, id),
    method: 'get'
  });
};
var geCountTypeTotal = function geCountTypeTotal(id, params) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: Object(_utils_util__WEBPACK_IMPORTED_MODULE_1__["sprintf"])(api.countTypeTotal, id),
    method: 'get',
    params: params
  });
};

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

/***/ "./resources/js/views/subject/tabs/ExamList.vue":
/*!******************************************************!*\
  !*** ./resources/js/views/subject/tabs/ExamList.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ExamList_vue_vue_type_template_id_8c2eef48___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ExamList.vue?vue&type=template&id=8c2eef48& */ "./resources/js/views/subject/tabs/ExamList.vue?vue&type=template&id=8c2eef48&");
/* harmony import */ var _ExamList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ExamList.vue?vue&type=script&lang=js& */ "./resources/js/views/subject/tabs/ExamList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ExamList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ExamList_vue_vue_type_template_id_8c2eef48___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ExamList_vue_vue_type_template_id_8c2eef48___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/subject/tabs/ExamList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/subject/tabs/ExamList.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/views/subject/tabs/ExamList.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ExamList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ExamList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/subject/tabs/ExamList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ExamList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/subject/tabs/ExamList.vue?vue&type=template&id=8c2eef48&":
/*!*************************************************************************************!*\
  !*** ./resources/js/views/subject/tabs/ExamList.vue?vue&type=template&id=8c2eef48& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ExamList_vue_vue_type_template_id_8c2eef48___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ExamList.vue?vue&type=template&id=8c2eef48& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/subject/tabs/ExamList.vue?vue&type=template&id=8c2eef48&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ExamList_vue_vue_type_template_id_8c2eef48___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ExamList_vue_vue_type_template_id_8c2eef48___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);