import { renderApp } from './framework/render';
import dataStore from './data/dataStore';
import App from './components/App';
import { performSearch, validateAndLoadData } from './data/weatherData';

if (module.hot) {
  module.hot.accept();
}

window.dataStore = window.dataStore || dataStore;
window.renderApp = renderApp;
window.validateAndLoadData = validateAndLoadData;
window.performSearch = performSearch;

window.renderApp(App);
