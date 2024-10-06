import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useGeolocation from '../hooks/useGeolocation';
import { getAirPollutionForecast } from '../services/airPollution';

const ForecastContainer = styled.div`
  padding: 20px;
  margin-bottom: 60px;
  background-color: #f0f4f8;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  text-align: center;
`;

const ForecastCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  margin: 15px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const HealthRecommendations = (aqi) => {
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
      <Title>Прогноз загрязнения воздуха на 5 дней</Title>
      {error ? (
        <p>Ошибка определения местоположения: {error}</p>
      ) : (
        forecastData ? (
          forecastData.list.map((item, index) => (
            <ForecastCard key={index}>
              <p>Дата и время: {new Date(item.dt * 1000).toLocaleString()}</p>
              <p>Индекс качества воздуха: {item.main.aqi}</p>
              <p>CO: {item.components.co} µg/m³</p>
              <p>NO2: {item.components.no2} µg/m³</p>
              <p>O3: {item.components.o3} µg/m³</p>
              <p>SO2: {item.components.so2} µg/m³</p>
              <p>PM10: {item.components.pm10} µg/m³</p>
              <p>PM2.5: {item.components.pm2_5} µg/m³</p>
              <p>Рекомендации: {HealthRecommendations(item.main.aqi)}</p>
            </ForecastCard>
          ))
        ) : (
          <p>Загрузка прогноза загрязнения воздуха...</p>
        )
      )}
    </ForecastContainer>
  );
};

export default Forecast;
