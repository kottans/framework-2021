/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import { CELSIUS_UNITS, FAHRENHEIT_UNITS } from '../utils';

function UnitSwitch({ currentUnits, setCurrentUnitsCB }) {
  return (
    <>
      <p>Select units</p>
      {[
        { id: 'celsius-units', value: CELSIUS_UNITS, name: 'C' },
        { id: 'fahrenheit-units', value: FAHRENHEIT_UNITS, name: 'F' },
      ].map(({ id, value, name }) => (
        <div>
          <input
            type="radio"
            id={id}
            name="temperature-units"
            value={value}
            checked={currentUnits === value}
            onChange={event => setCurrentUnitsCB(event.target.value)}
          />
          <label For={id}>˚{name}</label>
        </div>
      ))}
    </>
  );
}

export default UnitSwitch;
