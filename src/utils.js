export const KELVIN_UNITS = 'K';
export const CELSIUS_UNITS = 'C';
export const FAHRENHEIT_UNITS = 'F';

export function displayInUnits(value, units) {
  switch (units) {
    case CELSIUS_UNITS:
      return `${Math.round(value - 273.15)}˚C`;
    case FAHRENHEIT_UNITS:
      return `${Math.round((value - 273.15) * (9 / 5) + 32)}˚F`;
    // case KELVIN_UNITS:
    default:
      return `${value}˚K`;
  }
}

export function getWeatherFormattedDate(dt) {
  const date = new Date(dt * 1000);
  const formatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat(undefined, formatOptions).format(date);
}

export function getWeatherFormattedTime(dt) {
  const date = new Date(dt * 1000);
  const formatOptions = {
    hour: 'numeric',
    minute: 'numeric',
  };
  return new Intl.DateTimeFormat(undefined, formatOptions).format(date);
}

export function getDateTimeFromUnixTimestamp(dt) {
  const date = new Date(dt * 1000);
  const formatOptions = {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  return new Intl.DateTimeFormat('en-GB', formatOptions).format(date);
}

export const isFunction = func => typeof func === 'function';
