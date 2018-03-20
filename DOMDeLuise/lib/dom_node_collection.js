class DOMNodeCollection {
  constructor(htmlArray) {
    this.htmlArray = htmlArray;
  }

  html(string) {
    if (typeof string === "string") {
      this.htmlArray.forEach(function(el) {
        el.innerHTML = string;
      });
    } else {
      return this.htmlArray[0].innerHTML;
    }
  }

  empty() {
    this.html("");
  }

  append(arg) {
    if (arg instanceof DOMNodeCollection) {
      const that = this;
      arg.htmlArray.forEach(function (htmlel) {
        that.append(htmlel);
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
    this.htmlArray.forEach(function (htmlel) {
      htmlel.classList.add(className);
    });
  }

  removeClass(className) {
    this.htmlArray.forEach(function (htmlel) {
      htmlel.classList.remove(className);
    });
  }

  children() {
    const childs = this.htmlArray.map( (el) => {
      return Array.prototype.slice.call( el.children );
    });
    return new DOMNodeCollection(childs[0]);
  }

  parent() {
    const par = [];
    this.htmlArray.forEach( (el) => {
      if (!par.includes(el.parentNode)) {
         par.push(el.parentNode);
      }
    });
    return new DOMNodeCollection(par);
  }

  find(selector) {
    let arr = [];
    this.htmlArray.forEach( (el) => {
      arr = arr.concat(
        Array.from(el.querySelectorAll(selector))
      );
    });
    return new DOMNodeCollection(arr);
  }

  remove() {
    this.htmlArray.forEach ( (el) => {
      const parent = el.parentNode;
      parent.removeChild(el);
    });
    this.htmlArray = [];
  }

  on (type, handler) {
    this.htmlArray.forEach ( (el) => {
      el.addEventListener(type, handler);
      el.type = type;
      el.listener = handler;
    });
  }

  off (type, handler) {
    this.htmlArray.forEach ( (el) => {
      type = el.type || type;
      handler = el.listener || handler;
      el.removeEventListener(type, handler);
    });
  }

  ready () {

  }

}

module.exports = DOMNodeCollection;
