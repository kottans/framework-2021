/** @jsx createElement */
/** @jsxFrag createFragment */

import { createElement, createFragment } from '../../framework/element';

/**
 * Creates select element.
 * @param {string} label - optional, default is null
 * @param {string} id - must have if label not null, default is null
 * @param {boolean} isMultiple: optional, default is false; ; shouldn't be rendered if false
 * @param {string} name: optional, default is null; shouldn't be rendered if null
 * @param {boolean} isRequired: optional, default is false; shouldn't be rendered if null
 * @param {number} size: optional, default is 0
 * @param {array} options: array of option objects (see option object spec below) or array of values, index is used as an option id (option value attribute) and array element itself as an option UI representation visible to a user
 * @param {number} selectedOption: option index, default is null
 * @param {function} onChange: optional, that expects selected option id (value) as an argument
 * @param {boolean} disabled: optional, default is false; ; shouldn't be rendered if false
 */

/*
  Each option object has the following properties:
  value: string; used as text if label property is not defined or falsy, or as optgroup label if object has options property defined
  label: optional, string; if not defined or null or undefined then value is used as an option UI representation visible to a user; ignored when the object represents an optgroup
  options: optional, array of option objects; if defined then current object is used to render an optgroup
  disabled: optional, boolean; if defined then current object will be disabled
*/

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
  disabled = false,
}) {
  if (options.length === 0) return null;
  options = options.map((option, index) => {
    if (typeof option === 'string') {
      return <Option value={index} label={option} selected={index === selectedOption} />;
    } else if (typeof option === 'object') {
      if (option.options) {
        return (
          <Optgroup
            label={option.label ? option.label : option.value}
            disabled={option.disabled}
            selectedOption={selectedOption}
            options={option.options}
          />
        );
      } else {
        return (
          <Option
            value={option.value}
            label={option.label ? option.label : option.value}
            selected={option.value === selectedOption}
            disabled={option.disabled}
          />
        );
      }
    }
  });
  return (
    <>
      {label ? <label for={id}>{label}: </label> : ''}
      <select
        id={id}
        multiple={isMultiple}
        name={name}
        required={isRequired}
        size={size}
        onChange={onChange}
        disabled={disabled}
      >
        {options}
      </select>
    </>
  );
}

/**
 * Creates option element.
 * @param {string} value - string; used as text if label property is not defined or falsy, or as optgroup label if object has options property defined
 * @param {string} label - optional, string; if not defined or null or undefined then value is used as an option UI representation visible to a user;
 * @param {boolean} disabled: optional, boolean; if defined then current object will be disabled
 * @param {boolean} selected: optional, boolean; if defined then current object will be selected
 */

export function Option({ value, label = null, disabled = null, selected = null }) {
  return (
    <option value={value} selected={selected} disabled={disabled}>
      {label ? label : value}
    </option>
  );
}

/**
 * Creates optgroup element.
 * @param {string} label - string; value is used as an option UI representation visible to a user;
 * @param {boolean} disabled: optional, boolean; if defined then current object will be disabled
 * @param {boolean} selectedOption: optional, boolean; if defined then current object will be selected
 * @param {array} options: array of option objects or array of values, index is used as an option id (option value attribute) and array element itself as an option UI representation visible to a user
 */

export function Optgroup({ label, disabled = null, selectedOption = null, options }) {
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
