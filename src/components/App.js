/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, useEffect, useState } from '../framework';
import SearchByCity from './SearchByCity';
import WeatherResults from './WeatherResults';
import { loadOpenWeatherMapData } from '../data/openWeatherMapAPI';

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

const useWeather = () => {
  const [currentCity, setCurrentCity] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (currentCity) {
      loadOpenWeatherMapData(currentCity)
        .then(data => {
          const { message, code } = data;

          if (code !== '200' && message) throw Error(message);

          setError(null);
          setWeatherData(data);
        })
        .catch(setError)
        .finally(setIsLoading);
    }
  }, [currentCity]);

  return {
    currentCity,
    setCurrentCity,
    error,
    isLoading,
    weatherData,
  };
};

export default App;
