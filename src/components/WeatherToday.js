/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework';
import { useAppContext, useUnitsContext } from '../context';
import { getAdaptedWeatherData } from '../data/openWeatherMapAPI';
import WeatherForecastItem from './WeatherForecastItem';

function WeatherToday({ currentCity }) {
  const { today } = useAppContext();
  const currentUnits = useUnitsContext();
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
