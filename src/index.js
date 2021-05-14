import dataStore from './data/dataStore';
import { validateAndLoadData, performSearch } from './data/weatherData';
import renderApp from './framework/render';
import App from './components/App';

if (module.hot) {
  module.hot.accept();
}

window.dataStore = dataStore;

window.renderApp = renderApp;
window.performSearch = performSearch;
window.validateAndLoadData = validateAndLoadData;
window.performSearch = performSearch;

renderApp(App, document.getElementById('app-root'));
