import { getIconFromCode } from '../data/openWeatherMapAPI';
import { getCurrentCityData, isCurrentCityDataLoaded } from '../data/weatherData';
import { displayInUnits, getDateFromUnixTimestamp } from '../utils';
import UnitSwitch from './UnitSwitch';

function setCurrentUnits(value) {
  window.dataStore.currentUnits = value;
  window.renderApp();
}

function WeatherResults() {
  const { isDataLoading, currentUnits, error, currentCity } = window.dataStore;
  let content = '';
  if (currentCity === '') {
    content = 'Search by city name';
  } else {
    if (isDataLoading) {
      content = 'Loading...';
    }

    if (error !== null) {
      content = error;
    }

    if (isCurrentCityDataLoaded()) {
      content = `
       ${UnitSwitch(currentUnits, setCurrentUnits)}
       <br/>
       ${WeatherToday()}
       <br/>
       ${WeatherForecast()}
    `;
    }
  }

  return `<p>${content}</p>`;
}

function WeatherToday() {
  const { currentCity, currentUnits } = window.dataStore;
  const weatherData = getCurrentCityData();
  let content = '';

  if (weatherData) {
    const {
      current: {
        dt,
        temp,
        weather: [{ main, description, icon }],
      },
    } = weatherData;
    const tempInUnits = displayInUnits(temp, currentUnits);
    const dateString = getDateFromUnixTimestamp(dt);
    const weatherIcon = getIconFromCode(icon);
    content += `<div>Weather for ${dateString} in ${currentCity}:</div>`;
    content += `<div>${weatherIcon} ${main} (${description}). Temperature is ${tempInUnits}</div>`;
  }

  return content ? `<div>${content}</div>` : '';
}

function WeatherForecast() {
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

function WeatherForecastItem({
  dateString,
  dayTempInUnits,
  description,
  main,
  nightTempInUnits,
  weatherIcon,
}) {
  return `<div>For ${dateString}, ${weatherIcon} ${main} (${description}). Day at ${dayTempInUnits}, night at ${nightTempInUnits}</div>`;
}

export default WeatherResults;
