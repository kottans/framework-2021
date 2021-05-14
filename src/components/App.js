/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import SearchByCity from './SearchByCity';
import WeatherResults from './WeatherResults';
import Checkbox from './Checkbox';

export default function App() {
  return (
    <>
      <SearchByCity />
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
