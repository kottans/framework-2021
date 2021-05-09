import renderApp from '../framework/render';
import { isCurrentCityDataLoaded } from '../data/weatherData';
import UnitSwitch from './UnitSwitch';
import WeatherToday from './WeatherToday';
import WeatherForecast from './WeatherForecast';

const setCurrentUnits = function (value) {
  window.dataStore.currentUnits = value;
  window.renderApp();
};

export default function WeatherResults() {
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
