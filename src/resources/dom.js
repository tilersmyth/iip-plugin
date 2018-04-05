class Element {
  constructor(node) {
    this.obj = node;
  }

  show() {
    this.obj.style.display = "block";
  }

  hide() {
    this.obj.style.display = "none";
  }

  addClass(name) {
    this.obj.className += " " + name;
  }

  removeClass(name) {
    const reg = new RegExp("(\\s|^)" + name + "(\\s|$)");
    this.obj.className = this.obj.className.replace(reg, "");
  }

  setHtml(html) {
    this.obj.innerHTML = html;
  }

  append(el) {
    const element = DOM.htmlify(el);
    this.obj.appendChild(element.obj);
    return element;
  }
}

let DOM = (query, root, single) => {
  if (typeof single === "undefined") {
    single = true;
  }

  if (!root) {
    root = window.document;
  }

  if (root instanceof Element) {
    root = root.obj;
  }

  let elements = [].slice.call(root.querySelectorAll(query), 0);

  if (elements.length === 0) {
    return null;
  }

  if (elements.length === 1 && single) {
    return new Element(elements[0]);
  }

  // convert NodeList to Array
  elements = [].slice.call(elements, 0);

  return elements.map(function(el) {
    return new Element(el);
  });
};

DOM.htmlify = el => {
  /*
    Convert :param html: into an Element (if not already).
    */

  if (el instanceof Element) {
    return el;
  }

  if (el instanceof window.Element) {
    return new Element(el);
  }

  let wrapper = DOM.new("div");
  wrapper.innerHTML = el;
  return new Element(wrapper.firstChild);
};

DOM.new = (tag, content) => {
  let el = document.createElement(tag.split(".")[0]);
  tag
    .split(".")
    .slice(1)
    .forEach(function(val) {
      el.classList.add(val);
    });

  if (["A", "LINK"].indexOf(el.nodeName) > -1) {
    el.href = "#";
  }

  if (!content && content !== 0) {
    content = "";
  }
  if (["TEXTAREA", "INPUT"].indexOf(el.nodeName) > -1) {
    el.value = content;
  } else {
    el.textContent = content;
  }
  return el;
};

export default DOM;
