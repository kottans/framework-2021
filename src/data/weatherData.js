import { allowedCities, getOpenWeatherMapUrl } from './openWeatherMapAPI';

export function getCurrentCityData() {
  const { currentCity, cityByWeather } = window.dataStore;
  return cityByWeather[currentCity];
}

export function isCurrentCityDataLoaded() {
  return Boolean(getCurrentCityData());
}

export function validateAndLoadData() {
  const { currentCity } = window.dataStore;

  if (!allowedCities.includes(currentCity)) {
    const error = `Enter one of the city names: ${allowedCities.join(', ')}.`;
    return Promise.resolve({ error });
  }

  const url = getOpenWeatherMapUrl(currentCity);
  if (!isCurrentCityDataLoaded()) {
    return fetch(url)
      .then(response => response.json())
      .then(data => ({ data }));
  }

  return Promise.resolve({});
}

export function performSearch(cityName) {
  window.dataStore.currentCity = cityName;
  window.dataStore.error = null;
  window.dataStore.isDataLoading = true;
  window.renderApp();

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
