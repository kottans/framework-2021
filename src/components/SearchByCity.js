/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';

export default function SearchByCity() {
  return (
    <input
      type="text"
      value={window.dataStore.currentCity}
      onchange={e => window.performSearch(e.target.value)}
    />
  );
}
