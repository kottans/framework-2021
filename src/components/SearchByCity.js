/** @jsx createElement */
/*** @jsxFrag createFragment */
import { createElement } from '../framework';

function SearchByCity({ value, onChange }) {
  return <input type="text" value={value} onChange={onChange} />;
}

export default SearchByCity;
