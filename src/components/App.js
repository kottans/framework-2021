/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework';
import { useWeather } from '../customHooks';
import SearchByCity from './SearchByCity';
import WeatherResults from './WeatherResults';

function App() {
  const { currentCity, setCurrentCity, error, isLoading, weatherData } = useWeather();
  return (
    <>
      <SearchByCity value={currentCity} onChange={setCurrentCity} />
      <WeatherResults
        currentCity={currentCity}
        error={error}
        isLoading={isLoading}
        weatherData={weatherData}
      />
    </>
  );
}

export default App;
