const DOMNodeCollection = require('./dom_node_collection.js');

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
