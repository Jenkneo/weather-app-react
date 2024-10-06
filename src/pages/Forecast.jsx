import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useGeolocation from '../hooks/useGeolocation';
import { getAirPollutionForecast } from '../services/airPollution';

const ForecastContainer = styled.div`
  padding: 20px;
  margin-bottom: 60px;
`;

const healthRecommendations = (aqi) => {
  switch (aqi) {
    case 1:
      return "Качество воздуха хорошо. Можно заниматься активными делами на улице.";
    case 2:
      return "Умеренное загрязнение. Для людей с повышенной чувствительностью могут быть проблемы.";
    case 3:
      return "Загрязнение вредно для групп с повышенной чувствительностью.";
    case 4:
      return "Высокое загрязнение. Возможно влияние на здоровье людей.";
    case 5:
      return "Качество воздуха крайне плохое. Нужно избегать длительного пребывания на улице.";
    default:
      return "Нет данных о качестве воздуха.";
  }
};

const Forecast = () => {
  const { position, error } = useGeolocation();
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const fetchForecastData = async () => {
      if (position.lat && position.lon) {
        const data = await getAirPollutionForecast(position.lat, position.lon);
        setForecastData(data);
      }
    };

    fetchForecastData();
  }, [position]);

  return (
    <ForecastContainer>
      <h2>Прогноз загрязнения воздуха на 5 дней</h2>
      {error ? (
        <p>Ошибка определения местоположения: {error}</p>
      ) : (
        forecastData ? (
          forecastData.list.map((item, index) => (
            <div key={index}>
              <p>Дата и время: {new Date(item.dt * 1000).toLocaleString()}</p>
              <p>Индекс качества воздуха: {item.main.aqi}</p>
              <p>CO: {item.components.co}, NO2: {item.components.no2}</p>
              <p>Рекомендации: {healthRecommendations(item.main.aqi)}</p>
            </div>
          ))
        ) : (
          <p>Загрузка прогноза загрязнения воздуха...</p>
        )
      )}
    </ForecastContainer>
  );
};

export default Forecast;
