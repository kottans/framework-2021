export const KELVIN_UNITS = 'K';
export const CELSIUS_UNITS = 'C';
export const FAHRENHEIT_UNITS = 'F';

export function displayInUnits(value, units) {
  switch (units) {
    case CELSIUS_UNITS:
      return `${Math.round(value - 273.15)}˚C`;
    case FAHRENHEIT_UNITS:
      return `${Math.round((value - 273.15) * (9 / 5) + 32)}˚F`;
    // case KELVIN_UNITS:
    default:
      return `${value}˚K`;
  }
}
