import { createContext, useContext } from './framework';
import { CELSIUS_UNITS } from './utils';

export const AppContext = createContext({});
export const useAppContext = () => useContext(AppContext);

export const UnitsContext = createContext(CELSIUS_UNITS);
export const useUnitsContext = () => useContext(UnitsContext);
