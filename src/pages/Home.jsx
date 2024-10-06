import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useGeolocation from '../hooks/useGeolocation';
import { getCityName } from '../services/geocoding'; // Импортируем функцию для получения названия города
import { getAirPollutionData } from '../services/airPollution';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-bottom: 60px;
  background-color: #f0f4f8;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  min-height: 100vh; /* Минимальная высота для контейнера */
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #666;
  text-align: center;
`;

const CurrentLocation = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #4caf50;
`;

const AirQualityContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  margin-top: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%; /* Занять 100% ширины */
  max-width: 600px; /* Максимальная ширина для удобного отображения */
  text-align: center;
`;

const Home = () => {
  const { position, error } = useGeolocation();
  const [airData, setAirData] = useState(null);
  const [city, setCity] = useState('Определение...');

  useEffect(() => {
    const fetchAirData = async () => {
      if (position.lat && position.lon) {
        const data = await getAirPollutionData(position.lat, position.lon);
        setAirData(data);
        const cityName = await getCityName(position.lat, position.lon); // Получаем название города
        setCity(cityName);
      }
    };

    fetchAirData();
  }, [position]);

  return (
    <HomeContainer>
      <Title>Добро пожаловать в систему мониторинга качества воздуха</Title>
      {error ? (
        <Description>Ошибка определения местоположения: {error}</Description>
      ) : (
        <>
          <CurrentLocation>Текущее местоположение: {city}</CurrentLocation> {/* Отображаем название города */}
          {airData ? (
            <AirQualityContainer>
              <p>Текущее качество воздуха: {airData.list[0].main.aqi} (AQI)</p>
              <p>Концентрации загрязнителей:</p>
              <p>CO - {airData.list[0].components.co} µg/m³</p>
              <p>NO2 - {airData.list[0].components.no2} µg/m³</p>
              <p>O3 - {airData.list[0].components.o3} µg/m³</p>
              <p>SO2 - {airData.list[0].components.so2} µg/m³</p>
              <p>PM10 - {airData.list[0].components.pm10} µg/m³</p>
              <p>PM2.5 - {airData.list[0].components.pm2_5} µg/m³</p>
            </AirQualityContainer>
          ) : (
            <Description>Загрузка данных о качестве воздуха...</Description>
          )}
        </>
      )}
    </HomeContainer>
  );
};

export default Home;
