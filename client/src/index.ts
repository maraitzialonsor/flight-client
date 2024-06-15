import { getWeatherDataForFlights } from './consultWeather';


const flightNumbers = ['100', '505', '1288', '1601'];

getWeatherDataForFlights(flightNumbers)
  .then((weatherData) => {
    console.log('Datos meteorológicos de los vuelos:', weatherData);
  })
  .catch((error) => {
    console.error('Error al obtener datos meteorológicos:', error);
  });
