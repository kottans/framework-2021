/**
 * Creates DOM Node. Implements jsx-parser's createElement API
 * @param {string|Function} tag - HTML tag as string or Component function
 * @param {object} props - element properties as parsed by jsx-parser
 * @param {Node[]} children - child elements
 * @returns {DocumentFragment|Element}
 */
/** @jsx createElement */
/*** @jsxFrag createFragment */
import { createFunctionElement } from './hooks';
import { isFunction } from '../utils';

export const createElement = (tag, props, ...children) => {
  if (isFunction(tag)) {
    /*
      Passing children as the 2nd argument is required as jsx transformer puts component functions
      and regular tags in wrapper functions that expect children as the 2nd param
     */
    return createFunctionElement(tag, props, children);
  }
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
