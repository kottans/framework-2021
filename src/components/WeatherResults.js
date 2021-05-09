/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, useState } from '../framework';
import { getFilteredByDateWeatherData } from '../data/weatherData';
import UnitSwitch from './UnitSwitch';
import { CELSIUS_UNITS } from '../utils';
import WeatherToday from './WeatherToday';
import WeatherForecast from './WeatherForecast';

function WeatherResults({ isLoading, error, currentCity, weatherData: { list } }) {
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

  const weatherTodayData = getFilteredByDateWeatherData(list, { includeBaseDate: true });
  const weatherForecastData = getFilteredByDateWeatherData(list, {
    includeDatesAfterBase: true,
  });
  return (
    <>
      <UnitSwitch currentUnits={currentUnits} setCurrentUnits={setCurrentUnits} />
      <br />
      <WeatherToday
        currentUnits={currentUnits}
        currentCity={currentCity}
        weatherData={weatherTodayData}
      />
      <br />
      <br />
      <WeatherForecast
        currentUnits={currentUnits}
        currentCity={currentCity}
        weatherData={weatherForecastData}
      />
    </>
  );
}

export default WeatherResults;
