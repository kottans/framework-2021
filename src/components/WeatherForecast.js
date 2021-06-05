import React from 'react';
import { useAppContext, useUnitsContext } from '../context';
import { getAdaptedWeatherData } from '../data/openWeatherMapAPI';
import WeatherForecastItem from './WeatherForecastItem';

function WeatherForecast() {
  const { forecast, currentCity } = useAppContext();
  const currentUnits = useUnitsContext();
  if (!forecast) return null;

  return (
    <>
      <div>Weather forecast for {currentCity}:</div>
      {forecast.map(item => (
        <WeatherForecastItem
          key={item.dt}
          {...getAdaptedWeatherData(item, currentUnits)}
          shouldShowDate={true}
          shouldShowTime={true}
        />
      ))}
    </>
  );
}

export default WeatherForecast;
