/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import { getAdaptedWeatherData } from '../data/openWeatherMapAPI';
import WeatherForecastItem from './WeatherForecastItem';

function WeatherForecast({ weatherData, currentUnits, currentCity }) {
  return (
    <>
      <div>Weather forecast for {currentCity}:</div>
      {weatherData.map(item => (
        <WeatherForecastItem
          {...getAdaptedWeatherData(item, currentUnits)}
          shouldShowDate={true}
          shouldShowTime={true}
        />
      ))}
    </>
  );
}

export default WeatherForecast;
