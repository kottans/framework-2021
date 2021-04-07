/**
 * Creates DOM Node. Implements jsx-parser's createElement API
 * @param tag - HTML tag as string or Component function
 * @param props - element properties as parsed by jsx-parser
 * @param children - child elements
 * @returns {DocumentFragment|Element}
 */
export const createElement = (tag, props, ...children) => {
  if (typeof tag === 'function') return tag({ ...props, children }, children);
  const element = tag === '' ? new DocumentFragment() : document.createElement(tag);
  Object.entries(props || {}).forEach(([name, value]) => {
    if (name.startsWith('on') && name.toLowerCase() in window) {
      element.addEventListener(
        name.toLowerCase().substr(2),
        /** @type {Function} */
        value,
      );
    } else {
      try {
        if (!(element instanceof DocumentFragment)) {
          // Boolean attributes are considered to be true if they're present on the element at all, regardless of their actual value
          // https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute#example
          if (['disabled', 'checked'].includes(name) && !value) {
            element.removeAttribute(name);
          } else {
            element.setAttribute(name, value);
          }
        }
      } catch (e) {
        console.error('createElement caught', e, 'on', element);
      }
    }
  });

  children.filter(child => child).forEach(child => appendChild(element, child));

  return element;
};

/**
 * Appends child elements from an unbound array of children, recursively
 * @param parent
 * @param child
 */
const appendChild = (parent, child) => {
  if (Array.isArray(child)) {
    child.forEach(subChild => appendChild(parent, subChild));
  } else {
    parent.appendChild(child.nodeType ? child : document.createTextNode(child.toString()));
  }
};

/**
 * Creates Fragment. Implements jsx-parser's createFragment API
 * @param props - effectively a placeholder, fragment never has any properties
 * @param children - child elements
 * @returns {DocumentFragment}
 */
export const createFragment = (props, ...children) => createElement('', props, ...children);
