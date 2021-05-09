/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, useState } from '../framework';
import { CELSIUS_UNITS } from '../utils';
import { UnitsContext } from '../context';

import UnitSwitch from './UnitSwitch';
import WeatherToday from './WeatherToday';
import WeatherForecast from './WeatherForecast';

function WeatherResults({ isLoading, error, currentCity }) {
  const [currentUnits, setCurrentUnits] = useState(CELSIUS_UNITS);

  if (!currentCity) {
    return <div>Search by city name</div>;
  }

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
        <WeatherToday currentCity={currentCity} />
        <br />
        <br />
        <WeatherForecast currentCity={currentCity} />
      </UnitsContext.Provider>
    </>
  );
}

export default WeatherResults;
