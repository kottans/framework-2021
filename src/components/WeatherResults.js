/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, useState } from '../framework';
import { CELSIUS_UNITS } from '../utils';

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
      <WeatherToday currentUnits={currentUnits} currentCity={currentCity} />
      <br />
      <br />
      <WeatherForecast currentUnits={currentUnits} currentCity={currentCity} />
    </>
  );
}

export default WeatherResults;
