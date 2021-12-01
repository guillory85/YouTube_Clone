/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/auth.js":
/*!*********************!*\
  !*** ./src/auth.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"handleClientLoad\": () => (/* binding */ handleClientLoad),\n/* harmony export */   \"initClient\": () => (/* binding */ initClient),\n/* harmony export */   \"updateSigninStatus\": () => (/* binding */ updateSigninStatus),\n/* harmony export */   \"handleInClick\": () => (/* binding */ handleInClick),\n/* harmony export */   \"handleOutClick\": () => (/* binding */ handleOutClick)\n/* harmony export */ });\n/* harmony import */ var _callapi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./callapi.js */ \"./src/callapi.js\");\n/* harmony import */ var _reset_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reset.js */ \"./src/reset.js\");\n\n\nvar API_key = 'AIzaSyA6VoAruuA8T3mXQTVlmQ2qP6zzwCMO1ss';\nvar CLIENT_ID = '442978217327-fdsftgtrgfu219s8n8rdkscqnbokj9r3.apps.googleusercontent.com';\nvar DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];\nvar SCOPES = 'https://www.googleapis.com/auth/youtube.force-ssl';\nvar signIn = document.querySelector('#signIn');\nvar signOut = document.querySelector('#signOut');\nfunction handleClientLoad() {\n  gapi.load('client:auth2', initClient);\n}\nfunction initClient() {\n  gapi.client.init({\n    'apiKey': API_key,\n    'clientId': CLIENT_ID,\n    'scope': SCOPES,\n    'discoveryDocs': DISCOVERY_DOCS\n  }).then(function () {\n    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);\n    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());\n    signIn.onclick = handleInClick;\n    signOut.onclick = handleOutClick;\n  });\n}\nfunction updateSigninStatus(isSignedIn) {\n  if (isSignedIn) {\n    isAuthorized = true;\n    signIn.style.display = \"none\";\n    signOut.style.display = \"block\";\n    (0,_callapi_js__WEBPACK_IMPORTED_MODULE_0__.makeApiCall)();\n  } else {\n    isAuthorized = false;\n    signIn.style.display = \"block\";\n    signOut.style.display = \"none\";\n  }\n}\nfunction handleInClick() {\n  gapi.auth2.getAuthInstance().signIn();\n  console.log(\"You are signed in!\");\n}\nfunction handleOutClick() {\n  gapi.auth2.getAuthInstance().signOut();\n  (0,_reset_js__WEBPACK_IMPORTED_MODULE_1__.reset)();\n  console.log(\"You have signed out!\");\n}\n\n//# sourceURL=webpack://yt-clone/./src/auth.js?");

/***/ }),

/***/ "./src/callapi.js":
/*!************************!*\
  !*** ./src/callapi.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"makeApiCall\": () => (/* binding */ makeApiCall)\n/* harmony export */ });\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nfunction makeApiCall() {\n  gapi.client.request({\n    'method': 'get',\n    'path': '/youtube/v3/videos',\n    'params': {\n      'part': 'snippet,contentDetails,id,player',\n      'chart': 'mostPopular',\n      'maxResults': 48\n    }\n  }).then( /*#__PURE__*/function () {\n    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resp) {\n      var item, err;\n      return regeneratorRuntime.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              _context.prev = 0;\n              _context.next = 3;\n              return resp.result.items;\n\n            case 3:\n              item = _context.sent;\n              item.forEach(function (items) {\n                var player = items.player;\n                var embedHtml = player.embedHtml;\n                var snippet = items.snippet;\n                var thumbnails = snippet.thumbnails;\n                var image = thumbnails.medium;\n                var url = image.url;\n                var title = snippet.title;\n                var channelTitle = snippet.channelTitle;\n                var divTag = document.createElement('div');\n                divTag.setAttribute('class', 'imgStyle');\n                var imgTag = document.createElement('img');\n                var hTag = document.createElement('h3');\n                var aTag = document.createElement('a');\n                var tiltText = document.createTextNode(title);\n                var channelTitleText = document.createTextNode(channelTitle);\n                Object.assign(imgTag, {\n                  src: url,\n                  alt: title\n                });\n                hTag.appendChild(tiltText);\n                aTag.appendChild(channelTitleText);\n                divTag.appendChild(imgTag);\n                divTag.appendChild(hTag);\n                divTag.appendChild(aTag);\n                document.querySelector('#output').appendChild(divTag);\n                divTag.addEventListener('click', function () {\n                  document.querySelector('#videoOutput').innerHTML = embedHtml;\n                  document.querySelector('#output').style.display = 'none';\n                });\n              });\n              _context.next = 11;\n              break;\n\n            case 7:\n              _context.prev = 7;\n              _context.t0 = _context[\"catch\"](0);\n              err = _context.t0.message;\n              console.log(err);\n\n            case 11:\n              console.log(resp);\n\n            case 12:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee, null, [[0, 7]]);\n    }));\n\n    return function (_x) {\n      return _ref.apply(this, arguments);\n    };\n  }());\n}\n\n//# sourceURL=webpack://yt-clone/./src/callapi.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _auth_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.js */ \"./src/auth.js\");\n\n(0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.handleClientLoad)();\n(0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.initClient)();\n(0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.updateSigninStatus)();\n(0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.handleInClick)();\n(0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.handleOutClick)();\n\n//# sourceURL=webpack://yt-clone/./src/index.js?");

/***/ }),

/***/ "./src/reset.js":
/*!**********************!*\
  !*** ./src/reset.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"reset\": () => (/* binding */ reset)\n/* harmony export */ });\nfunction reset() {\n  document.querySelector('#output').style.display = \"none\";\n  document.querySelector('#videoOutput').style.display = \"none\";\n}\n\n//# sourceURL=webpack://yt-clone/./src/reset.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;