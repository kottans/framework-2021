import renderApp from "./framework/render";
import dataStore from "./dataStore";

if (module.hot) {
  module.hot.accept();
}

window.renderApp = renderApp;
window.dataStore = window.dataStore || dataStore;

renderApp();
