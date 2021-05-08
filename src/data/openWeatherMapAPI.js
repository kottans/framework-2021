import {
  displayInUnits,
  getDateTimeFromUnixTimestamp,
  getWeatherFormattedDate,
  getWeatherFormattedTime,
} from '../utils';

export function getOpenWeatherMapUrl(cityName) {
  return `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`;
}

const dataStorage = {};

export function loadOpenWeatherMapData(currentCity) {
  const currentCityData = dataStorage[currentCity];

  if (currentCityData) return currentCityData;

  const url = getOpenWeatherMapUrl(currentCity);

  return fetch(url).then(response => {
    const result = response.json();
    dataStorage[currentCity] = result;
    return result;
  });
}

export function getIconPropertiesFromCode(iconCode) {
  return {
    src: `http://openweathermap.org/img/wn/${iconCode}@2x.png`,
    width: '30px',
    height: '30px',
    alt: 'weather icon',
  };
}

export function getAdaptedWeatherData(
  { dt, main: { feels_like, temp }, weather: [{ main, description, icon }] },
  currentUnits,
) {
  return {
    formattedDate: getWeatherFormattedDate(dt),
    formattedTime: getWeatherFormattedTime(dt),
    dateTime: getDateTimeFromUnixTimestamp(dt),
    description,
    feelsLikeInUnits: displayInUnits(feels_like, currentUnits),
    main,
    tempInUnits: displayInUnits(temp, currentUnits),
    weatherIconProps: getIconPropertiesFromCode(icon),
  };
}
