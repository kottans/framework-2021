/** @jsx createElement */
/*** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework';
import { displayInUnits, getDateFromUnixTimestamp, getIconPropertiesFromCode } from '../utils';

function WeatherToday({ weatherData: { list } = {}, currentUnits, currentCity }) {
  if (!list) return null;

  const [
    {
      dt,
      main: { temp },
      weather: [{ main, description, icon }],
    },
  ] = list;

  const tempInUnits = displayInUnits(temp, currentUnits);
  const dateString = getDateFromUnixTimestamp(dt);
  const weatherIcon = getIconPropertiesFromCode(icon);

  return (
    <>
      <div>
        Weather for {dateString} in {currentCity}:
      </div>
      <div>
        <img {...weatherIcon} /> {main} ({description}). Temperature is {tempInUnits}.
      </div>
    </>
  );
}

export default WeatherToday;
