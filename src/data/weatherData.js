import renderApp from '../framework/render';
import { loadOpenWeatherMapData } from './openWeatherMapAPI';

export function getCurrentCityWeatherData() {
  const { currentCity, cityByWeather } = window.dataStore;
  // no ?. operator in parcel-bundler version used 😢
  return cityByWeather[currentCity] ? cityByWeather[currentCity].list : undefined;
}

export function isCurrentCityDataLoaded() {
  const { currentCity, cityByWeather } = window.dataStore;
  return cityByWeather.hasOwnProperty(currentCity);
}

export function validateAndLoadData() {
  const { currentCity } = window.dataStore;

  if (!isCurrentCityDataLoaded()) {
    return loadOpenWeatherMapData(currentCity).then(data => ({ data }));
  }

  // no errors and no new data loaded, app will take data from cache
  return Promise.resolve({});
}

export function performSearch(cityName) {
  window.dataStore.currentCity = cityName;
  window.dataStore.error = null;
  window.dataStore.isDataLoading = true;

  renderApp();
  window
    .validateAndLoadData()
    .then(({ error, data }) => {
      window.dataStore.isDataLoading = false;

      const errorFromAPI = data.code !== '200' && data.message;
      if (error || errorFromAPI) {
        // no ?? operator in parcel-bundler version used 😢
        window.dataStore.error = error || data.message;
      } else if (data) {
        window.dataStore.cityByWeather[cityName] = data;
      }
    })
    .catch(() => {
      window.dataStore.error = 'Some error occurred.';
    })
    .finally(renderApp);
}

export function getFilteredByDateWeatherData(
  weatherDataList,
  { includeDatesAfterBase = false, includeBaseDate = false, baseDate = new Date() },
) {
  const baseDateDay = baseDate.getDate();
  return weatherDataList.filter(({ dt }) => {
    const itemDate = new Date(dt * 1000);

    const itemDateDay = itemDate.getDate();
    const isToday = baseDateDay === itemDateDay;
    if (includeBaseDate && isToday) {
      return true;
    }

    return includeDatesAfterBase && baseDate < itemDate && !isToday;
  });
}
