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
    
}

module.exports = DOMNodeCollection;