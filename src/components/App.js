/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import SearchByCity from './SearchByCity';
import WeatherResults from './WeatherResults';

export default function App() {
  return (
    <>
      <SearchByCity />
      <WeatherResults />
    </>
  );
}
