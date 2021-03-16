import { SearchByCity, UnitSwitch, WeatherToday } from "./appComponents";

const setCurrentUnits = function(value) {
  window.dataStore.currentUnits = value;
  window.renderApp();
}

function App() {
  return `<div>
 ${SearchByCity()}
 ${UnitSwitch(window.dataStore.currentUnits, setCurrentUnits)}
 ${WeatherToday()}
</div>`;
}

export default App;
