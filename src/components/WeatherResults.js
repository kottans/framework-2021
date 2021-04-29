/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import renderApp from '../framework/render';

import UnitSwitch from './UnitSwitch';
import WeatherToday from './WeatherToday';
import WeatherForecast from './WeatherForecast';
import {
  getCurrentCityWeatherData,
  getFilteredByDateWeatherData,
  isCurrentCityDataLoaded,
} from '../data/weatherData';

function setCurrentUnits(value) {
  window.dataStore.currentUnits = value;
  renderApp();
}

function WeatherResults() {
  const { isDataLoading, currentUnits, error, currentCity } = window.dataStore;
  let content = null;

  if (currentCity === '') {
    content = 'Search by city name';
  } else {
    if (error !== null) {
      content = error;
    }

    if (isDataLoading) {
      content = 'Loading...';
    }

    if (isCurrentCityDataLoaded()) {
      const weatherData = getCurrentCityWeatherData();
      const weatherTodayData = getFilteredByDateWeatherData(weatherData, { includeBaseDate: true });
      const weatherForecastData = getFilteredByDateWeatherData(weatherData, {
        includeDatesAfterBase: true,
      });
      content = (
        <>
          <UnitSwitch currentUnits={currentUnits} setCurrentUnitsCB={setCurrentUnits} />
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
  }

  return <p>{content}</p>;
}

export default WeatherResults;
