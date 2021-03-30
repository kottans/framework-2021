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

window.dataStore = window.dataStore || {
  currentCity: '',
  isDataLoading: false,
  error: null,
  cityByWeather: {},
  currentUnits: CELSIUS_UNITS,
};

window.renderApp = renderApp;
window.loadData = loadData;
window.reRenderApp = reRenderApp;

function setCurrentUnits(value) {
  window.dataStore.currentUnits = value;
  reRenderApp();
}

function setCurrentCityData(data) {
  const { currentCity } = window.dataStore;
  window.dataStore.cityByWeather[currentCity] = data;
  reRenderApp();
}

function getCurrentCityData() {
  const { currentCity, cityByWeather } = window.dataStore;
  return cityByWeather[currentCity];
}

function isCurrentCityDataLoaded() {
  const { currentCity, cityByWeather } = window.dataStore;
  return cityByWeather.hasOwnProperty(currentCity);
}

renderApp();

function reRenderApp() {
  // Need to split rendering cycles
  setTimeout(() => window.renderApp(), 0);
}

function loadData() {
  const { currentCity } = window.dataStore;

  if (!allowedCities.includes(currentCity)) {
    window.dataStore.isDataLoading = false;
    window.dataStore.error = `Enter one of the city names: ${allowedCities.join(', ')}.`;
    reRenderApp();
    return;
  }

  if (!isCurrentCityDataLoaded()) {
    const url = getOpenWeatherMapUrl(currentCity);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        window.dataStore.isDataLoading = false;
        window.dataStore.error = null;
        setCurrentCityData(data);
      });
  }
}

function renderApp() {
  document.getElementById('app-root').innerHTML = `
        ${App()}
    `;
}

function App() {
  return `<div>
   ${SearchByCity()}
   ${WeatherResults()}
  </div>`;
}

function WeatherResults() {
  const { isDataLoading, currentUnits, error, currentCity } = window.dataStore;
  let content = '';
  if (currentCity === '') {
    content = 'Search by city name';
  } else {
    if (isDataLoading) {
      content = 'Loading...';
      window.loadData();
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

  return `<p>${content}</p>`;
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
        onchange="
            window.dataStore.currentCity = this.value; 
            window.dataStore.error = null; 
            window.dataStore.isDataLoading = true; 
            window.reRenderApp();"
    />
`;
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
  if (weatherData) {
    content += `Weather forecast for ${currentCity}:`;
    const {
      daily: [, ...forecastData],
    } = weatherData;
    content += forecastData
      .map(({ dt, temp: { day, night }, weather: [{ main, description, icon }] }) => {
        const dateString = getDateFromUnixTimestamp(dt);
        const dayTempInUnits = displayInUnits(day, currentUnits);
        const nightTempInUnits = displayInUnits(night, currentUnits);
        const weatherIcon = getIconFromCode(icon);
        return `<div>For ${dateString}, ${weatherIcon} ${main} (${description}).&nbsp;
Day at ${dayTempInUnits}, night at ${nightTempInUnits}</div>`;
      })
      .join('');
  }

  return content ? `<div>${content}</div>` : '';
}
