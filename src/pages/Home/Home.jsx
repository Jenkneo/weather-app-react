// src/components/Home/Home.jsx

import React, { useEffect, useState } from 'react';
import './Home.css'; // Импортируем CSS файл
import useGeolocation from '../../hooks/useGeolocation';
// import { getCityName } from '../../services/geocoding'; // Импортируем функцию для получения названия города
import { getAirPollutionData, getAirPollutionForecast } from '../../services/airPollution'; // Импортируем обе функции

import AirQuality from './AirQuality/AirQuality'; // Импортируем новый компонент
import Forecast from './Forecast/Forecast'; // Импортируем новый компонент

const Home = () => {
  const { position,  } = useGeolocation();
  const [airData, setAirData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const fetchAirData = async () => {
      if (position.lat && position.lon) {
        try {
          // Получаем текущее качество воздуха
          const currentAirData = await getAirPollutionData(position.lat, position.lon);
          setAirData(currentAirData);

          // Получаем прогноз на следующие сутки
          const forecast = await getAirPollutionForecast(position.lat, position.lon);
          setForecastData(forecast);
        } catch (err) {
          console.error('Ошибка при получении данных:', err);
        }
      }
    };

    fetchAirData();
  }, [position]);

  const getNextDayForecast = () => {
    if (!forecastData) return null;
    const currentTime = Date.now();
    const nextDayTimestamp = currentTime + 24 * 60 * 60 * 1000;

    // Фильтруем данные прогноза на следующие 24 часа
    return forecastData.list.filter(
      (item) => item.dt * 1000 >= currentTime && item.dt * 1000 <= nextDayTimestamp
    );
  };

  const groupByDay = (forecast) => {
    const days = {};

    forecast.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const day = date.toLocaleDateString(); // Получаем дату в формате дня

      if (!days[day]) {
        days[day] = [];
      }

      days[day].push(item);
    });

    return days;
  };

  const nextDayForecast = getNextDayForecast();
  const forecastGroupedByDay = nextDayForecast ? groupByDay(nextDayForecast) : null;

  return (
    <div className="home-container">
      <h2 className="title">Сегодня</h2>
      <AirQuality airData={airData} />
      <Forecast forecastGroupedByDay={forecastGroupedByDay} />
    </div>
  );
};

export default Home;
