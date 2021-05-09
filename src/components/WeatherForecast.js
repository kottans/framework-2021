/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import { getAdaptedWeatherData } from '../data/openWeatherMapAPI';
import { useContext } from '../framework';
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
