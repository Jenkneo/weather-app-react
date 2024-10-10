import axios from 'axios'; 

const isDevMode = process.env.NODE_ENV === 'development';

//сюда надо указать то, что высралось при поднятии бека (uvicorn main:app --reload) либо уже прод
const BASE_URL = (isDevMode ? 'http' : 'https') + '://127.0.0.1:8000/api'; // super-unicorn-secondly.ngrok-free.app

//отсюда мы идем на эндпоинт бэка get-pollution (текущее загрязнение)
export const getAirPollutionData = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}/get-pollution?lat=${lat}&lon=${lon}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении данных о загрязнении воздуха:', error);
    throw error;
  }
};

//отсюда мы идем на эндпоинт бэка get-forecast (прогноз на 5 суток)
export const getAirPollutionForecast = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}/get-forecast?lat=${lat}&lon=${lon}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении прогноза загрязнения воздуха:', error);
    throw error;
  }
};
