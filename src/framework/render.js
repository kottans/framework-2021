/** @jsx createElement */
/*** @jsxFrag createFragment */
import { createElement } from './element';

let Component, Target;

/**
 * Renders a component and attaches it to the target DOM element
 * @param componentFunction - Component function or class
 * @param target - DOM element to attach component to
 */
function renderApp(componentFunction = null, target = null) {
  // Memorize parameters to enable re-render when `renderApp` gets called without arguments
  if (componentFunction) Component = componentFunction;
  if (target) Target = target;
  Target.innerHTML = '';
  // Ensure that the component gets rebuilt
  Target.appendChild(<Component />);
}

export default renderApp;
