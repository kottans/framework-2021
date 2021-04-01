import { allowedCities, getOpenWeatherMapUrl } from './openWeatherMapAPI';

export function getCurrentCityData() {
  const { currentCity, cityByWeather } = window.dataStore;
  return cityByWeather[currentCity];
}

export function isCurrentCityDataLoaded() {
  const { currentCity, cityByWeather } = window.dataStore;
  return cityByWeather.hasOwnProperty(currentCity);
}

export function validateAndLoadData() {
  const { currentCity } = window.dataStore;

  if (!allowedCities.includes(currentCity)) {
    const error = `Enter one of the city names: ${allowedCities.join(', ')}.`;
    return Promise.resolve({ error });
  }

  if (!isCurrentCityDataLoaded()) {
    const url = getOpenWeatherMapUrl(currentCity);
    return fetch(url)
      .then(response => response.json())
      .then(data => ({ data }));
  }

  // no errors and no new data loaded, app will take data from cache
  return Promise.resolve({});
}

export function performSearch(cityName) {
  window.dataStore.currentCity = cityName;
  window.dataStore.error = null;
  window.dataStore.isDataLoading = true;

  window
    .validateAndLoadData()
    .then(({ error, data }) => {
      window.dataStore.isDataLoading = false;

      if (error) {
        window.dataStore.error = error;
      } else if (data) {
        window.dataStore.cityByWeather[cityName] = data;
      }
    })
    .catch(() => {
      window.dataStore.error = 'Some error occurred.';
    })
    .finally(window.renderApp);
}
