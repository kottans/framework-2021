/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import SearchByCity from './SearchByCity';
import WeatherResults from './WeatherResults';
import Checkbox from './Checkbox';
import Select from './Select/Select';

export default function App() {
  return (
    <>
      <SearchByCity />
      <Select
        label="Select"
        id="test"
        isMultiple={false}
        name="example"
        isRequired={false}
        options={['one', 'two', 'three']}
        selectedOption={1}
        onChange={null}
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
