/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, useContext } from '../framework';
import { getAdaptedWeatherData } from '../data/openWeatherMapAPI';
import WeatherForecastItem from './WeatherForecastItem';
import { AppContext } from './App';

function WeatherForecast({ currentUnits, currentCity }) {
  const { forecast } = useContext(AppContext);
  if (!forecast) return null;

  return (
    <>
      <div>Weather forecast for {currentCity}:</div>
      {forecast.map(item => (
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
