/** @jsx createElement */
/*** @jsxFrag createFragment */
import { createElement, createFragment, useEffect, useState } from '../framework';
import SearchByCity from './SearchByCity';
import WeatherResults from './WeatherResults';
import { loadData } from '../utils';

function App() {
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    loadData(city)
      .then(data => {
        const { message } = data;

        if (message) throw Error(message);

        setError(null);
        setWeatherData(data);
      })
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [city]);

  const handleChange = ({ target: { value } }) => setCity(value);

  return (
    <>
      <SearchByCity value={city} onChange={handleChange} />
      <WeatherResults
        error={error}
        currentCity={city}
        weatherData={weatherData}
        isLoading={isLoading}
      />
    </>
  );
}

export default App;
