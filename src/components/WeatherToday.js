import React from 'react';
import { useAppContext, useUnitsContext } from '../context';
import { getAdaptedWeatherData } from '../data/openWeatherMapAPI';
import WeatherForecastItem from './WeatherForecastItem';

function WeatherToday() {
  const { today, currentCity } = useAppContext();
  const currentUnits = useUnitsContext();
  if (!today) return null;

  return (
    <>
      <div>Weather for today in {currentCity}:</div>
      {today.map(item => (
        <WeatherForecastItem
          key={item.dt}
          {...getAdaptedWeatherData(item, currentUnits)}
          shouldShowTime={true}
        />
      ))}
    </>
  );
}

export default WeatherToday;
