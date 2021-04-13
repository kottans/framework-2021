/** @jsx createElement */
/*** @jsxFrag createFragment */
import { createElement } from './framework';
import { OPEN_WEATHER_MAP_API_KEY } from './secrets.template';

export const KELVIN_UNITS = 'K';
export const CELSIUS_UNITS = 'C';
export const FAHRENHEIT_UNITS = 'F';

export function getOpenWeatherMapUrl(cityName) {
  return `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${OPEN_WEATHER_MAP_API_KEY}&units=metric`;
}

export function displayInUnits(value, units) {
  switch (units) {
    case CELSIUS_UNITS:
      return `${Math.round(value)}˚C`;
    case FAHRENHEIT_UNITS:
      return `${Math.round(value * (9 / 5) + 32)}˚F`;
    // case KELVIN_UNITS:
    default:
      return `${Math.round(value + 273.15)}˚K`;
  }
}

export function getDateFromUnixTimestamp(dt) {
  return new Date(dt * 1000).toLocaleDateString();
}

export function getForecastData(
  { dt, main: { temp_max: day, temp_min: night }, weather: [{ main, description, icon }] },
  currentUnits,
) {
  return {
    main,
    description,
    dateString: getDateFromUnixTimestamp(dt),
    dayTempInUnits: displayInUnits(day, currentUnits),
    nightTempInUnits: displayInUnits(night, currentUnits),
    weatherIcon: <img {...getIconPropertiesFromCode(icon)} />,
  };
}

export function getIconPropertiesFromCode(iconCode) {
  return {
    src: `http://openweathermap.org/img/wn/${iconCode}@2x.png`,
    width: '30px',
    height: '30px',
    alt: 'weather icon',
  };
}

export function loadData(currentCity) {
  const url = getOpenWeatherMapUrl(currentCity);
  return fetch(url).then(response => response.json());
}

export const isFunction = func => typeof func === 'function';
