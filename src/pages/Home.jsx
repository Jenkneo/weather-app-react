import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useGeolocation from '../hooks/useGeolocation';
import { getAirPollutionData } from '../services/airPollution';

const HomeContainer = styled.div`
  padding: 20px;
  margin-bottom: 60px;
`;

const Home = () => {
  const { position, error } = useGeolocation();
  const [airData, setAirData] = useState(null);

  useEffect(() => {
    const fetchAirData = async () => {
      if (position.lat && position.lon) {
        const data = await getAirPollutionData(position.lat, position.lon);
        setAirData(data);
      }
    };

    fetchAirData();
  }, [position]);

  return (
    <HomeContainer>
      <h2>Добро пожаловать в систему мониторинга качества воздуха</h2>
      {error ? (
        <p>Ошибка определения местоположения: {error}</p>
      ) : (
        airData ? (
          <div>
            <p>Текущее качество воздуха: {airData.list[0].main.aqi} (AQI)</p>
            <p>Концентрации загрязнителей: CO - {airData.list[0].components.co}, NO2 - {airData.list[0].components.no2}</p>
          </div>
        ) : (
          <p>Загрузка данных о качестве воздуха...</p>
        )
      )}
    </HomeContainer>
  );
};

export default Home;
