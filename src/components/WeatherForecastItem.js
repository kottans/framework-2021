/** @jsx createElement */
/*** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework';

function WeatherForecastItem({
  dateString,
  dayTempInUnits,
  description,
  main,
  nightTempInUnits,
  weatherIcon,
}) {
  return (
    <div>
      For {dateString}, {weatherIcon} {main} ({description}). Day at {dayTempInUnits}, night at{' '}
      {nightTempInUnits}.
    </div>
  );
}

export default WeatherForecastItem;
