/**
 * Creates DOM Node. Implements jsx-parser's createElement API
 * @param {string|Function} tag - HTML tag as string or Component function
 * @param {object} props - element properties as parsed by jsx-parser
 * @param {Node[]} children - child elements
 * @returns {DocumentFragment|Element}
 */
export const createElement = (tag, props, ...children) => {
  if (typeof tag === 'function') {
    /*
      Passing children as the 2nd argument is required as jsx transformer puts component functions
      and regular tags in wrapper functions that expect children as the 2nd param
     */
    return tag({ ...props, children }, children);
  }
  const element = tag === '' ? new DocumentFragment() : document.createElement(tag);
  Object.entries(props || {}).forEach(([name, value]) => {
    if (name.startsWith('on') && name.toLowerCase() in window && value !== null) {
      element.addEventListener(
        name.toLowerCase().substr(2),
        /** @type {Function} */
        value,
      );
    } else {
      try {
        if (!(element instanceof DocumentFragment) && value !== null) {
          // Boolean attributes are considered to be true if they're present on the element at all, regardless of their actual value
          // https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute#example
          if (
            ['disabled', 'checked', 'multiple', 'selected', 'required'].includes(name) &&
            !value
          ) {
            element.removeAttribute(name);
          } else if (name.toLowerCase() === 'classname') {
            // We want to treat both strings and arrays in a similar manner
            const classList = typeof value === 'string' ? value.split(' ').filter(Boolean) : value;
            element.classList.add(...classList);
          } else {
            element.setAttribute(
              name,
              /** @type {string} */
              value,
            );
          }
        }
      } catch (e) {
        console.error('createElement caught', e, 'on', element);
      }
    }
  });

  children.forEach(child => appendChild(element, child));

  return element;
};

/**
 * Appends child elements from an unbound array of children, recursively
 * @param {Node} parent
 * @param {Node|[Node]} child
 */
const appendChild = (parent, child) => {
  if (Array.isArray(child)) {
    child.forEach(subChild => appendChild(parent, subChild));
  } else {
    // Skip null and undefined
    if (child != null) {
      parent.appendChild(child.nodeType ? child : document.createTextNode(child.toString()));
    }
  }
};

/**
 * Creates Fragment. Implements jsx-parser's createFragment API
 * @param {object} props - effectively a placeholder, fragment never has any properties
 * @param {Node[]} children - child elements
 * @returns {DocumentFragment}
 */
export const createFragment = (props, ...children) => createElement('', props, ...children);
