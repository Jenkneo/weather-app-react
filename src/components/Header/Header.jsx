import { NavLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useGeolocation from '../../hooks/useGeolocation';
import { getCityName } from '../../services/geocoding';

// Основной контейнер хедера
const HeaderContainer = styled.header`
  background-color: #fff; /* Изменено на белый */
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc; /* Добавлена граница для разделения */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 20px;
  }
`;

// Контейнер для вкладок (Прогноз и Карта осадков)
const NavLinks = styled.nav`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    margin-top: 10px;
    width: 100%;
    justify-content: space-between;
  }
`;

// Стили для каждой ссылки, включая активное состояние
const StyledNavLink = styled(NavLink)`
  color: black; /* Сделаем текст черным */
  text-decoration: none;
  font-weight: bold;

  &.active {
    color: red; /* Активная ссылка выделяется красным цветом */
  }

  &:hover {
    text-decoration: underline;
  }
`;

// Стили для текстового блока с городом
const CityText = styled.div`
  color: black; /* Сделаем текст черным */
  font-size: 18px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

// Стили для поля поиска
const SearchInput = styled.input`
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  background-color: #f0f0f0; /* Сделаем фон серым */

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 10px;
  }
`;

const Header = () => {
  const { position} = useGeolocation();
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
  <HeaderContainer>
    {/* Текст с названием города */}
    <CityText>{city}</CityText>

    {/* Вкладки навигации */}
    <NavLinks>
      <StyledNavLink exact to="/" activeClassName="active">
        Главная
      </StyledNavLink>
      <StyledNavLink to="/forecast" activeClassName="active">
        Прогноз на 10 дней
      </StyledNavLink>
      <StyledNavLink to="/map" activeClassName="active">
        Карта Загрязнения
      </StyledNavLink>
    </NavLinks>

    {/* Поле поиска */}
    <SearchInput type="text" placeholder="Поиск по городам..." />
  </HeaderContainer>
  );
};

export default Header;
