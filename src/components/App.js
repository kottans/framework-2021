/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework';
import { useWeather } from '../customHooks';
import { AppContext } from '../context';
import SearchByCity from './SearchByCity';
import WeatherResults from './WeatherResults';

function App() {
  const { currentCity, setCurrentCity, error, isLoading, weatherData } = useWeather();

  return (
    <>
      <SearchByCity value={currentCity} onChange={setCurrentCity} />
      <AppContext.Provider value={weatherData}>
        {!currentCity ? (
          <div>Search by city name</div>
        ) : (
          <WeatherResults error={error} isLoading={isLoading} />
        )}
      </AppContext.Provider>
    </>
  );
}

export default App;
