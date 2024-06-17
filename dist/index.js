"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consultWeather_1 = require("./consultWeather");
const flightNumbers = ['100', '505', '1288', '1601'];
(0, consultWeather_1.getWeatherDataForFlights)(flightNumbers)
    .then((weatherData) => {
    console.log('Datos meteorológicos de los vuelos:', weatherData);
})
    .catch((error) => {
    console.error('Error al obtener datos meteorológicos:', error);
});
