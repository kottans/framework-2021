/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import { performSearch } from '../data/weatherData';

export default function SearchByCity() {
  return (
    <input
      type="text"
      value={window.dataStore.currentCity}
      onchange={e => performSearch(e.target.value)}
    />
  );
}
