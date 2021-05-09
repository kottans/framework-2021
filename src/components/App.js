import SearchByCity from './SearchByCity';
import WeatherResults from './WeatherResults';

export default function App() {
  return `<div>
   ${SearchByCity()}
   ${WeatherResults()}
  </div>`;
}
