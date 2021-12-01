/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/auth.js":
/*!*********************!*\
  !*** ./src/auth.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initClient\": () => (/* binding */ initClient)\n/* harmony export */ });\n/* harmony import */ var _callapi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./callapi.js */ \"./src/callapi.js\");\n/* harmony import */ var _reset_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reset.js */ \"./src/reset.js\");\n\n\nvar API_key = 'AIzaSyBYf4BqVTCZogqRKxcmmEdzufGesXDmKII';\nvar CLIENT_ID = '984566811730-bmukbq2h5lk81rs3g5drdcudc8rpbe31.apps.googleusercontent.com';\nvar DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'];\nvar SCOPES = 'https://www.googleapis.com/auth/youtube';\nvar signIn = document.querySelector('#signIn');\nvar signOut = document.querySelector('#signOut');\nvar GoogleAuth;\nfunction initClient() {\n  gapi.client.init({\n    'apiKey': API_key,\n    'clientId': CLIENT_ID,\n    'scope': SCOPES,\n    'discoveryDocs': DISCOVERY_DOCS\n  }).then(function () {\n    GoogleAuth = gapi.auth2.getAuthInstance();\n    GoogleAuth.isSignedIn.listen(updateSigninStatus);\n    var user = GoogleAuth.currentUser.get();\n    setSigninStatus();\n    signIn.onclick = handleAuthClick;\n    signOut.onclick = revokeAccess;\n  });\n}\n\nfunction handleAuthClick() {\n  if (GoogleAuth.isSignedIn.get()) {\n    GoogleAuth.signOut();\n  } else {\n    GoogleAuth.signIn();\n    (0,_callapi_js__WEBPACK_IMPORTED_MODULE_0__.makeApiCall)();\n  }\n}\n\nfunction revokeAccess() {\n  GoogleAuth.disconnect();\n  (0,_reset_js__WEBPACK_IMPORTED_MODULE_1__.reset)();\n}\n\nfunction setSigninStatus() {\n  var user = GoogleAuth.currentUser.get();\n  var isAuthorized = user.hasGrantedScopes(SCOPES);\n\n  if (isAuthorized) {\n    signIn.style.display = \"none\";\n    signOut.style.display = \"block\";\n    console.log(\"You have signed in!\");\n  } else {\n    signIn.style.display = \"block\";\n    signOut.style.display = \"none\";\n    console.log(\"You are signed out!\");\n  }\n}\n\nfunction updateSigninStatus() {\n  setSigninStatus();\n}\n\n//# sourceURL=webpack://yt-clone/./src/auth.js?");

/***/ }),

/***/ "./src/callapi.js":
/*!************************!*\
  !*** ./src/callapi.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"makeApiCall\": () => (/* binding */ makeApiCall)\n/* harmony export */ });\nfunction makeApiCall() {\n  gapi.client.request({\n    'method': 'get',\n    'path': '/youtube/v3/videos',\n    'params': {\n      'part': 'snippet,contentDetails,id,player',\n      'chart': 'mostPopular',\n      'maxResults': 48\n    }\n  }).then(function (res) {\n    try {\n      var item = res.result.items;\n      item.forEach(function (items) {\n        var player = items.player;\n        var embedHtml = player.embedHtml;\n        var snippet = items.snippet;\n        var thumbnails = snippet.thumbnails;\n        var image = thumbnails.medium;\n        var url = image.url;\n        var title = snippet.title;\n        var channelTitle = snippet.channelTitle;\n        var divTag = document.createElement('div');\n        divTag.setAttribute('class', 'imgStyle');\n        var imgTag = document.createElement('img');\n        var hTag = document.createElement('h3');\n        var aTag = document.createElement('a');\n        var tiltText = document.createTextNode(title);\n        var channelTitleText = document.createTextNode(channelTitle);\n        Object.assign(imgTag, {\n          src: url,\n          alt: title\n        });\n        hTag.appendChild(tiltText);\n        aTag.appendChild(channelTitleText);\n        divTag.appendChild(imgTag);\n        divTag.appendChild(hTag);\n        divTag.appendChild(aTag);\n        document.querySelector('#output').appendChild(divTag);\n        divTag.addEventListener('click', function () {\n          document.querySelector('#videoOutput').innerHTML = embedHtml;\n          document.querySelector('#output').style.display = 'none';\n        });\n      });\n    } catch (error) {\n      var err = error.message;\n      console.log(err);\n    }\n  });\n}\n\n//# sourceURL=webpack://yt-clone/./src/callapi.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _auth_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.js */ \"./src/auth.js\");\n\ngapi.load('client:auth2', _auth_js__WEBPACK_IMPORTED_MODULE_0__.initClient);\n\n//# sourceURL=webpack://yt-clone/./src/index.js?");

/***/ }),

/***/ "./src/reset.js":
/*!**********************!*\
  !*** ./src/reset.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"reset\": () => (/* binding */ reset)\n/* harmony export */ });\nfunction reset() {\n  document.querySelector('#output').style.display = \"none\";\n  document.querySelector('#videoOutput').style.display = \"none\";\n}\n\n//# sourceURL=webpack://yt-clone/./src/reset.js?");

/***/ }),

/***/ "./src/search.js":
/*!***********************!*\
  !*** ./src/search.js ***!
  \***********************/
/***/ (() => {

eval("document.querySelector('.submitbtn').addEventListener('click', function () {\n  var search = document.querySelector('#search').value;\n  var batch = gapi.client.newBatch();\n  var searchApi = gapi.client.request({\n    'path': '/youtube/v3/search',\n    'params': {\n      'part': 'snippet',\n      'q': search,\n      'maxResults': 48\n    }\n  });\n  batch.add(searchApi);\n  searchApi.then(function (res) {\n    console.log(res);\n\n    try {\n      var item = res.result.items;\n      item.forEach(function (items) {\n        var snippet = items.snippet;\n        var thumbnails = snippet.thumbnails;\n        var image = thumbnails.medium;\n        var url = image.url;\n        var title = snippet.title;\n        var channelTitle = snippet.channelTitle;\n        var divTag = document.createElement('div');\n        divTag.setAttribute('class', 'imgStyle');\n        var imgTag = document.createElement('img');\n        var hTag = document.createElement('h3');\n        var aTag = document.createElement('a');\n        var tiltText = document.createTextNode(title);\n        var channelTitleText = document.createTextNode(channelTitle);\n        Object.assign(imgTag, {\n          src: url,\n          alt: title\n        });\n        hTag.appendChild(tiltText);\n        aTag.appendChild(channelTitleText);\n        divTag.appendChild(imgTag);\n        divTag.appendChild(hTag);\n        divTag.appendChild(aTag);\n        document.querySelector('#output').appendChild(divTag);\n        divTag.addEventListener('click', function () {\n          document.querySelector('#videoOutput').innerHTML = embedHtml;\n          document.querySelector('#output').style.display = 'none';\n        });\n        document.querySelector('#search').addEventListener('change', function () {\n          document.querySelector('#output').removeChild(divTag);\n        });\n      });\n    } catch (error) {\n      var err = error.message;\n      console.log(err);\n    }\n  });\n  batch.then();\n});\n\n//# sourceURL=webpack://yt-clone/./src/search.js?");

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
/******/ 	__webpack_require__("./src/index.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/search.js");
/******/ 	
/******/ })()
;