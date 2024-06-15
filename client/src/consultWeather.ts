import axios, { AxiosError } from 'axios';

const BASE_URL = 'http://localhost:3000/api/flight';

export const getWeatherDataForFlights = async (flightNumbers: string[]) => {
  const promises = flightNumbers.map(async (flightNumber) => {
    const url = `${BASE_URL}/${flightNumber}/weather`;

    try {
      const response = await axios.get(url);
      return { flightNumber, data: response.data };
    } catch (error: any) {
      if (error.response) {
        console.error(`Error de respuesta para el vuelo ${flightNumber}:`, error.response.data);
      } else if (error.request) {
        console.error(`Error de solicitud para el vuelo ${flightNumber}:`, error.request);
      } else {
        console.error(`Error para el vuelo ${flightNumber}:`, error.message);
      }
      return { flightNumber, error: error.message };
    }
  });

  try {
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error('Error al obtener datos meteorológicos para los vuelos:', error);
    throw error;
  }
};
