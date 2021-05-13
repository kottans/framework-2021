/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import SearchByCity from './SearchByCity';
import WeatherResults from './WeatherResults';

function App() {
  return (
    <>
      <SearchByCity />
      <WeatherResults />
    </>
  );
}

export default App;
