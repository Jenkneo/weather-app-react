import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useGeolocation from '../hooks/useGeolocation';
import { getCityName } from '../services/geocoding'; // Импортируем функцию для получения названия города
import { getAirPollutionData, getAirPollutionForecast } from '../services/airPollution'; // Импортируем обе функции

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-bottom: 60px;
  background-color: #f0f4f8;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  min-height: 100vh;
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
  width: 100%;
  max-width: 600px;
  text-align: center;
`;

const ForecastContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 600px;
`;

const ForecastDay = styled.div`
  margin-bottom: 20px;
`;

const ForecastHour = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
`;

const Home = () => {
  const { position, error } = useGeolocation();
  const [airData, setAirData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [city, setCity] = useState('Определение...');

  useEffect(() => {
    const fetchAirData = async () => {
      if (position.lat && position.lon) {
        // Получаем текущее качество воздуха
        const currentAirData = await getAirPollutionData(position.lat, position.lon);
        setAirData(currentAirData);

        // Получаем прогноз на следующие сутки
        const forecast = await getAirPollutionForecast(position.lat, position.lon);
        setForecastData(forecast);

        // Получаем название города
        const cityName = await getCityName(position.lat, position.lon);
        setCity(cityName);
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
    <HomeContainer>
      <Title>Добро пожаловать!</Title>
      {error ? (
        <Description>Ошибка определения местоположения: {error}</Description>
      ) : (
        <>
          <CurrentLocation>Текущее местоположение: {city}</CurrentLocation>

          {airData ? (
            <AirQualityContainer>
              <h3>Текущее качество воздуха</h3>
              <p>Индекс качества воздуха: {airData.list[0].main.aqi} (AQI)</p>
              <p>CO: {airData.list[0].components.co} µg/m³</p>
              <p>NO2: {airData.list[0].components.no2} µg/m³</p>
              <p>O3: {airData.list[0].components.o3} µg/m³</p>
              <p>SO2: {airData.list[0].components.so2} µg/m³</p>
              <p>PM10: {airData.list[0].components.pm10} µg/m³</p>
              <p>PM2.5: {airData.list[0].components.pm2_5} µg/m³</p>
            </AirQualityContainer>
          ) : (
            <Description>Загрузка данных о текущем качестве воздуха...</Description>
          )}

          {forecastGroupedByDay ? (
            <ForecastContainer>
              <h3>Прогноз на следующие сутки по часам</h3>
              {Object.keys(forecastGroupedByDay).map((day) => (
                <ForecastDay key={day}>
                  <h4>{day}</h4>
                  {forecastGroupedByDay[day].map((hourData) => (
                    <ForecastHour key={hourData.dt}>
                      <p>Время: {new Date(hourData.dt * 1000).toLocaleTimeString()}</p>
                      <p>Индекс качества воздуха: {hourData.main.aqi} (AQI)</p>
                      <p>CO: {hourData.components.co} µg/m³</p>
                      <p>NO2: {hourData.components.no2} µg/m³</p>
                      <p>O3: {hourData.components.o3} µg/m³</p>
                      <p>SO2: {hourData.components.so2} µg/m³</p>
                      <p>PM10: {hourData.components.pm10} µg/m³</p>
                      <p>PM2.5: {hourData.components.pm2_5} µg/m³</p>
                    </ForecastHour>
                  ))}
                </ForecastDay>
              ))}
            </ForecastContainer>
          ) : (
            <Description>Загрузка прогноза на следующие сутки...</Description>
          )}
        </>
      )}
    </HomeContainer>
  );
};

export default Home;
