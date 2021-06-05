import React from 'react';
import { CELSIUS_UNITS, FAHRENHEIT_UNITS, KELVIN_UNITS } from '../utils';

const UNITS = [
  { id: 'celsius-units', value: CELSIUS_UNITS, name: 'C' },
  { id: 'fahrenheit-units', value: FAHRENHEIT_UNITS, name: 'F' },
  { id: 'kelvin-units', value: KELVIN_UNITS, name: 'K' },
];

function UnitSwitch({ currentUnits, setCurrentUnits }) {
  return (
    <>
      <p>Select units</p>
      {UNITS.map(({ id, value, name }) => (
        <div key={id}>
          <input
            type="radio"
            id={id}
            name="temperature-units"
            value={value}
            checked={currentUnits === value}
            onChange={event => setCurrentUnits(event.target.value)}
          />
          <label htmlFor={id}>˚{name}</label>
        </div>
      ))}
    </>
  );
}

export default UnitSwitch;
