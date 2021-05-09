import { CELSIUS_UNITS } from '../utils';

const dataStore = {
  currentCity: '',
  isDataLoading: false,
  error: null,
  cityByWeather: {},
  currentUnits: CELSIUS_UNITS,
};

export default dataStore;
