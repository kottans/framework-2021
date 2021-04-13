/** @jsx createElement */
/*** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework';
import WeatherForecastItem from './WeatherForecastItem';
import { getForecastData } from '../utils';

function WeatherForecast({ weatherData: { list } = {}, currentUnits, currentCity }) {
  if (!list) return null;

  return (
    <div>
      <div>Weather forecast for {currentCity}:</div>
      {list.map(item => (
        <WeatherForecastItem {...getForecastData(item, currentUnits)} />
      ))}
    </div>
  );
}

export default WeatherForecast;
