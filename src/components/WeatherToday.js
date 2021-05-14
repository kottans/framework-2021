/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import { getAdaptedWeatherData } from '../data/openWeatherMapAPI';
import WeatherForecastItem from './WeatherForecastItem';

function WeatherToday({ weatherData, currentUnits, currentCity }) {
  if (!weatherData) return null;

  return (
    <>
      <div>Weather for today in {currentCity}:</div>
      {weatherData.map(item => (
        <WeatherForecastItem {...getAdaptedWeatherData(item, currentUnits)} shouldShowTime={true} />
      ))}
    </>
  );
}

export default WeatherToday;
