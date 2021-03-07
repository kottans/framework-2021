export const createElement = (tag, props, ...children) => {
  if (typeof tag === "function") return tag({...props, children}, children);
  const element = tag === "" ? new DocumentFragment() : document.createElement(tag);
  Object.entries(props || {}).forEach(([name, value]) => {
    if (name.startsWith('on') && name.toLowerCase() in window) {
      element.addEventListener(name.toLowerCase().substr(2), value);
    } else {
      try {
        if (!(element instanceof DocumentFragment)) {
          element.setAttribute(name, value.toString());
        }
      } catch(e) {
        console.log("createElement caught", e, "on", element);
      }
    }
  });

  children
    .filter(child => child)
    .forEach(child => appendChild(element, child));

  return element;
}

const appendChild = (parent, child) => {
  if (Array.isArray(child)) {
    child.forEach(subChild => appendChild(parent, subChild));
  } else {
    parent.appendChild(
      child.nodeType ? child : document.createTextNode(child.toString())
    )
  }
}

export const createFragment = (props, ...children) => createElement("", props, ...children);

// ======================================

export const TEXT_ELEMENT = "TEXT ELEMENT";

export function createVirtualElement(tag, props, ...children) {
  console.log(tag, props);
  return {
    tag: tag,
    props: {
      ...props,
      children: (children.length > 0 ? [...children] : [])
        .filter(child => child != null && child !== false)
        .map(child => child instanceof Object ? child : createVirtualTextElement(child)),
    },
  };
}

function createVirtualTextElement(value) {
  return createVirtualElement(TEXT_ELEMENT, { nodeValue: value });
}


