/** @jsx createElement */
/*** @jsxFrag createFragment */
import { createElement } from '../framework/element';
import { std } from './SearchByCity.css';

function SearchByCity() {
  return (
    <input
      class={std}
      type="text"
      value={window.dataStore.currentCity}
      onChange={e => window.performSearch(e.target.value)}
    />
  );
}

export default SearchByCity;
