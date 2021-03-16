export const currentWeather = {
  London: {
    coord: {
      lon: -0.13,
      lat: 51.51,
    },
    weather: [
      {
        id: 300,
        main: 'Drizzle',
        description: 'light intensity drizzle',
        icon: '09d',
      },
    ],
    base: 'stations',
    main: {
      temp: 280.32,
      pressure: 1012,
      humidity: 81,
      temp_min: 279.15,
      temp_max: 281.15,
    },
    visibility: 10000,
    wind: {
      speed: 4.1,
      deg: 80,
    },
    clouds: {
      all: 90,
    },
    dt: 1485789600,
    sys: {
      type: 1,
      id: 5091,
      message: 0.0103,
      country: 'GB',
      sunrise: 1485762037,
      sunset: 1485794875,
    },
    id: 2643743,
    name: 'London',
    cod: 200,
  },
  Yafran: {
    id: 2208791,
    name: 'Yafran',
    coord: {
      lon: 12.52859,
      lat: 32.06329,
    },
    main: {
      temp: 259.68,
      temp_min: 9.681,
      temp_max: 9.681,
      pressure: 961.02,
      sea_level: 1036.82,
      grnd_level: 961.02,
      humidity: 85,
    },
    dt: 1485784982,
    wind: {
      speed: 3.96,
      deg: 356.5,
    },
    rain: {
      '3h': 0.255,
    },
    clouds: {
      all: 88,
    },
    weather: [
      {
        id: 500,
        main: 'Rain',
        description: 'light rain',
        icon: '10d',
      },
    ],
  },
};
