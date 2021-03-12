import { currentWeather } from './fixtures';
import { CELSIUS_UNITS, displayInUnits, FAHRENHEIT_UNITS } from './utils';

if (module.hot) {
  module.hot.accept();
}

window.dataStore = window.dataStore || {
  currentCity: '',
  currentUnits: CELSIUS_UNITS,
};

window.renderApp = renderApp;

const setCurrentUnits = function(value) {
  window.dataStore.currentUnits = value;
  window.renderApp();
}

renderApp();

function renderApp() {
  document.getElementById('app-root').innerHTML = `
        ${App()}
    `;
}

function App() {
  return `<div>
 ${SearchByCity()}
 ${UnitSwitch(window.dataStore.currentUnits, setCurrentUnits)}
 ${WeatherToday()}
</div>`;
}

function UnitSwitch(currentUnits, setCurrentUnitsCB) {
  return `
    <p>Select units</p>
  ${[
    { id: 'celsius-units', value: CELSIUS_UNITS, name: 'C' },
    { id: 'fahrenheit-units', value: FAHRENHEIT_UNITS, name: 'F' },
  ].map(
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
            <label for="${id}">${name}</label>
        </div>`
    )
    .join('')}
`;
}

function SearchByCity() {
  return `
    <input
        type="text"
        value="${window.dataStore.currentCity}"
        onchange="window.dataStore.currentCity = this.value; window.renderApp();" 
    />
`;
}

function WeatherToday() {
  let currentWeatherInCity = currentWeather[window.dataStore.currentCity];
  if (currentWeatherInCity) {
    const {
      weather: [{ main, description }],
      main: { temp },
      name,
    } = currentWeatherInCity;
    const tempInUnits = displayInUnits(temp, window.dataStore.currentUnits);
    return `${name} - ${main} (${description}). Temp is ${tempInUnits}`;
  }

  return `Enter one of the city names: ${Object.keys(currentWeather).join(', ')}.`;
}
