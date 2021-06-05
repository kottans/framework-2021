import React from 'react';

function SearchByCity({ value, onBlur }) {
  return <input type="text" defaultValue={value} onBlur={event => onBlur(event.target.value)} />;
}

export default SearchByCity;
