/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, useContext } from '../framework';
import { getAdaptedWeatherData } from '../data/openWeatherMapAPI';
import WeatherForecastItem from './WeatherForecastItem';
import { AppContext } from './App';

function WeatherToday({ currentUnits, currentCity }) {
  const { today } = useContext(AppContext);
  if (!today) return null;

  return (
    <>
      <div>Weather for today in {currentCity}:</div>
      {today.map(item => (
        <WeatherForecastItem {...getAdaptedWeatherData(item, currentUnits)} shouldShowTime={true} />
      ))}
    </>
  );
}

export default WeatherToday;
