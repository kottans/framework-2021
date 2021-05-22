/** @jsx createElement */
/** @jsxFrag createFragment */

import { createElement } from '../../framework/element';
import Option from './Option';

/**
 * Creates option element.
 * @param {string} label - string; value is used as an option UI representation visible to a user;
 * @param {boolean} disabled: optional, boolean; if defined then current object will be disabled
 * @param {boolean} selectedOption: optional, boolean; if defined then current object will be selected
 * @param {array} options: array of option objects or array of values, index is used as an option id (option value attribute) and array element itself as an option UI representation visible to a user
 */

export default function Optgroup({ label, disabled = null, selectedOption = null, options }) {
  return (
    <optgroup label={label} disabled={disabled}>
      {options.map(groupOption => (
        <Option
          value={groupOption.value}
          label={groupOption.label ? groupOption.label : groupOption.value}
          selected={groupOption.value === selectedOption}
          disabled={groupOption.disabled}
        />
      ))}
    </optgroup>
  );
}
