/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework';
import { useAppContext } from '../context';
import { getAdaptedWeatherData } from '../data/openWeatherMapAPI';
import WeatherForecastItem from './WeatherForecastItem';
import { AppContext } from './App';

function WeatherForecast({ currentUnits, currentCity }) {
  const { forecast } = useAppContext();
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
