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

export function getIconFromCode(iconCode) {
  // TODO: extract UI presentation into a component
  return `<img src="http://openweathermap.org/img/wn/${iconCode}@2x.png" width="30px" height="30px" alt="weather icon">`;
}
