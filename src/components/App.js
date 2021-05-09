/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, createContext } from '../framework';
import { useWeather } from '../customHooks';
import SearchByCity from './SearchByCity';
import WeatherResults from './WeatherResults';

export const AppContext = createContext();

function App() {
  const { currentCity, setCurrentCity, error, isLoading, weatherData } = useWeather();

  return (
    <>
      <SearchByCity value={currentCity} onChange={setCurrentCity} />
      <AppContext.Provider value={weatherData}>
        <WeatherResults currentCity={currentCity} error={error} isLoading={isLoading} />
      </AppContext.Provider>
    </>
  );
}

export default App;
