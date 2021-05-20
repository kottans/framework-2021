/**
 * Creates select element.
 * @param {string} label - optional, default is null
 * @param {string} id - must have if label not null, default is null
 * @param {boolean} isMultiple: optional, default is false; ; shouldn't be rendered if false
 * @param {string} name: optional, default is null; shouldn't be rendered if null
 * @param {boolean} isRequired: optional, default is false; shouldn't be rendered if null
 * @param {number} size: optional, default is 0
 * @param {array} options: array of option objects (see advanced option object spec below) or array of values, index is used as an option id (option value attribute) and array element itself as an option UI representation visible to a user
 * @param {number} selectedOption: option index, default is null
 * @param {function} onChange: optional, that expects selected option id (value) as an argument
 */

/** @jsx createElement */
/** @jsxFrag createFragment */

import { createElement, createFragment } from '../../framework/element';
export default function Select({
  label = null,
  id = null,
  isMultiple = false,
  name = null,
  isRequired = false,
  size = 0,
  options = [],
  selectedOption = null,
  onChange = null,
}) {
  if (options.length === 0) return null;
  options = options.map((option, index) => {
    if (typeof option === 'string') {
      return (
        <option value={index} selected={index === selectedOption}>
          {option}
        </option>
      );
    } else if (typeof option === 'object') {
      if (option.options) {
        return (
          <optgroup label={option.label ? option.label : option.value} disabled={option.disabled}>
            {option.options.map(groupOption => (
              <option
                value={groupOption.value}
                selected={groupOption.value === selectedOption}
                disabled={groupOption.disabled}
              >
                {groupOption.label ? groupOption.label : groupOption.value}
              </option>
            ))}
          </optgroup>
        );
      } else {
        return (
          <option
            value={option.value}
            selected={option.value === selectedOption}
            disabled={option.disabled}
          >
            {option.label ? option.label : option.value}
          </option>
        );
      }
    }
  });
  return (
    <>
      {label ? <label for={id}>{label}:</label> : ''}
      <select
        id={id}
        multiple={isMultiple}
        name={name}
        required={isRequired}
        size={size}
        onChange={onChange}
      >
        {options}
      </select>
    </>
  );
}
