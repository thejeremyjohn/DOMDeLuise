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

}

module.exports = DOMNodeCollection;
