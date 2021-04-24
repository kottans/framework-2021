import {
  allowedCities,
  CELSIUS_UNITS,
  displayInUnits,
  FAHRENHEIT_UNITS,
  getDateFromUnixTimestamp,
  getIconFromCode,
  getOpenWeatherMapUrl,
} from './utils';

if (module.hot) {
  module.hot.accept();
}

window.dataStore = {
  currentCity: '',
  isDataLoading: false,
  error: null,
  cityByWeather: {},
  currentUnits: CELSIUS_UNITS,
};

window.renderApp = renderApp;
window.performSearch = performSearch;
window.validateAndLoadData = validateAndLoadData;

const setCurrentUnits = function (value) {
  window.dataStore.currentUnits = value;
  window.renderApp();
};

function isCurrentCityDataLoaded() {
  return Boolean(getCurrentCityData());
}

function validateAndLoadData() {
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

function performSearch(cityName) {
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

renderApp();

function renderApp() {
  document.getElementById('app-root').innerHTML = `
        ${App()}
    `;
}

function WeatherResults() {
  const { currentCity, isDataLoading, error, currentUnits } = window.dataStore;

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

  // console.log({ content });
  return `<p>${content}</p>`;
}

function App() {
  return `<div>
   ${SearchByCity()}
   ${WeatherResults()}
  </div>`;
}

function UnitSwitch(currentUnits, setCurrentUnitsCB) {
  return `
    <p>Select units</p>
  ${[
    { id: 'celsius-units', value: CELSIUS_UNITS, name: 'C' },
    { id: 'fahrenheit-units', value: FAHRENHEIT_UNITS, name: 'F' },
  ]
    .map(
      ({ id, value, name }) =>
        `<div>
          <input 
              type="radio" 
              id="${id}"
              name="temperature-units" 
              value="${value}" 
              ${currentUnits === value ? ' checked ' : ''} 
              onchange="(${setCurrentUnitsCB})(this.value);"
          >
            <label for="${id}">˚${name}</label>
        </div>`,
    )
    .join('')}
`;
}

function SearchByCity() {
  return `
    <input
        type="text"
        value="${window.dataStore.currentCity}"
        onchange="window.performSearch(this.value);" 
    />
  `;
}

function getCurrentCityData() {
  const { currentCity, cityByWeather } = window.dataStore;
  return cityByWeather[currentCity];
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
