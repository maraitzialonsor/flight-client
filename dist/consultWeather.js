"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeatherDataForFlights = void 0;
const axios_1 = __importDefault(require("axios"));
const BASE_URL = 'http://localhost:3000/api/flight';
const getWeatherDataForFlights = (flightNumbers) => __awaiter(void 0, void 0, void 0, function* () {
    const promises = flightNumbers.map((flightNumber) => __awaiter(void 0, void 0, void 0, function* () {
        const url = `${BASE_URL}/${flightNumber}/weather`;
        try {
            const response = yield axios_1.default.get(url);
            return { flightNumber, data: response.data };
        }
        catch (error) {
            if (error.response) {
                console.error(`Error de respuesta para el vuelo ${flightNumber}:`, error.response.data);
            }
            else if (error.request) {
                console.error(`Error de solicitud para el vuelo ${flightNumber}:`, error.request);
            }
            else {
                console.error(`Error para el vuelo ${flightNumber}:`, error.message);
            }
            return { flightNumber, error: error.message };
        }
    }));
    try {
        const results = yield Promise.all(promises);
        return results;
    }
    catch (error) {
        console.error('Error al obtener datos meteorológicos para los vuelos:', error);
        throw error;
    }
});
exports.getWeatherDataForFlights = getWeatherDataForFlights;
