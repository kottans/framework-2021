/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, useState } from '../framework';
import { CELSIUS_UNITS } from '../utils';
import { UnitsContext } from '../context';

import UnitSwitch from './UnitSwitch';
import WeatherToday from './WeatherToday';
import WeatherForecast from './WeatherForecast';

function WeatherResults({ isLoading, error }) {
  const [currentUnits, setCurrentUnits] = useState(CELSIUS_UNITS);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <UnitSwitch currentUnits={currentUnits} setCurrentUnits={setCurrentUnits} />
      <br />
      <UnitsContext.Provider value={currentUnits}>
        <WeatherToday />
        <br />
        <br />
        <WeatherForecast />
      </UnitsContext.Provider>
    </>
  );
}

export default WeatherResults;
