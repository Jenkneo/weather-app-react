import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useGeolocation from '../hooks/useGeolocation';
import { getAirPollutionForecast } from '../services/airPollution';

const ForecastContainer = styled.div`
  padding: 20px;
  margin-bottom: 60px;
`;

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
              <p>Дата: {new Date(item.dt * 1000).toLocaleDateString()}</p>
              <p>Индекс качества воздуха: {item.main.aqi}</p>
              <p>CO: {item.components.co}, NO2: {item.components.no2}</p>
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
