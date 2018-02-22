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

function $l(selector) {
  if (selector instanceof HTMLElement) {
    const arr = [selector];
    return new DOMNodeCollection(arr);
  } else if (typeof selector === 'function') {
    window.addEventListener("load", selector);
    console.log('this should print before');
  } else {
    const arr = Array.from(document.querySelectorAll(selector));
    return new DOMNodeCollection(arr);
  }
}

$l.__proto__.ajax = function(options) {
  let defThen = function () {
    console.log(xhr.status); // for status info
    console.log(xhr.responseType); //the type of data that was returned
    console.log(JSON.parse(xhr.response)); //the actual response. For JSON api calls, this will be a JSON string
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
  
  xhr.send(data);
};

window.$l = $l;
window.DOMNodeCollection = DOMNodeCollection;

$l( () => console.log('this should print after') );


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(html_array) {
    this.html_array = html_array;
  }
  
  html(string) {
    if (typeof string === "string") {
      this.html_array.forEach(function(el) {
        el.innerHTML = string;
      });
    } else {
      return this.html_array[0].innerHTML;
    }
  }
  
  empty() {
    this.html("");
  }
  
  append(arg) {
    if (arg instanceof DOMNodeCollection) {
      const that = this;
      arg.html_array.forEach(function (htmlel) {
        that.append(htmlel);
      });
    } else if (arg instanceof HTMLElement) {
      this.html_array.forEach(function(el) {
        el.innerHTML += arg.outerHTML;
      });
      
      
    } else if (typeof arg === 'string') {
      this.html_array.forEach(function(el) {
        el.innerHTML += arg;
      });
    }
  }
  
  attr(key, val) {
    if (!val) {
      return this.html_array[0].getAttribute(key);
    } else {
      this.html_array.forEach(function(el) {
        el.setAttribute(key, val);
      });
    }
  }
  
  addClass(className) {
    this.html_array.forEach(function (htmlel) {
      htmlel.classList.add(className);
    });
  }
  
  removeClass(className) {
    this.html_array.forEach(function (htmlel) {
      htmlel.classList.remove(className);
    });
  }
    
  children() {
    const childs = this.html_array.map( (el) => {
      return Array.prototype.slice.call( el.children );
    });
    return new DOMNodeCollection(childs[0]);
  }
  
  parent() {
    const par = [];
    this.html_array.forEach( (el) => {
      if (!par.includes(el.parentNode)) {
         par.push(el.parentNode);
      }  
    });
    return new DOMNodeCollection(par);
  }
  
  find(selector) {
    let arr = [];
    this.html_array.forEach( (el) => { 
      arr = arr.concat(
        Array.from(el.querySelectorAll(selector))
      );
    });
    return new DOMNodeCollection(arr);
  }
  
  remove() {
    this.html_array.forEach ( (el) => {
      const parent = el.parentNode;
      parent.removeChild(el);
    });
    this.html_array = [];
  }
  
  on (type, handler) {
    this.html_array.forEach ( (el) => {
      el.addEventListener(type, handler);
      el.type = type;
      el.listener = handler;
    });
  }
    
  off (type, handler) {
    this.html_array.forEach ( (el) => {
      type = el.type || type;
      handler = el.listener || handler;
      el.removeEventListener(type, handler);
    });
  }
  
  ready () {
    
  }
  
}

module.exports = DOMNodeCollection;

/***/ })
/******/ ]);