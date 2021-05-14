/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';

function WeatherForecastItem({
  description,
  formattedTime,
  formattedDate,
  main,
  tempInUnits,
  feelsLikeInUnits,
  weatherIconProps,
  shouldShowDate = false,
  shouldShowTime = false,
}) {
  let dateTime = '';
  if (shouldShowDate) {
    dateTime = <>For {formattedDate}, </>;
  }
  if (shouldShowTime) {
    dateTime = <>At {formattedTime} </>;
  }
  if (shouldShowDate && shouldShowTime) {
    dateTime = (
      <>
        For {formattedDate}, {formattedTime}{' '}
      </>
    );
  }

  return (
    <div>
      {dateTime} <img alt={main} {...weatherIconProps} /> {main} ({description}). Temperature is{' '}
      {tempInUnits}, feels like {feelsLikeInUnits}
    </div>
  );
}

export default WeatherForecastItem;
