/** @jsx createElement */
/** @jsxFrag createFragment */

import { createElement } from '../../framework/element';

/**
 * Creates option element.
 * @param {string} value - string; used as text if label property is not defined or falsy, or as optgroup label if object has options property defined
 * @param {string} label - optional, string; if not defined or null or undefined then value is used as an option UI representation visible to a user;
 * @param {boolean} disabled: optional, boolean; if defined then current object will be disabled
 * @param {boolean} selected: optional, boolean; if defined then current object will be selected
 */

export default function Option({ value, label = null, disabled = null, selected = null }) {
  return (
    <option value={value} selected={selected} disabled={disabled}>
      {label ? label : value}
    </option>
  );
}
