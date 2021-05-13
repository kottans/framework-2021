/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../framework/element';

function SearchByCity() {
  return (
    <input
      type="text"
      value={window.dataStore.currentCity}
      onChange={e => window.performSearch(e.target.value)}
    />
  );
}

export default SearchByCity;
