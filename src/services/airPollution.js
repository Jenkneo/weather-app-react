import axios from 'axios';

const isDevMode = process.env.NODE_ENV === 'development'

const API_KEY = '7eef441a87868e8991b28fec50f95b7e'; // Замените на ваш API-ключ
const BASE_URL = (isDevMode ? 'http' : 'https') + `://api.openweathermap.org/data/2.5/air_pollution`;

export const getAirPollutionData = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении данных о загрязнении воздуха:', error);
    throw error;
  }
};

export const getAirPollutionForecast = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении прогноза загрязнения воздуха:', error);
    throw error;
  }
};
