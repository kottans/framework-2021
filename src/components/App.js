import React from 'react';
import { useWeather } from '../customHooks';
import { AppContext } from '../context';
import SearchByCity from './SearchByCity';
import WeatherResults from './WeatherResults';

function App() {
  const { currentCity, setCurrentCity, error, isLoading, weatherData } = useWeather();

  return (
    <>
      <SearchByCity value={currentCity} onBlur={setCurrentCity} />
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
