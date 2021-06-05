import { current } from '../framework';
import { isFunction } from '../utils';

/**
 * @typedef {Object} Context
 * @property {*} Provider - Provider
 * @property {*} Consumer - Consumer
 */

/**
 * Creates Context object with Provider and Consumer
 * @param {*} defaultValue - defaultValue of created context
 * @returns {Context} context object
 */
export function createContext(defaultValue) {
  const context = {
    value: defaultValue,
    Provider: null,
    Consumer: null,
  };

  let hasWarnedAboutUsingUseContext = false;

  context.Provider = function ({ value = defaultValue, children }) {
    if (!Object.is(context.value, value)) {
      current.shouldReRender = true;
      context.value = value;
    }
    return children;
  };

  context.Consumer = function ({ children }) {
    const [renderFunction] = children;
    if (!isFunction(renderFunction)) {
      !hasWarnedAboutUsingUseContext &&
        console.warn(
          'Requires a function as a child.',
          '\n',
          'The function receives the current context value and returns a node.',
          '\n',
          'Or use useContext(Context) inside your component.',
        );
      hasWarnedAboutUsingUseContext = true;
      return children;
    }
    return renderFunction(context.value);
  };

  return context;
}
