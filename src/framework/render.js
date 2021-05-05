/** @jsx createElement */
/*** @jsxFrag createFragment */
import { createElement } from './element';
import { current } from './hooks';

/**
 * Renders a component and attaches it to the target DOM element
 * @param Component - function or class
 * @param target - DOM element to attach component to
 */

let intervalID;
const RERENDER_FREQUENCY = 300;

export function render(Component, target) {
  intervalID = setInterval(() => {
    if (current.shouldReRender) {
      current.shouldReRender = false;
      target.replaceChildren(<Component />);
    }
  }, RERENDER_FREQUENCY);
}

window.onbeforeunload = () => clearInterval(intervalID);

export default render;
