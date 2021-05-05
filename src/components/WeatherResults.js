/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, useState } from '../framework';
import { CELSIUS_UNITS } from '../utils';

import UnitSwitch from './UnitSwitch';
import WeatherToday from './WeatherToday';
import WeatherForecast from './WeatherForecast';
import { getFilteredByDateWeatherData } from '../data/weatherData';

function WeatherResults({ isLoading, error, currentCity, weatherData: cityByWeather }) {
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

  const weatherData = cityByWeather?.list;
  const weatherTodayData = getFilteredByDateWeatherData(weatherData, { includeBaseDate: true });
  const weatherForecastData = getFilteredByDateWeatherData(weatherData, {
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
