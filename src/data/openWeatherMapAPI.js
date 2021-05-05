import {
  displayInUnits,
  getDateTimeFromUnixTimestamp,
  getWeatherFormattedDate,
  getWeatherFormattedTime,
} from '../utils';

export function getOpenWeatherMapUrl(cityName) {
  return `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`;
}

export function loadOpenWeatherMapData(currentCity) {
  const url = getOpenWeatherMapUrl(currentCity);
  return fetch(url).then(response => response.json());
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
