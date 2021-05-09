import { getCurrentCityData } from '../data/weatherData';
import { displayInUnits, getDateFromUnixTimestamp } from '../utils';
import { getIconFromCode } from '../data/openWeatherMapAPI';
import WeatherForecastItem from './WeatherForecastItem';

export default function WeatherForecast() {
  const { currentCity, currentUnits } = window.dataStore;
  const weatherData = getCurrentCityData();
  let content = '';

  function getPreparedForecastData({
    dt,
    temp: { day, night },
    weather: [{ main, description, icon }],
  }) {
    const dateString = getDateFromUnixTimestamp(dt);
    const dayTempInUnits = displayInUnits(day, currentUnits);
    const nightTempInUnits = displayInUnits(night, currentUnits);
    const weatherIcon = getIconFromCode(icon);

    return {
      dateString,
      dayTempInUnits,
      description,
      main,
      nightTempInUnits,
      weatherIcon,
    };
  }

  if (weatherData) {
    content += `<div>Weather forecast for ${currentCity}:</div>`;
    const {
      daily: [, ...forecastData],
    } = weatherData;
    const forecastItems = forecastData.map(forecastDataItem => {
      const preparedForecastDataItem = getPreparedForecastData(forecastDataItem);
      return WeatherForecastItem(preparedForecastDataItem);
    });
    content += forecastItems.join('');
  }

  return content ? `<div>${content}</div>` : '';
}
