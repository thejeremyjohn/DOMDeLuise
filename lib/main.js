const DOMNodeCollection = require('./dom_node_collection.js');

function $l(selectors) {
  if (selectors instanceof HTMLElement) {
    const arr = [selectors];
    return new DOMNodeCollection(arr);
  } else {
    const arr = Array.from(document.querySelectorAll(selectors));
    return new DOMNodeCollection(arr);
  }
}

window.$l = $l;

window.DOMNodeCollection = DOMNodeCollection;
