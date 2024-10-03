import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useGeolocation from '../hooks/useGeolocation';
import { getCityName } from '../services/geocoding';

const HomeContainer = styled.div`
  padding: 20px;
  margin-bottom: 60px; /* Для избежания перекрытия футером */
`;

const Home = () => {
  const { position, error } = useGeolocation();
  const [city, setCity] = useState('Определение...');

  useEffect(() => {
    const fetchCity = async () => {
      if (position.lat && position.lon) {
        const cityName = await getCityName(position.lat, position.lon);
        setCity(cityName);
      }
    };

    fetchCity();
  }, [position]);

  return (
    <HomeContainer>
      <h2>Добро пожаловать в систему мониторинга качества воздуха</h2>
      {error ? (
        <p>Ошибка определения местоположения: {error}</p>
      ) : (
        <p>Текущее местоположение: {city}</p>
      )}
      <p>Здесь вы можете узнать актуальную информацию о состоянии воздуха в вашем городе.</p>
    </HomeContainer>
  );
};

export default Home;
