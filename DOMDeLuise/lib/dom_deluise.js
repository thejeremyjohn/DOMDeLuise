/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

const curriedCBs = [];
let ready = false;

function $l(arg) {
  if (arg instanceof HTMLElement) {
    return new DOMNodeCollection([arg]);
  } else if (typeof arg === 'function') {
    curryOrExecute(arg);
  } else {
    return new DOMNodeCollection(
      Array.from(document.querySelectorAll(arg))
    );
  }
}

// function $l(selector) {
//   if (selector instanceof HTMLElement) {
//     const arr = [selector];
//     return new DOMNodeCollection(arr);
//   } else if (typeof selector === 'function') {
//     window.addEventListener('load', selector);
//     console.log('this should print before');
//   } else {
//     const arr = Array.from(document.querySelectorAll(selector));
//     return new DOMNodeCollection(arr);
//   }
// }

function curryOrExecute(f) {
  if (ready) {
    f();
  } else {
    curriedCBs.push(f);
  }
}

$l.__proto__.ajax = function(options) {
  let defThen = function () {
    console.log(xhr.status); // for status info
    console.log(xhr.responseType); // the type of data that was returned
    console.log(JSON.parse(xhr.response)); // the actual response. For JSON api calls, this will be a JSON string
  };

  let success = options.success || defThen;
  let error = options.error || defThen;
  let url = options.url || 'http://localhost/3000';
  let method = options.method || 'GET';
  let data = options.data || {};
  let contentType = options.contentType || 'JSON';

  const xhr = new XMLHttpRequest();

  xhr.open(method, url);

  if (parseInt(xhr.status) < 400) {
    xhr.onload = success;
  } else {
    xhr.onload = error;
  }

  xhr.send(JSON.stringify(data));
};

window.$l = $l;
window.DOMNodeCollection = DOMNodeCollection;

// $l( () => console.log('this should print after') );

document.addEventListener('DOMContentLoaded', () => {
  ready = true;
  curriedCBs.forEach(f => f());
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(htmlArray) {
    this.htmlArray = htmlArray;
  }

  html(str=null) {
    if (str) {
      this.htmlArray.forEach(node => (
        node.innerHTML = str
      ));
    } else {
      return this.htmlArray[0].innerHTML;
    }
  }
  // html(string) {
  //   if (typeof string === "string") {
  //     this.htmlArray.forEach(function(el) {
  //       el.innerHTML = string;
  //     });
  //   } else {
  //     return this.htmlArray[0].innerHTML;
  //   }
  // }

  empty() {
    this.html('');
  }

  append(arg) {
    if (arg instanceof DOMNodeCollection) {
      const that = this;
      arg.htmlArray.forEach(function (node) {
        that.append(node);
      });

    } else if (arg instanceof HTMLElement) {
      this.htmlArray.forEach(function(el) {
        el.innerHTML += arg.outerHTML;
      });

    } else if (typeof arg === 'string') {
      this.htmlArray.forEach(function(el) {
        el.innerHTML += arg;
      });
    }
  }

  attr(key, val) {
    if (!val) {
      return this.htmlArray[0].getAttribute(key);
    } else {
      this.htmlArray.forEach(function(el) {
        el.setAttribute(key, val);
      });
    }
  }

  addClass(className) {
    this.htmlArray.forEach(function (node) {
      node.classList.add(className);
    });
  }

  removeClass(className) {
    this.htmlArray.forEach(function (node) {
      node.classList.remove(className);
    });
  }

  children() {
    const childs = this.htmlArray.map(node => (
      Array.from( node.children )
    ));
    return new DOMNodeCollection(childs[0]);
  }
  // children() {
  //   const childs = this.htmlArray.map( (el) => {
  //     return Array.prototype.slice.call( el.children );
  //   });
  //   return new DOMNodeCollection(childs[0]);
  // }

  parent() {
    const parents = [];
    this.htmlArray.forEach(node => {
      if (!parents.includes(node.parentNode)) {
         parents.push(node.parentNode);
      }
    });
    return new DOMNodeCollection(parents);
  }

  find(selector) {
    let foundNodes = [];
    this.htmlArray.forEach(node => {
      foundNodes = foundNodes.concat(
        Array.from(node.querySelectorAll(selector))
      );
    });
    return new DOMNodeCollection(foundNodes);
  }

  remove() {
    this.htmlArray.forEach(node => {
      const parent = node.parentNode;
      parent.removeChild(node);
    });
    this.htmlArray = [];
  }

  on(type, handler) {
    this.htmlArray.forEach(node => {
      node.addEventListener(type, handler);
      node.type = type;
      node.listener = handler;
    });
  }

  off(type, handler) {
    this.htmlArray.forEach(node => {
      type = node.type || type;
      handler = node.listener || handler;
      node.removeEventListener(type, handler);
    });
  }

  ready () {

  }

}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);