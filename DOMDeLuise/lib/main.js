const DOMNodeCollection = require('./dom_node_collection.js');

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
// window.DOMNodeCollection = DOMNodeCollection;

document.addEventListener('DOMContentLoaded', () => {
  ready = true;
  curriedCBs.forEach(f => f());
});
