/** @jsx createElement */
/*** @jsxFrag createFragment */
import { createElement, createFragment, useState } from '../framework';
import UnitSwitch from './UnitSwitch';
import WeatherToday from './WeatherToday';
import WeatherForecast from './WeatherForecast';
import { CELSIUS_UNITS } from '../utils';

function WeatherResults({ isLoading, error, currentCity, weatherData }) {
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

  const handleUnitsChange = ({ target: { value } }) => setCurrentUnits(() => value);

  return (
    <>
      <UnitSwitch currentUnits={currentUnits} setCurrentUnits={handleUnitsChange} />
      <br />
      <WeatherToday
        currentUnits={currentUnits}
        currentCity={currentCity}
        weatherData={weatherData}
      />
      <br />
      <WeatherForecast
        currentUnits={currentUnits}
        currentCity={currentCity}
        weatherData={weatherData}
      />
    </>
  );
}

export default WeatherResults;
