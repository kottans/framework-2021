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

export function getDateFromUnixTimestamp(dt) {
  return new Date(dt * 1000).toLocaleDateString();
}

export function getIconFromCode(iconCode) {
  return `<img src="http://openweathermap.org/img/wn/${iconCode}@2x.png" width="30px" height="30px" alt="weather icon">`;
}

export const cityCoordinates = {
  London: {
    lat: 51.5085,
    lon: -0.1257,
  },
  Kyiv: {
    lat: 50.4333,
    lon: 30.5167,
  },
  Warsaw: {
    lat: 52.2298,
    lon: 21.0118,
  },
  Paris: {
    lat: 48.8534,
    lon: 2.3488,
  },
};

export const allowedCities = Object.keys(cityCoordinates);

export function getOpenWeatherMapUrl(cityName) {
  const { lat, lon } = cityCoordinates[cityName];
  return `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`;
}
