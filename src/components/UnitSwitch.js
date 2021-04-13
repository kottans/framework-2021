/** @jsx createElement */
/*** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework';
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
        <div>
          <input
            type="radio"
            id={id}
            name="temperature-units"
            value={value}
            checked={currentUnits === value}
            onChange={setCurrentUnits}
          />
          <label For={id}>˚{name}</label>
        </div>
      ))}
    </>
  );
}

export default UnitSwitch;
