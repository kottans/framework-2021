/** @jsx createElement */
/*** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import SearchByCity from './SearchByCity';
import WeatherResults from './WeatherResults';
import img from '../static-assets/logo--star.png';
import { logo } from './App.css';

function App() {
  return (
    <>
      <img src={img} class={logo} />
      <SearchByCity />
      <WeatherResults />
    </>
  );
}

export default App;
