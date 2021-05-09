export function getFilteredByDateWeatherData(
  weatherDataList = [],
  { includeDatesAfterBase = false, includeBaseDate = false, baseDate = new Date() },
) {
  const baseDateDay = baseDate.getDate();
  return weatherDataList.filter(({ dt }) => {
    const itemDate = new Date(dt * 1000);

    const itemDateDay = itemDate.getDate();
    const isToday = baseDateDay === itemDateDay;
    if (includeBaseDate && isToday) {
      return true;
    }

    return includeDatesAfterBase && baseDate < itemDate && !isToday;
  });
}

export const getWeatherForToday = (weatherDataList = []) =>
  getFilteredByDateWeatherData(weatherDataList, {
    includeBaseDate: true,
  });

export const getWeatherForecast = (weatherDataList = []) =>
  getFilteredByDateWeatherData(weatherDataList, {
    includeDatesAfterBase: true,
  });
