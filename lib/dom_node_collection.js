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
  
}

module.exports = DOMNodeCollection;