/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import SearchByCity from './SearchByCity';
import WeatherResults from './WeatherResults';
import Checkbox from './Checkbox';
import Select from './Select';

export default function App() {
  const selectOptions = [
    { value: 1, label: 'one' },
    { value: 2, label: 'two' },
    { value: 3, label: 'three' },
    {
      value: 'group',
      label: 'optgtoup',
      options: [
        { value: 4 },
        { value: 5, label: 'five' },
        { value: 10, label: 'disabled', disabled: true },
      ],
    },
    {
      label: 'disabled',
      disabled: true,
      options: [{ value: 6 }, { value: 7, label: 'seven' }],
    },
    { value: 8, label: 'eight', disabled: false },
    { value: 89, label: 'nine', disabled: true },
  ];

  return (
    <>
      <SearchByCity />
      <Select
        label="Select example"
        id="test"
        isMultiple
        size={5}
        name="example"
        isRequired
        selectedOption={5}
        options={selectOptions}
      />
      <Checkbox
        label="next days forecast - at noon only"
        onChange={e => setForecastPeriodicity(e.target.value)}
      />
      <WeatherResults />
    </>
  );
}

function setForecastPeriodicity(isAtNoonOnly) {
  window.dataStore.isAtNoonOnly = isAtNoonOnly;
}
